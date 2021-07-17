import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Error, Field, Form, FormContainer, SubHeader, SubmitContainer, TopContainer, Header} from "./LoginForm";
import {Modal} from "../Modal/Modal";

export default function RegisterForm({ updateUser, visible, onClose }) {
    const [errorMessage, updateErrorMessage] = useState("");
    const defaultValues = {
        username: "",
        password: "",
        confPass: ""
    }
    const {register, handleSubmit, reset} = useForm({ defaultValues });

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

        updateErrorMessage("")
        reset(defaultValues)
        onClose()
    }

    if (!visible) {
        return <></>
    }

    return (
        <Modal>
            <FormContainer>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TopContainer>
                        <Header>Register</Header>
                        <SubHeader>Creating a new account</SubHeader>
                        {errorMessage && <Error role="alert">{errorMessage}</Error>}
                        <Field placeholder="Username" {... register("username", {required: true})} autocomplete="none" autoFocus />
                        <Field type="password" placeholder="Password" {... register("password", {required: true})}/>
                        <Field type="password" placeholder="Repeat Password" {... register("confPass", {required: true})}/>
                    </TopContainer>
                    <SubmitContainer>
                        <Button onClick={() => onClose()}>Close</Button>
                        <Button onClick={handleSubmit(onSubmit)}>Create Account</Button>
                    </SubmitContainer>
                </Form>
            </FormContainer>
        </Modal>
    )
}