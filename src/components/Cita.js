import React from 'react';
import PropTypes from 'prop-types';

const Cita = ({cita, eliminarCita}) => ( 
    <div className="cita">
        <p>Paciente: <span>{cita.paciente}</span> </p>
        <p>Mutual: <span>{cita.mutual}</span> </p>
        <p>Fecha: <span>{cita.fecha}</span> </p>
        <p>Hora: <span>{cita.hora}</span> </p>
        <p>Sintomas: <span>{cita.sintomas}</span> </p>

        <button
            className="button eliminar u-full-width"
            onClick={ () => eliminarCita(cita.id)  }
        >Eliminar &times;</button>
    </div>
);
 
Cita.propTypes = {
    crearCita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired,
  }
 

export default Cita;