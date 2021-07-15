import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router';
import "./LoginForm.css"

export default function Login({user, updateUser}) {
    const [errorMessage, updateErrorMessage] = useState("");
    const {register, handleSubmit} = useForm({
        defaultValues: {
            username: "",
            password: "",
        }}); 

    async function onSubmit (data) {
        const requestInfo = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: data.username, password: data.password }),
            credentials: 'include'
        };

        try {
            const response = await fetch('http://localhost:8080/user/login', requestInfo)
            const user = await response.json();
            updateUser(user);
        } catch (e) {
            updateErrorMessage("Unexpected error occurred");
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
                    <div className="login-header">Login</div>
                    <div className="login-subheader">Welcome back, please sign in to continue</div>
                    {Error}
                    <input className="login-field" placeholder="Username" {... register("username", {required: true})} autoFocus />
                    <input className="login-field" type="password" placeholder="Password" {... register("password", {required: true})}/>
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