import React, { useEffect, useState } from 'react'
import MessageList from './MessageList';
import axios from 'axios'
import { getAllMessagesForCurrentChat } from '../routes';


function Chat({ socket }) {
    const activeUser = JSON.parse(localStorage.getItem("authenticationKey"));
    useEffect(() => {
        if (localStorage.getItem("authenticationKey") === null || localStorage.getItem("authenticationKey") === undefined) {
            window.location.href = '/login';
        }
    })

    useEffect(() => {
        if (activeUser.id !== "") {
            socket.emit("join_user_messages", activeUser)
        }
    }, [])

    const [activeChannel, setActiveChannel] = useState({ id: 0 })
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentMessage !== "") {
            var messageData = {
                messageFrom: activeUser.id,
                messageTo: activeChannel,
                message: currentMessage,
                sendedDate: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
            setCurrentMessage("1");
            setMessageList((list) => [...list, messageData])
            
        }
    }
    useEffect(() => {
        var data = {
            currentChat: activeChannel.id,
            activeUser: activeUser.id,
        }
        axios.post(getAllMessagesForCurrentChat, data)
            .then(function (res) {
                setMessageList(res.data[0])
            })
            .catch(function (err) {
                console.log(err)
            });
    }, [activeChannel])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    return (
        <div>
            <div className='row'>
                <div className='col-4  '>
                    <MessageList activeUser={activeUser}  activeChannel={activeChannel} setActiveChannel={setActiveChannel} ></MessageList>
                </div>
                {
                    activeChannel.id !== 0 ?
                        <div className='col-8  '>
                            <div className="chat-box">
                                <div className="box-top_bar">
                                    <a onClick="">
                                        <i className="fa-solid fa-chevron-left" style={{ color: "#fff" }}></i>
                                    </a>
                                    <b>{activeChannel.name.toUpperCase() + " " + activeChannel.lastname.toUpperCase()}</b>
                                    <div className="user_image">
                                        <img src="https://i.pinimg.com/564x/06/1b/c2/061bc2a057484463fdbe4229d82e9393.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="chat-box_content">
                                    <div className="chat-messages">
                                        {
                                            messageList.map((data, index) => {
                                                var sendedDate = new Date(data.sendedDate);
                                                return (
                                                    <div key={index} className={data.messageFrom === activeUser.id ? "message-box message-right" : "message-box"}>
                                                        <img src="https://i.pinimg.com/564x/06/1b/c2/061bc2a057484463fdbe4229d82e9393.jpg" alt="" />
                                                        <div className="message_content" >
                                                            <p>{data.message}</p>
                                                            <p style={{ fontSize: "10px" }}>{sendedDate.getHours() + ":" + sendedDate.getMinutes()}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="chat-form">
                                        <input type="text" placeholder="Type somenthing..." onChange={(e) => { setCurrentMessage(e.target.value) }} />
                                        <button onClick={sendMessage}>
                                            <i className="fa fa-paper-plane" aria-hidden="true" style={{ color: "#fff" }}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                }
            </div>
        </div>

    )
}

export default Chat