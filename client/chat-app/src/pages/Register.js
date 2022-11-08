import React, { useState } from 'react'
import axios from 'axios'
import '../css/Login.css';
import { registerURL } from '../routes';

function Register() {
    const [values, setValues] = useState({ username: "", pass: "",name:"",lastname:"" })
    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const onclickHandler = () => {
        if (values.username !== "" && values.pass !== "") {
            var data = {
                username: values.username,
                password: values.pass,
                name:values.name,
                lastname:values.lastname
            }

            axios.post(registerURL, data)
                .then(function (res) {
                    if (res.data==1) {
                        window.location.href = '/login';
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
                            <input type="text" className="input username mb-2" placeholder="name" name="name" onChange={(e) => { onChangeHandler(e) }} />
                            <input type="text" className="input username mb-2" placeholder="lastname" name="lastname" onChange={(e) => { onChangeHandler(e) }} />
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

export default Register