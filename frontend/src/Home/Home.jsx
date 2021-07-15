import React from 'react';
import DFLogo from '../Home/logonewcolor.gif'
import '../Home/Home.css'

export default function Home(){
    return (
        <div class="Home Page">
            <img class="logo" src={DFLogo} alt="DungeonFactory Logo" />
            <div class="main">
                <h2>DND 5th Edition Character Creator</h2>
            </div>
        </div>
    )
}
