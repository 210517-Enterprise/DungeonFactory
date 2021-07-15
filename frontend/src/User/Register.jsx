import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router';

export default function Register({user, updateUser}) {
    const [errorMessage, updateErrorMessage] = useState("");
    const {register, handleSubmit} = useForm({
        defaultVaules: {
            username: "",
            password: "",
            confPass: ""
        }}); 

    async function onSubmit (data) {
        if (data.password === data.confPass) {
            const requestInfo = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: data.username, password: data.password }),
                credentials: 'include'
            };

            const response = await fetch('http://localhost:8080/user/register', requestInfo)

            if(response.status !== 200){
                updateErrorMessage(await response.text())
            } else {
                const user = await response.json();
                updateUser(user);
            }

        } else {
            updateErrorMessage("Passwords did not match");
        }
    }

    let Error;
    if (errorMessage) {
        Error = <div className="login-error" role="alert">{errorMessage}</div>
    }

    return user == null ? (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-top-container">
                    <div className="login-header">Register</div>
                    <div className="login-subheader">Creating a new account</div>
                    {Error}
                    <input className="login-field" placeholder="Username" {... register("username", {required: true})}/>
                    <input className="login-field" type="password" placeholder="Password" {... register("password", {required: true})}/>
                    <input className="login-field" type="password" placeholder="Repeat Password" {... register("confPass", {required: true})}/>
                </div>
                <div className="login-submit-container">
                    <input className="login-button" type="submit"/>
                </div>
            </form>
        </div>
    ) : (
        <div><Redirect to="../Home"/></div>
    );
}