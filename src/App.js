import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
            <footer className="footer bg-light text-center p-3">
                <p className="text-dark"><FontAwesomeIcon icon={faUser} /> <b>Author: </b><i>Lucas Passos de Siqueira</i></p>
                <p className="text-dark"> <FontAwesomeIcon icon={faGithub} /> <b>Github: </b><i><a target='_blank' href='https://github.com/Lucaspassosds'>Lucaspassosds</a></i></p>
                <p className="text-dark"> <FontAwesomeIcon icon={faLinkedin} /><i><a target='_blank' href='https://www.linkedin.com/in/lucas-siqueira-034b00188/'> My LinkedIn </a></i></p>
                <p className="text-dark"><i>MIT License Copyright © 2021 Lucas Passos de Siqueira</i></p>
            </footer>
        </Router>
    );
}

export default App;
