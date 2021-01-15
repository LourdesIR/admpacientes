#Guia para el futuro.

## Paso a paso del desarrollo del Formulario con persistencia de datos/informacion.

** nota: La persistencia de la informacion es la capacidad de los datos de quedar almacenados local store u otro almacenamiento de los NAVEGADORES.
** ¿Donde veo los almacenamientos? En el inspector de elementos de una pagina se debe ir a la parte superior donde se encuntran 'Element, console, sources' y buscar en la flecha de al lado 'Application'. Este nos abre una barra lateral donde se puede leer STORES. Alli aparecen LocalStore y SecionStore. Con LocalStore creamos la persistencia, con SecionStore los datos se borran cuando el usuario cierra secion de una aplicacion. (no es el caso que estamos viendo aca).

# Paso 1 - Modificacion de Index.html y Creacion de los componentes App, formulario y citas basicos.

### Atencion! La hoja de estilo es unica y se llama index.css

#### ----- En Index.html ------

<!-- Modifico el Title y Agrego los 3 links siguientes -->
 <title>Administración de Pacientes</title>
    
<!-- Normalize ayuda a hacer responcive la pagina -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">

<!-- Coloco una fuente de google -->
<link href="https://fonts.googleapis.com/css?family=Staatliches" rel="stylesheet">
    
<!-- Uso Skeleton -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">

#### ----- En App.js ------

import React, { Fragment , useState, useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'

//Los className usados pertenecen a Skeleton
//Fragment permite poner todos los elementos como si fueran div diferentes, sin la necesidad de tener que ponerlos todos dentros de un div.

function App() {

//Arreglo de Citas (con S) son todas las citas - setCitas es GuardarCitas en este caso

const [citas,setCitas] = useState([])

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

\*\* Segun el profesor del curso por internet, cuando se mapea un elemento es necesario ponerle un KEY que para nosotros es en este caso cita.id

#### ----- En Formulario.js ------

\*\*crear carpeta components en el SRC y colocar los componentes dentro.

import React, {Fragment, useState} from 'react';

function App() {

//'setCita' es la actualizacion de 'cita'. En el objeto uso los mismos nombre que puese en los name del formulario siempre.

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

}

    //'u-full-width' es de skeleton y permite que el div ocupe todo el espacio disponible
    return (
        <Fragment>
        <h2>Crear Cita</h2>

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

export default Formulario;

#### ----- En Cita.js ------

import React from 'react';

//Propiedades pasadas desde app.js
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

export default Cita;

## Paso 2 - Formulario.js Manejo de datos, errores y id.

\*\*Una vez creado el state de citas con su objeto

//Agrego uuid con npm i uuid (este sirve para crear ids aleatorios) luego:
import uuid from 'uuid/dist/v4';

\*\*En el archivo luego de state citas:

    //Funcion que se ejecuta cuando el usuario escribe en el input.

    //State de Errores para verificar formulario, comienza en 'false' o 'null' porque el formulario aun no ha sido validado.
     const [err , actualizarError] = useState(false)

    //e me sirve para obtener informacion de los cambios en los inputs/TextArea e.target.value devuelve el valor de lo que se escribe.
    //En javaScript podria poner cita.paciente = e.target.value pero NO es una practica de React, entonces se usa setcita.

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

## Paso 3 - Pasar Citas ya creadas al Local Store.

#### ----- En App.js ------

//Citas en LocalStorage

//Local Storage solo guarda string por eso debemos usar JSON.parse

let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
citasIniciales=[];
}

//citasIniciales pasa a ser el arreglo inicial de citas, por si hay alguna guardada en la maquina del usuario.
//Entonces modificamos el useState de citas.

const [citas,setCitas] = useState(citasIniciales)

\*\*Ejemplo de uso de useState cuando cambia citas - No cuenta cuando hay un error en el formulario este paso no es necesario en esta aplicacion.
//Los corchetes [] se usan para que no se arme un ciclo y solo se ejecute uno por vez
//Se usa para guardar con los cambios de estados.

useEffect (() => {
console.log('Has creado o eliminado una cita');
}, []);

## Paso 4 - Prototype

//PropTypes sirven para validar los tipos de datos usados - es como realizar un modelo de datos dentro del mismo componente.

#### ----- En Formulario.js ------

import PropTypes from 'prop-types';

//Luego de la funcion formulario, antes del export.
//Solo se crea el prototypo de 'crearCitas' porque es la unica propiedad que se le pasa a formulario desde el App.js

Formulario.propTypes = {
crearCita: PropTypes.func.isRequired
}

#### ----- En Cita.js ------

//En este caso se le pasan 2 propiedades desde App.js
import PropTypes from 'prop-types';

Cita.propTypes = {
crearCita: PropTypes.object.isRequired,
eliminarCita: PropTypes.func.isRequired,
}

#### ----- En App.js ------

//En useEffect se agrega:

useEffect (() => {
//se reedeclara citasIniciales dentro de useEffect para que no de error la funcion PropType del componente citas:

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    console.log('Has creado o eliminado una cita');

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]))
    }

}, [citas]);s

## -- React y node --

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
