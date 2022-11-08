const sql = require("mssql/msnodesqlv8");
const config = require("../config")
const { uuid } = require('uuidv4');

const searchUser = async (req, res) => {
    try {
        var searchkey = req.body.searchkey;
        let pool = await sql.connect(config)
        let data = await pool.request().query(`select*from userlist where username like '%${searchkey}%' `);
        return res.send(data.recordsets);
    }
    catch (err) {
        console.log(err);
    }
}
const getUser = async (req, res) => {
    try {
        var id = req.params.id;
        console.log(id)
        let pool = await sql.connect(config)
        let users = await pool.request().query(`select*from userlist where id=${id} `);
        return res.send(users.recordsets);
    }
    catch (err) {
        console.log(err);
    }
}
const getUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let users = await pool.request().query("select*from userlist ");
        return res.send(users.recordsets);
    }
    catch (err) {
        console.log(err);
    }
}
const deleteUser = async (req, res) => {
    try {
        console.log(req.body)
        var id = req.body.id;
        if (id !== "" && id !== undefined) {
            let pool = await sql.connect(config)
            pool.request().query(`delete from userlist WHERE id=${id}`)
            return res.send("1");
        }
        else {
            return res.send("0");
        }
    }
    catch (err) {
        console.log(err);
    }
}
const saveUser = async (req, res) => {
    try {
        var user = req.body;
        if (user.id == "" || user.id == undefined) {
            let pool = await sql.connect(config)
            await pool.request().query(`INSERT INTO userlist
            VALUES ('${uuid()}' , '${user.username}','${user.password}','${user.name}','${user.lastname}','');`);
            return res.send("1");
        }
        else {
            let pool = await sql.connect(config)
            await pool.request().query(`UPDATE  userList SET 
             username='${user.username}', password='${user.password}' where id=${user.id}`);
            return res.send(user);
        }
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    deleteUser: deleteUser,
    saveUser: saveUser,
    searchUser:searchUser
}