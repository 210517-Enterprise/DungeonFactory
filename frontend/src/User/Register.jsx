import React from 'react';
import { Redirect } from 'react-router';

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {username:"", password:"", loginStatus:""};
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfChange = this.handleConfChange.bind(this);
    }
    
    handleUserChange(event){
        this.setState({username:event.target.value})
    }

    handlePassChange(event){
        this.setState({password:event.target.value})
    }

    handleConfChange(event){
        this.setState({confPass:event.target.value})
    }

    async handleSubmit(event){
        event.preventDefault();

        if(this.state.username !== "" && this.state.password !== "" && this.state.password === this.state.confPass){
            const requestInfo = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
            };
    
            let response = await fetch('http://localhost:8080/user/register', requestInfo)


            if(response.status !== 200){
                this.setState({loginStatus: await response.text()});
            } else {
                this.setState({loginStatus: "loggedin"})
            }
        } else {
            this.setState({loginStatus: "Username is not filled in or passwords did not match"});
        }
    }

    render() {
        let messageBox;

        if(this.state.loginStatus){
            if(this.state.loginStatus === "loggedin"){
                messageBox = <div><Redirect to="../Home"/></div>
            } else {
                messageBox = <div>{this.state.loginStatus}</div>
            }
        } else {
            messageBox = <div></div>
        }

        return (
            <form onSubmit={this.handleSubmit}>       
                <label><h1>REGISTER</h1></label>
                {messageBox} 
                <label>
                    Username:
                    <input type="text" id="username" value={this.state.username} onChange={this.handleUserChange} />        
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" id="password" value={this.state.password} onChange={this.handlePassChange} />        
                </label>
                <label>
                    Confirm Password:
                    <input type="password" id="confPass" value={this.state.confPass} onChange={this.handleConfChange} />        
                </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Register;