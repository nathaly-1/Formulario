import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Form from "./components/Form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import Inicio from './components/Inicio';
import Productos from './components/Productos';
import Informacion from './components/Informacion';



function App() {
  return (
    <Router>
      <div className="container" >
        <h1><center>Bienvenido a "Candy Sweet"</center></h1>
        <hr />
        <div className="btn-group btn-group-lg" role="group" aria-label="Large button group">
          <NavLink to={'/'} className="btn btn-primary" >
            Inicio
          </NavLink>

          <Link to={"/Productos"} className="btn btn-warning" >
            Productos
          </Link>

        
          <Link to={"/Form"} className="btn btn-primary">
            Clientes
          </Link>

          <Link to={"/Informacion"} className="btn btn-success " >
            Informacion
          </Link>
        </div>
      
        <hr />
        <Switch>
          <Route path='/' exact>
            <Inicio />
          </Route>
          <Route path='/Productos'>
            <Productos />
          </Route>
          
          <Route path='/Form'>
            <Form />
          </Route>

          <Route path='/Informacion'>
            <Informacion />
          </Route>
        </Switch>

      </div>

    </Router>

  );
}


export default App;
