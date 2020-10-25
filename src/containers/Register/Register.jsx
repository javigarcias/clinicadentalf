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
            nombre: event.target.nombre.value,
            apellidos: event.target.apellidos.value,
            direccion: event.target.direccion.value,
            email: event.target.email.value,
            telefono: event.target.telefono.value,
            edad: event.target.edad.value,
            password: event.target.password.value
        };
        axios.post('http://localhost:3001/clientes/registro', user)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                setMensaje(`${res.data.nombre} Registrado correctamente`)
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

                    <h4>Dirección <input type="text" name="direccion" required /></h4>

                    <h4>Email <input type="email" name="email" required /></h4>

                    <h4>Teléfono <input type="tel" name="telefono" required /></h4>

                    <h4>Edad <input type="number" name="edad" required /></h4>

                    <h4>Password <input type="password" name="password" required /></h4>
                    <p>*Debe contener entre 8 y 10 caracteres</p>
                    <p>uso de mayúscula, minúscula</p>
                    <p>y un carácter especial</p>

                    <div className="botones">
                        <div className="registro">
                            <button className="botonesAccion" type="submit">REGISTRAR</button>
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
