import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router';

export default function Register({user}) {
    const [json, updateJson] = useState(null);
    const [errorMessage, updateErrorMessage] = useState("");
    const {register, handleSubmit} = useForm({
        defaultVaules: {
            username: "",
            password: "",
            confPass: ""
        }}); 
    const onSubmit = (data) => {
        if (data.password === data.confPass) {
            const requestInfo = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: data.username, password: data.password }),
                credentials: 'include'
            };

            let response = fetch('http://localhost:8080/user/register', requestInfo)
                .then(response => {
                    if(response.status !== 200){
                        updateErrorMessage(response.text)
                    } else {
                        response.json()
                        .then(updateJson)
                    }
                });

        } else {
            updateErrorMessage("Passwords did not match");
        }
    }

    useEffect(() => {
        user = json;
        return <div><Redirect to="../Home"/></div>;
    }, [json])

    return user == null ? (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>REGISTER</h1>
                <label>
                    Username:  
                    <input {... register("username", {required: true})}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input {... register("password", {required: true})}/>
                </label>
                <label>
                    Confirm Password:  
                    <input {... register("confPass", {required: true})}/>
                </label>
                <input type="submit"/>
            </form>
        </>
    ) : (
        <div><Redirect to="../Home"/></div>
    );
}