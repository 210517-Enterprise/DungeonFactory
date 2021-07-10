import React from 'react';
import DFLogo from '../Home/DFLogo.gif'
import '../Home/Home.css'


class Home extends React.Component {

    render() {
        return (


            <div>

                <div class="Home Page">
                    
                    <div class="image-holder">
                    <img src={DFLogo} alt="DungeonFactory Logo" />
                    </div>
                


                    <div class="main">
                        
                        <h2>DND 5th Edition Character Creator</h2>

                    <br />

                    
                    </div>
                
                </div>

            </div>
        )
    }
}

export default Home;