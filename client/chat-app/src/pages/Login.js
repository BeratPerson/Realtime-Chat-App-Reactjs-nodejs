import React, { useState } from 'react'
import axios from 'axios'
import '../css/Login.css';
import { loginURL } from '../routes';

function Login() {
    const [values, setValues] = useState({ username: "", pass: "" })
    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const onclickHandler = () => {
        if (values.username !== "" && values.pass !== "") {
            var data = {
                username: values.username,
                password: values.pass
            }
            axios.post(loginURL, data)
                .then(function (res) {
                    console.log(res)
                    var guid_id = res.data[0].guid_id
                    if (guid_id !== undefined && guid_id !== "") {
                        localStorage.setItem("authenticationKey", JSON.stringify(res.data[0]))
                        window.location.href = '/';
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });

        }

    }
    return (
        <div>
            <section className="section-login">
                <div className="container">
                    <div className="form-container">
                        <div className="form">
                            <input type="text" className="input username mb-2" placeholder="username" name="username" onChange={(e) => { onChangeHandler(e) }} />
                            <input type="password" className="input password" placeholder="Password" name="pass" onChange={(e) => { onChangeHandler(e) }} />
                            <button onClick={onclickHandler} className="btn btn-login">Log In</button>
                        </div>
                        <div className="sign-up">
                            <h2 className="text">Don't have an Account?</h2>
                            <a href='/register' className="btn btn-sign-up" >Sign Up</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login