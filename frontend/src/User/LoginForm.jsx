import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Modal} from "../Modal/Modal";
import styled from "styled-components"

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 420px;
  background: #2D3439;
  border-radius: 8px;
  position: relative;
`

export const TopContainer = styled.div`
  padding: 32px 32px 60px 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Header = styled.div`
  text-align: center;
  font-size: 34px;
  margin-bottom: 20px;
`

export const SubHeader = styled.div`
  text-align: center;
  margin-bottom: 28px;
  opacity: 50%;
`

export const Field = styled.input`
  color: inherit;
  padding: 12px 18px;
  box-sizing: border-box;
  margin: 14px 0px;
  font-size: 16px;
  background: #3a434b;
  border: none;
  
  &::placeholder {
    color: inherit;
  }
`

export const SubmitContainer = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-top: 1px solid #262c30;
`

export const Button = styled.button`
  cursor: pointer;
  font-size: inherit;
  color: inherit;
  background: none;
  border: none;
  
  &:hover {
    color: #DFF2FF;
  }
`

export const Error = styled.div`
  border: 1px solid #c26e78;
  color: white;
  background: #b46f76;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 12px;
`

export default function LoginForm({visible, updateUser, onClose}) {
    const [errorMessage, updateErrorMessage] = useState("");
    const defaultValues = {
        username: "",
        password: "",
    }
    const {register, handleSubmit, reset} = useForm({ defaultValues });

    async function onSubmit (data) {
        const requestInfo = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: data.username, password: data.password }),
            credentials: 'include'
        };

        try {
            const response = await fetch('http://localhost:8080/user/login', requestInfo)
            const data = await response.json();
            console.log(data.message)
            if (response.status === 200) {
                updateUser(data);
            } else {
                updateErrorMessage(data.message)
            }
        } catch (e) {
            updateErrorMessage("Unexpected error occurred");
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
            <FormContainer autocomplete="off">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TopContainer>
                        <Header>Login</Header>
                        <SubHeader>Welcome back, please sign in to continue</SubHeader>
                        {errorMessage && <Error role="alert">{errorMessage}</Error>}
                        <Field placeholder="Username" {... register("username", {required: true})} autoFocus />
                        <Field type="password" placeholder="Password" {... register("password", {required: true})}/>
                    </TopContainer>
                    <SubmitContainer>
                        <Button onClick={() => onClose()}>Close</Button>
                        <Button onClick={handleSubmit(onSubmit)}>Sign In</Button>
                    </SubmitContainer>
                </Form>
            </FormContainer>
        </Modal>
    )
}