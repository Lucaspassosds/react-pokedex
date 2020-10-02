import React, { useEffect, useState } from 'react';
import axios from 'axios';
import global from '../globals';
const { api } = global;

const PokedexList = props => {

    const [pokeList, setPokeList] = useState([]);
    
    useEffect(() => {
        axios
            .get(`${api}?limit=151`)
            .then(res => {
                console.log(res);
                setPokeList(res.data.results);
            })
            .catch(err => {
                console.log(err);
            });
      }, []);

    const loadPokeList = () => pokeList.map((value, i) => 
            <tr>
                <td>{i+1}</td>
                <td>{value.name}</td>
            </tr>
        );
    

    return(
        <div class="container">
            <table className="table table-striped mt-20">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {loadPokeList()}
                </tbody>
            </table>
        </div>
    );
}

export default PokedexList;