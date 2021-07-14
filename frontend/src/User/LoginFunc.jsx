import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router';

export default function Login({user, onLogin}) {
    const [json, updateJson] = useState(null);
    const [errorMessage, updateErrorMessage] = useState("");
    const {register, handleSubmit} = useForm({
        defaultVaules: {
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

        const response = await fetch('http://localhost:8080/user/login', requestInfo)

        if(response.status !== 200){
            updateErrorMessage(response.text)
        } else {
            const user = await response.json();
            updateJson(user);
            onLogin(user);
        }

    }

    return user == null ? (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>LOGIN</h1>
                <label>
                    Username:  
                    <input {... register("username", {required: true})}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input {... register("password", {required: true})}/>
                </label>
                <input type="submit"/>
            </form>
        </>
    ) : (
        <div><Redirect to="../Home"/></div>
    );
}