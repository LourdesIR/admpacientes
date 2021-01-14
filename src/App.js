import React, { Fragment , useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

//Los className usados pertenecen a Skeleton
function App() {

  //Citas en LocalStorage
  //Local Storage solo guarda string por eso debemos usar JSON.parse
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales=[];
  }

  //citasIniciales pasa a ser el arreglo inicial de citas, por si hay alguna guardada en la maquina del usuario.
  //Arreglo de Citas (con S) son todas las citas - setCitas es GuardarCitas en este caso
  const [citas,setCitas] = useState(citasIniciales)

  //Ejemplo de uso de useState cuando cambia citas - No cuenta cuando hay un error en el formulario
  //Los corchetes [] se usan para que no se arme un ciclo y solo se ejecute uno por vez
  //Se usa para guardar con los cambios de estados.
  useEffect (() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    console.log('Has creado o eliminado una cita');

    //se reedeclara citasIniciales dentro de useEffect para que no de error la funcion PropType del componente citas.
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas]);

  //Funcion que toma las citas actuales y agrega las nuevas
  const crearCita = cita => {
    setCitas([
      ...citas,
      cita
     ]);
    
  }

  //Funcion para eliminar Cita por ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    setCitas(nuevasCitas);
  
  }

  //Mensajes condicional con ternario cuando no hay citas
  const titulo = citas.length === 0 ? 'No hay citas aún': 'Administra tus citas' ;

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita}/>
          </div>
          <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map( cita => (
            <Cita 
            key={cita.id}
            cita={cita}
            eliminarCita={eliminarCita}
            />
          ))}
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
