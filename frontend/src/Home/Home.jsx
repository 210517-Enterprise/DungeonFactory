import React from 'react';
import DFLogo from '../Home/logonewcolor.gif'
import '../Home/Home.css'


class Home extends React.Component {

    render() {
        return (

            <div class="Home Page">
                
                <img class="logo" src={DFLogo} alt="DungeonFactory Logo" />

                <div class="main">
                    
                    <h2>DND 5th Edition Character Creator</h2>

                <br />

                
                </div>
            
            </div>
        )
    }
}

export default Home;