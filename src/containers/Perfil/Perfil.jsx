import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Perfil = () => {
    const clientelogeado = JSON.parse( localStorage.getItem('user'));
    const history = useHistory();
    const [cita, setCita] = useState();
    //const [citaCreada, setCitaCreada] = useState();
    const [datosCitas, setDatosCitas] = useState([]);
    

    //if(!clientelogeado) {return <Redirect to='/'/>}

    const getCita = (token)=>{
        return axios.get('http://localhost:3001/citas/ver/' +token)
        .then((res) => {
            setDatosCitas(res.data.citas);
            //console.log (res.data.citas);
            return res;
            

        }).catch( (err) => {
            console.log( err );

        });

    }

    useEffect(async() => {

        /* const options = {
            params: {token: clientelogeado.token}}
        console.log(options) */
       await getCita(clientelogeado.token)
    },[]);


    const manejaCita = ev => {
        setCita({...cita, [ev.target.name] : ev.target.value});
    };
    
    const creaCita = async () => { 
        //console.log(clientelogeado)
        let citaBody = {
            fecha : cita.fecha,
            email : clientelogeado.email,
            tratamiento : cita.tratamiento,
            iduser : clientelogeado.token
        };
        await axios.post('http://localhost:3001/citas/nuevacita', citaBody);
        await getCita(clientelogeado.token)
        
        
    }

    const logout = async () => {
        localStorage.clear();
        //await axios.put('http://localhost:3001/cliente/logout/' +clientelogeado.email);
        history.push('/');
        
        
    }

    const borraCita = async (cita) => {
        await axios.delete('http://localhost:3001/citas/cancelar/' + cita);


        await getCita(clientelogeado.token)


    }
    
    return (
        <div className="profile">
            <h2>Bienvenido {clientelogeado.nombre}</h2>
            <div>
                <h3>Nueva Cita</h3>
                <h4>Fecha</h4>
            <input type="text" placeholder="DD/MM/AAAA" name="fecha" onChange={manejaCita}></input>
            <h4>Tratamiento</h4>
            <input type="text" placeholder="Tratamiento" name="tratamiento" onChange={manejaCita}></input>
            </div>
            <button onClick={() => {creaCita()}} >Crear cita</button>
            
            <button onClick={logout}>Logout</button>
    
            <div>
            {datosCitas?.map(cita => <div className="cardCitas" key={cita._id} > {cita.fecha} --- {cita.tratamiento} <button onClick={() => {borraCita(cita._id)}}>CANCELAR</button></div>)}           
            </div>

        </div>
    )
}

export default Perfil
