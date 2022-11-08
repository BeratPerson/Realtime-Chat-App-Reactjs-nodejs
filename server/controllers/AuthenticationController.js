const sql = require("mssql/msnodesqlv8");
const config = require("../config")


const Login = async (req, res) => {
    try {
        var user = req.body;
        let pool = await sql.connect(config)
        console.log((await pool.request().query(`select *  from userlist`)).recordset);
        let data = await pool.request().query(`select id,guid_id,name,lastname,photo,username from userlist where username='${user.username}' and password='${user.password}' `);
        return res.send(data.recordsets[0]);
    }
    catch (err) {
        console.log(err);
    }
}



module.exports = {
    Login: Login,
}