import Axios from 'axios';
import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'

const Perfil = () => {
    const clientelogeado = localStorage.getItem('user');
    const history = useHistory();
    const [cita, setCita] = useState({
        fecha:"",
        tratamiento:""
    });

    if(!clientelogeado) return <Redirect to='/'/>

    const manejaCita = ev => {
        setCita({...cita, [ev.target.name] : ev.target.value});
    };

    const creaCita = () => {
        let citaBody = {
            fecha : cita.fecha,
            tratamiento : cita.tratamiento,
            ideuser : clientelogeado._id,
            estado : "pendiente"  
        };
        Axios.post('http://localhost:3001/citas/nuevacita', citaBody)
    }



    const logout = ev => {
        localStorage.clear();
        history.push("/")
    }
    return (
        <div className="profile">
            <h2>VISTA PERFIL</h2>
            <h3>Nueva Cita</h3>
            <h4>Fecha</h4>
            <input type="text" placeholder="DD/MM/AAAA" name="fecha" onChange={manejaCita}></input>
            <h4>Tratamiento</h4>
            <input type="text" placeholder="Tratamiento" name="tratamiento" onChange={manejaCita}></input>
            <button onClick={() => {creaCita()}} >Crear cita</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Perfil
