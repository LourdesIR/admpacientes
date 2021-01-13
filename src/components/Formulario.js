import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
//PropTypes sirven para validar los tipos de datos usado - ver al final del documento
import PropTypes from 'prop-types';

//'u-full-width' es de skeleton y permite que el div ocupe todo el espacio disponible
//'setCita' es la actualizacion de 'cita'. En el objeto uso los mismos nombre que puese en los name del formulario.
//'handleChange' puede llevar otro nombre : por ejemplo 'actualizarState' pero es una buena practica poner handle.
const Formulario = ({crearCita}) => {
    
    // State de Citas.
    const [cita, setCita]=useState(
        {
            paciente:'',
            mutual:'',
            fecha:'',
            hora:'',
            sintomas:'',
        })

    //State de Errores para verificar formulario, comienza en 'false' o 'null' porque el formulario aun no ha sido validado.
     const [err , actualizarError] = useState(false)



    //Funcion que se ejecuta cuando el usuario escribe en el input.

    //e me sirve para obtener informacion de los cambios en los inputs/TextArea e.target.value devuelve el valor de lo que se escribe.
    //En javaScript podria poner cita.paciente = e.target.value pero NO es una practica de React, entonces se usa set cita.
    
    const handleChange = e => {
        setCita({
            ...cita, //es una copia de las citas inicial o actual, hecha con spread operator para que no solo devuelva el valor de e.target.
            [e.target.name]: e.target.value //[e.target.name] es una destructuracion y se puede utilizar en este caso porque hicimos coincidir los name del input con las propiedades del objetos.
        })
        }

    // Extraigo los valores.
    // Se recomienda que esten en el value del imput los mismo nombres. Nos permite luego recetear el formulario.
    const {paciente,mutual,fecha,hora,sintomas} = cita;

    //Cuando el usuario aprieta submit
    const submitCita = e => {
        e.preventDefault(); //igual que en AJAX para prevenir eventos por defaul (en este caso pasar los parametros por Query metodo get)
        
        //1 - Validar los campos del form
        //trim solo elimina los espacios en blanco al inicio y al final
           
        if(paciente.trim()==='' || mutual.trim()==='' || fecha.trim()==='' || hora.trim()==='' || sintomas.trim()==='' ){
            actualizarError(true);
             //es importante para que no se siga ejecutando el codigo.
            return;
            }

        //Eliminar el mensaje previo que quedo de error
        actualizarError(false);

        //2- Asignar un ID 
        //se uso 'npm i uuid'
        cita.id = uuid();

        //Crear la cita
        //crearCita viene del padre en Apps como props
        crearCita(cita);

        //Reiniciar el form
        setCita({
            paciente:'',
            mutual:'',
            fecha:'',
            hora:'',
            sintomas:'',
        })
    }

    
    //Utilizo un ternario en el error debajo de h2 {si pasa esto ? has esto : caso contrario has esto}
    return ( 
        <Fragment>
        <h2>Crear Cita</h2>

        { err ? <p className='alerta-error'>Revisa el formulario, todos los campos son obligatorios</p> : null }
        <form 
         onSubmit={submitCita}
        >
        <label>Nombre y Apellido</label>
        <input
        type='text'
        name='paciente'
        className='u-full-width'
        placeholder='Nombre del Paciente completo'
        onChange={handleChange}
        value={paciente}
        />
        <label>Obra Social</label>
        <input
        type='text'
        name='mutual'
        className='u-full-width'
        placeholder='Obra social, prepaga o particular'
        onChange={handleChange}
        value={mutual}
        />
        <label>Fecha de la cita</label>
        <input
        type='date'
        name='fecha'
        className='u-full-width'
        onChange={handleChange}
        value={fecha}
        
        />
         <label>Hora</label>
        <input
        type='time'
        name='hora'
        className='u-full-width'
        onChange={handleChange}
        value={hora}
        
        />
        <label>Motivo de la consulta</label>
        <textarea
        className='u-full-width'
        name='sintomas'
        onChange={handleChange}
        value={sintomas}
        ></textarea>

         <button
         type='submit'
         className='u-full-width button-primary'

         >Tomar cita</button>
        </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
  }
 
export default Formulario;