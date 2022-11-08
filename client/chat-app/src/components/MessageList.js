import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { userSearchURL } from '../routes';

function MessageList({ setActiveChannel, activeUser, activeChannel }) {
    const [searchUser, setSearchUser] = useState("")
    const [userList, setUserList] = useState([])

    useEffect(() => {
        var data = {
            searchkey: searchUser
        }
        axios.post(userSearchURL, data)
            .then(function (res) {
                setUserList(res.data[0])
                setActiveChannel(res.data[0][0].id === activeUser.id ? res.data[0][1] : res.data[0][0])

            })
            .catch(function (err) {
                console.log(err)
            });

    }, [searchUser])

    return (
        <div className='messageListRow'>
            <div className='col-12 mt-3 mb-3'>
                <input type="text" className='form-control' placeholder="Burdan Kullanıcı Arayabilirsiniz..." onChange={(e) => { setSearchUser(e.target.value) }} style={{ maxWidth: "93%", marginLeft: "15px" }}></input>
            </div>
            <div className='col-12'>
                <ul className="messageList">

                    {
                        userList.map(data => (
                            activeUser.id !== data.id ?
                                <li key={data.id} onClick={() => { setActiveChannel(data) }} className={activeChannel.id === data.id ? "activeChannel" : ""}>
                                    <div className='row p-2' >
                                        <div className='messageRow' >
                                            <div className='user_image_name'>
                                                <div className="user_image_in_MessageList">
                                                    <img src="https://i.pinimg.com/564x/06/1b/c2/061bc2a057484463fdbe4229d82e9393.jpg" alt="" />
                                                </div>
                                                <div>
                                                    {data.name} {data.lastname}
                                                </div>
                                            </div>
                                            {/* <div>
                                            10:22
                                        </div> */}

                                        </div>
                                    </div>

                                </li>
                                :
                                ""
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default MessageList