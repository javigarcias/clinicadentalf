import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
  
    return (
        <div className="home">
            <div className="espacioSup">
                <div className="espacioLogo"></div>
            </div>
            <div className="homeLink">
                <Link to="/register">REGISTRO</Link>
                <Link to="/login">LOGIN</Link>
            </div>
        </div>
    )
   
    
}


export default Home;
