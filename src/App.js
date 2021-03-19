import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokedexList from "./components/PokedexList.component";
import Pokemon from "./components/Pokemon.component";
import "./css/App.css";

function App() {
    return (
        <Router>
            <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom justify-content-center fixed-top'>
                <Link to={"/"} className='navbar-brand'>
                   <p className="main-text">PokeDex</p>
                </Link>
            </nav>
            <Switch>
                <Route exact path='/' component={PokedexList} />
                <Route path='/pokemon/:id' component={Pokemon} />
            </Switch>
        </Router>
    );
}

export default App;
