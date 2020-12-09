import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import './Login.scss';


const Login = () => {
    const history = useHistory();


    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        const user = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        axios.post('http://localhost:8000/api/login', user)
            .then(res => {
                console.log(res);
                localStorage.setItem("user", JSON.stringify(res.data));
                console.log(res);
                if(res.data.rol === "0"){
                    history.push("/perfil")

                }else{
                    history.push("/admin")
                }
               /*  setTimeout(() => {
                    history.push("/perfil")
                }, 1000); */

            })
            .catch(error => console.log(error.response.data))
    }
    return (
        <div className="general">
            <div className="headerReg">
                <div className="logoLogin"></div>
            </div>
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="input" type="email" name="email" required placeholder="Introduce tu email" />
                    <input className="input" type="password" name="password" required placeholder="Introduce tu contraseña" />
                    <div className="botones">
                            <div className="homeLink">
                                <button type="submit" className="botonesAccion">Login</button>
                                <Link to="/">Volver</Link>
                            </div>               
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
