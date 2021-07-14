import { useEffect } from "react";
import { Redirect } from 'react-router';

export default function Logout({updateUser}) {
    
    useEffect(() => {
        fetch('http://localhost:8080/user/logout', {method: 'GET', credentials: 'include'});
        updateUser(null);
    }, [])
    
    return <div><Redirect to="../Home"/></div>
}