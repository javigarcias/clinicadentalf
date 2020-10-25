import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import './Login.scss';


const Login = () => {
    const history = useHistory();


    const handleSubmit = event =>{
        event.preventDefault(); // para evitar refrescar la página
        const user ={
            email:event.target.email.value,
            password:event.target.password.value
        };
        axios.post('http://localhost:3001/clientes/login',user)
        .then(res=>{
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data));
            setTimeout(() => {
                history.push("/perfil")
            }, 1000);
        
        })
        .catch(error=>console.log(error.response.data))
    }
    return (
        <div className="general">
            <div className="headerReg">
                <div className="logoLogin"></div>
            </div>
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" name="email" required placeholder="Introduce tu email" />
            <input type="password" name="password" required placeholder="Introduce tu contraseña"/>
            <button type="submit">Log in</button>
            <Link to="/">HOME</Link>

        </form>
        </div>
    )
}

export default Login
