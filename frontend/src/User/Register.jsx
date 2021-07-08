import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {username:"", password:""};
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

    handleSubmit(event){
        event.preventDefault();

        if(this.state.username != "" && this.state.password != "" && this.state.password === this.state.confPass){
            const requestInfo = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
            };
    
            fetch('http://localhost:8080/users/register', requestInfo)
                .then(response => response.json())
        } else {

        }


    }

    render() {
        return (
        <form onSubmit={this.handleSubmit}>        
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