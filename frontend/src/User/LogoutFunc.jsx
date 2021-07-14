import { useEffect } from "react";
import { Redirect } from 'react-router';

export default function Logout({user, updateUser}) {
    
    useEffect((props) => {
        fetch('http://localhost:8080/user/logout', {method: 'GET', credentials: 'include'});
        props.updateUser(null);
    }, [])
    
    return <div><Redirect to="../Home"/></div>
}