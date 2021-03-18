import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PokedexList from './components/PokedexList.component';


function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark-gray border-bottom justify-content-center">
            <Link to={'/'} className="navbar-brand">PokeDex</Link>
        </nav>
      <Switch>
        <Route exact path="/" component={PokedexList}/>
      </Switch>
    </Router>
    
  );
}

export default App;
