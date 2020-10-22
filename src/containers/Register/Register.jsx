import React, {useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';





const Register = () => {
    
    
    const history = useHistory();
    const [mensaje, setMensaje] = useState("");
    
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
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data)); 
            setMensaje(`${res.data.nombre}, bienvenid@ a nuestra app`)
            setTimeout(() => {
                history.push("/perfil")
            }, 1500);
            
        })
        .catch(error=>setMensaje(error.response.data.message));
    }
    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h3>Nombre</h3>
            <input type="text" name="nombre" required placeholder="Introduce tu nombre" />
            <h3>Apellidos</h3>
            <input type="text" name="apellidos" required placeholder="Introduce tus apellidos" />
            <h3>Dirección</h3>
            <input type="text" name="direccion" required placeholder="Introduce tu dirección" />
            <h3>Email</h3>
            <input type="email" name="email" required placeholder="Introduce tu email" />
            <h3>Teléfono</h3>
            <input type="tel" name="telefono" required placeholder="Introduce tu teléfono" />
            <h3>Edad</h3>
            <input type="number" name="edad" required placeholder="Introduce tu edad" />
            <h3>Password</h3>
            <input type="password" name="password" required placeholder="Introduce tu contraseña"/>
            <button type="submit">REGISTRAR</button>
            <Link to="/">HOME</Link>
            <div>{mensaje}</div>
        </form>
    )
}

export default Register
