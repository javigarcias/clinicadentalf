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

  const getCita = (user) => {
    //return axios.get('https://clinica-dental-b.herokuapp.com/citas' + token)
    return axios.get(`http://localhost:8000/api/user/${user}/citas`)
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

  const creaCita = async () => {
    
    let citaBody = {
      fecha: cita.fecha,
      hora: cita.hora,
      tratamiento: cita.tratamiento,
      user_id: clientelogeado.id,
      dentista_id: '1'
    };
    await axios.post('http://localhost:8000/api/citas', citaBody);
    await getCita(clientelogeado.id)


  }

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
        <div className="citas">
          {datosCitas?.map(cita => <div className="cardCitas" key={cita.id} > {cita.tratamiento} | {cita.fecha} | {cita.hora} <button className="cancBot" onClick={() => { borraCita(cita.id) }}>CANCELAR</button></div>)}
        </div>

        </div>

        <div className="nuevaCita">

          <div className="titulo">
            <h3>Nueva Cita</h3>
          </div>

          <div className="inputsCitas">
            <h4>Fecha</h4>
            <input type="text" placeholder="AAAA/MM/DD" name="fecha" onChange={manejaCita}></input>
            <h4>Hora</h4>
            <input type="text" placeholder="HH:MM" name="hora" onChange={manejaCita}></input>
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
