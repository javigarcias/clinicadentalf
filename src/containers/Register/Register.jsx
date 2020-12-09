import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import './Register.scss';



const Register = () => {


    const history = useHistory();
    const [mensaje, setMensaje] = useState();


    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        const user = {
            name: event.target.nombre.value,
            lastName: event.target.apellidos.value,
            phone: event.target.telefono.value,
            email: event.target.email.value,
            password: event.target.password.value,
            //direccion: event.target.direccion.value,
            //edad: event.target.edad.value
        };
        axios.post('http://localhost:8000/api/registro', user)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                setMensaje(`${res.data.name} Registrado correctamente`)
                setTimeout(() => {
                    history.push("/perfil")
                }, 1500);

            })
            .catch(error => setMensaje(error.response.data.message));
    }


    return (
        <div className="general">
            <div className="headerReg">
                <div className="logoRegistro"></div>
            </div>
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h4>Nombre <input type="text" name="nombre" required /></h4>
                    <h4>Apellidos <input type="text" name="apellidos" required /></h4>
                    <h4>Teléfono <input type="tel" name="telefono" required /></h4>
                    <h4>Email <input type="email" name="email" required /></h4>
                    <h4>Password <input type="password" name="password" required /></h4>
                    <div className="botones">
                        <div className="registro">
                            <button className="botonesAccion" type="submit">Registrar</button>
                            <div className="homeLink">
                                <Link to="/">Volver</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mensajeOk">
                        {mensaje}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
