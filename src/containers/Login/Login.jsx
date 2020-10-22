import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Login = () => {
    const handleSubmit = event =>{
        event.preventDefault(); // para evitar refrescar la página
        const user ={
            email:event.target.email.value,
            password:event.target.password.value
        };
        axios.post('https://clinica-dental-db.herokuapp.com/clientes/login',user)
        .then(res=>{
            console.log(res)
        })
        .catch(error=>console.log(error.response.data))
    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" name="email" required placeholder="Introduce tu email" />
            <input type="password" name="password" required placeholder="Introduce tu contraseña"/>
            <button type="submit">Log in</button>
            <Link to="/">HOME</Link>

        </form>
    )
}

export default Login
