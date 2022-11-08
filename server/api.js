const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const bodyParser = require('body-parser')
const { Server } = require("socket.io");
const server = http.createServer(app);
const UserRouter = require('./routes/UserRouter.js');
const MessageRouter = require('./routes/MessageRouter.js');
const AuthenticationRouter = require('./routes/AuthenticationRouter.js');
app.use(bodyParser.json())
app.use(cors());
const messageFunctions = require('./controllers/MessageController.js');

server.listen(3002, () => {
    console.log("SERVER RUNNING");
});


app.use('/api/users', UserRouter);
app.use('/api/authentication', AuthenticationRouter);
app.use('/api/message', MessageRouter);



const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("join_user_messages", (user) => {
        console.log("berat",user.id)
        onlineUsers.set(user.id, socket.id)
    });
    socket.on("send_message", async (data) => {
        const sendUserSocket = onlineUsers.get(data.messageTo.id)
        await messageFunctions.saveMessage(data)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("receive_message", data)
        }
    });

});
