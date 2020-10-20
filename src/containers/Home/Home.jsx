import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <button className="loginButton" onClick >LOGIN</button>
                <button className="registerButton" onClick >REGISTER </button>
            </div>
        )
    }
    
}


export default Home;
