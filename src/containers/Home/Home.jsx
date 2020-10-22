import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
  
    return (
        <div className="home">
            < Link to="/register">REGISTRO</Link>
            <Link to="/login">LOGIN</Link>
        </div>
    )
   
    
}


export default Home;
