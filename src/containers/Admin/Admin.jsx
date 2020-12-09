import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './Admin.scss';

const Admin = () => {
  const clientelogeado = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const [cita, setCita] = useState();
  //const [citaCreada, setCitaCreada] = useState();
  const [datosCitas, setDatosCitas] = useState([]);
  console.log(datosCitas);


  //if(!clientelogeado) {return <Redirect to='/'/>}

  const getCita = (user) => {
    return axios.get('http://localhost:8000/api/indexAll')
      .then((res) => {
        setDatosCitas(res.data);
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

    await getCita(clientelogeado.id)

  }
  prueba ()
  
  }, []);


  const manejaCita = ev => {
    setCita({ ...cita, [ev.target.name]: ev.target.value });
  };


  const logout = async () => {
    localStorage.clear();
    //await axios.get('http://localhost:8000/api/logout');
    //await axios.put('http://localhost:3001/cliente/logout/' +clientelogeado.email);
    history.push('/');


  }

  const borraCita = async (cita) => {
    await axios.delete('http://localhost:8000/api/citas/' + cita);


    await getCita(clientelogeado.id)


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
        <div className="citasAdmin">
          {datosCitas?.map(cita => <div className="cardCitas" key={cita.id} > {cita.user_id} - {cita.tratamiento} | {cita.fecha} | {cita.hora} <button className="cancBot" onClick={() => { borraCita(cita.id) }}>CANCELAR</button></div>)}
        </div>

        </div>

      </div>

    </div>
  )
}

export default Admin
