import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Register = () => {
    const handleSubmit = event =>{
        event.preventDefault(); // para evitar refrescar la página
        const user ={
            nombre:event.target.nombre.value,
            apellidos:event.target.apellidos.value,
            direccion:event.target.direccion.value,
            email:event.target.email.value,
            telefono:event.target.telefono.value,
            edad:event.target.edad.value,
            password:event.target.password.value
        };
        axios.post('http://localhost:3001/clientes/registro',user)
        .then(res=>{
            console.log(res)
        })
        .catch(error=>console.log(error.response.data))
    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" name="nombre" required placeholder="Introduce tu nombre" />
            <input type="text" name="apellidos" required placeholder="Introduce tus apellidos" />
            <input type="text" name="direccion" required placeholder="Introduce tu dirección" />
            <input type="email" name="email" required placeholder="Introduce tu email" />
            <input type="tel" name="telefono" required placeholder="Introduce tu teléfono" />
            <input type="number" name="edad" required placeholder="Introduce tu edad" />
            <input type="password" name="password" required placeholder="Introduce tu contraseña"/>
            <button type="submit">Log in</button>
            <Link to="/">HOME</Link>

        </form>
    )
}

export default Register
