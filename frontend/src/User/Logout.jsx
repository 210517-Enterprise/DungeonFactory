import React from 'react';
import { Redirect } from 'react-router';

class Logout extends React.Component {
    constructor(props) {
        super(props);

        fetch('http://localhost:8080/user/logout', {method: 'GET', credentials: 'include'});

        this.props.onLogout();
    }

    render() {
        return <div><Redirect to="../Home"/></div>
    }
}

export default Logout;