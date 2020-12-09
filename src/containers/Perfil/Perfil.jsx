import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './Perfil.scss';

const Perfil = () => {
  const clientelogeado = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const [cita, setCita] = useState();
  //const [citaCreada, setCitaCreada] = useState();
  const [datosCitas, setDatosCitas] = useState([]);


  //if(!clientelogeado) {return <Redirect to='/'/>}

  const getCita = (token) => {
    return axios.get('https://clinica-dental-b.herokuapp.com/citas/ver/' + token)
      .then((res) => {
        setDatosCitas(res.data.citas);
        //console.log (res.data.citas);
        return res;
      }).catch((err) => {
        console.log(err);

      });

  }


  useEffect( () => {

    /* const options = {
        params: {token: clientelogeado.token}}
    console.log(options) */
    const prueba = async () =>{

    await getCita(clientelogeado.token)

  }
  prueba ()
  
  }, []);


  const manejaCita = ev => {
    setCita({ ...cita, [ev.target.name]: ev.target.value });
  };

  const creaCita = async () => {
    
    let citaBody = {
      fecha: cita.fecha,
      email: clientelogeado.email,
      tratamiento: cita.tratamiento,
      iduser: clientelogeado.token
    };
    await axios.post('https://clinica-dental-b.herokuapp.com/citas/nuevacita', citaBody);
    await getCita(clientelogeado.token)


  }

  const logout = async () => {
    localStorage.clear();
    //await axios.put('http://localhost:3001/cliente/logout/' +clientelogeado.email);
    history.push('/');


  }

  const borraCita = async (cita) => {
    await axios.delete('https://clinica-dental-b.herokuapp.com/citas/cancelar/' + cita);


    await getCita(clientelogeado.token)


  }

  return (
    <div className="general">

      <div className="headerPerf">
        <div className="logoPerfil"></div>

        <div className="headerTit">
          <h2>Bienvenido {clientelogeado.name}</h2>
        </div>

        <div className="headerBot">
          <button className="logoutBot" onClick={logout}>SALIR</button>
        </div>

      </div>

      <div className="bodyPerfil">

        <div className="bodyCitas">

        <div className="titulo">
          <h3>Citas</h3>
        </div>
        <div className="citas">
          {datosCitas?.map(cita => <div className="cardCitas" key={cita._id} > {cita.fecha} --- {cita.tratamiento} <button className="cancBot" onClick={() => { borraCita(cita._id) }}>CANCELAR</button></div>)}
        </div>

        </div>

        <div className="nuevaCita">

          <div className="titulo">
            <h3>Nueva Cita</h3>
          </div>

          <div className="inputsCitas">
            <h4>Fecha</h4>
            <input type="text" placeholder="DD/MM/AAAA" name="fecha" onChange={manejaCita}></input>
            <h4>Tratamiento</h4>
            <input type="text" name="tratamiento" onChange={manejaCita}></input>
          </div>

          <div className="citaBot">
            <button className="botonCita" onClick={() => { creaCita() }} >Crear cita</button>
          </div>

        </div>



      </div>

    </div>
  )
}

export default Perfil
