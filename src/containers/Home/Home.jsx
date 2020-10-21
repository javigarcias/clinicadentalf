import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="home">
                < Link to="/register">REGISTRO</Link>
                <Link to="/login">LOGIN</Link>
            </div>
        )
    }
    
}


export default Home;
