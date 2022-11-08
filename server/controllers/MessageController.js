const sql = require("mssql/msnodesqlv8");
const config = require("../config")


const getMessage = async (req, res) => {
    try {
        var id = req.params.id;
        console.log(id)
        let pool = await sql.connect(config)
        let users = await pool.request().query(`select*from messages where id=${id} `);
        return res.send(users.recordsets);
    }
    catch (err) {
        console.log(err);
    }
}
const getMessages = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let users = await pool.request().query("select*from messages ");
        return res.send(users.recordsets);
    }
    catch (err) {
        console.log(err);
    }
}
const getAllMessagesForCurrentChat = async (req, res) => {
    try {


        var activeChannelId = req.body.currentChat
        var activeUserId = req.body.activeUser
        console.log(activeUserId,activeChannelId)
        if (activeChannelId !== 0 || activeChannelId !== undefined && activeUserId !== 0 || activeUserId !== undefined) {
            let pool = await sql.connect(config)
            let data = await pool.request().query(`select * from messages where messageFrom='${activeUserId}' and messageTo='${activeChannelId}' or  messageFrom='${activeChannelId}' and messageTo='${activeUserId}'  order by sendedDate`);
            return res.send(data.recordsets);
        }

    }
    catch (err) {
        console.log(err);
    }
}
const saveMessage = async (sendedMesssage) => {
    try {
        let pool = await sql.connect(config)
        let data = await pool.request().query(`INSERT INTO messages
        VALUES (${sendedMesssage.messageFrom},${sendedMesssage.messageTo.id}, '${sendedMesssage.message}','${sendedMesssage.sendedDate}');`);
        console.log(data.recordsets)

    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getMessages: getMessages,
    getMessage: getMessage,
    saveMessage: saveMessage,
    getAllMessagesForCurrentChat: getAllMessagesForCurrentChat
}