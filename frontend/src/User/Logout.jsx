import { useEffect } from "react";
import { Redirect } from 'react-router';
import {apiUrl} from "../util";

export default function Logout({updateUser}) {
    
    useEffect(() => {
        fetch(apiUrl + '/user/logout', {method: 'GET', credentials: 'include'});
        updateUser(null);
    }, [])
    
    return <div><Redirect to="../Home"/></div>
}