import React, { useEffect, useState } from "react";
import axios from "axios";
import global from "../globals";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../css/App.css";
const { api } = global;

const PokedexList = (props) => {
    const [pokeList, setPokeList] = useState([]);
    const [pokeImgList, setPokeImgList] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        name: "",
        primaryType: "",
        secondaryType: "",
    });
    const [showFilterOptions, setShowFilterOptions] = useState(false);

    const colors = {
        water: "#3d7ea6",
        fire: "#cf1b1b",
        grass: "#065446",
        poison: "#3b2e5a",
        flying: "#86c4ba",
        rock: "#523906",
        ground: "#ffd36b",
        ice: "#a3d2ca",
        dragon: "#394989",
        dark: "#41444b",
        ghost: "#16213e",
        psychic: "#ed6663",
        fighting: "#900d0d",
        normal: "#99b898",
        bug: "#81b214",
        electric: "#f0a500",
        steel: "#767c77",
        fairy: "#f09ae9",
    };
    const types = [
        "",
        "Water",
        "Fire",
        "Grass",
        "Poison",
        "Flying",
        "Rock",
        "Ground",
        "Ice",
        "Dragon",
        "Dark",
        "Ghost",
        "Psychic",
        "Fighting",
        "Normal",
        "Bug",
        "Electric",
        "Steel",
        "Fairy",
    ];

    useEffect(() => {
        for (let id = 1; id <= 151; id++) {
            const route = `${api}/${id}`;
            axios
                .get(route)
                .then((res) => {
                    const pokemon = {
                        id: res.data.id,
                        name: res.data.name,
                        type: [
                            res.data.types[0].type.name,
                            res.data.types[1]?.type.name,
                        ],
                        color: colors[res.data.types[0].type.name],
                    };
                    setPokeList((prevList) => [...prevList, pokemon]);
                    axios.get(`${res.data.forms[0].url}`).then((imgRes) => {
                        // console.log(imgRes);
                        const pokeImg = {
                            id: res.data.id,
                            src: imgRes.data.sprites.front_default,
                        };
                        setPokeImgList((prevList) => [...prevList, pokeImg]);
                    });
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const loadPokeList = () => {
        let list = pokeList;
        const imgList = pokeImgList;

        imgList.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        list.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });

        if (filterOptions.name !== "") {
            list = list.filter((value) =>
                value.name.includes(filterOptions.name.toLowerCase())
            );
        }
        if (filterOptions.primaryType !== "") {
            list = list.filter((value) =>
                value.type[0].includes(filterOptions.primaryType.toLowerCase())
            );
        }
        if (filterOptions.secondaryType !== "") {
            list = list.filter((value) =>
                value.type[1]?.includes(
                    filterOptions.secondaryType.toLowerCase()
                )
            );
        }

        console.log(list);

        return list.map((value, i) => {
            const name =
                value.name.charAt(0).toUpperCase() + value.name.slice(1);
            const primeiroTipo = value.type[0];
            const segundoTipo = value.type[1];

            // console.log('ID: '+value.id);
            // console.log(pokeImgList[value.id]);

            return (
                <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{name}</td>
                    <td>
                        <img
                            src={pokeImgList[value.id - 1]?.src}
                            alt={name}
                        ></img>
                    </td>
                    <td>
                        <span
                            className="type_text"
                            style={{ backgroundColor: colors[primeiroTipo] }}
                        >
                            {primeiroTipo.toUpperCase()}
                        </span>{" "}
                        {segundoTipo && (
                            <span
                                className="type_text"
                                style={{ backgroundColor: colors[segundoTipo] }}
                            >
                                {segundoTipo.toUpperCase()}
                            </span>
                        )}
                    </td>
                </tr>
            );
        });
    };

    const filterNameChange = (e) => {
        const value = e.target.value;
        setFilterOptions((prevState) => ({
            ...prevState,
            name: value,
        }));
    };
    const filterPrimaryChange = (e) => {
        setFilterOptions((prevState) => ({
            ...prevState,
            primaryType: e.value,
        }));
    };
    const filterSecondaryChange = (e) => {
        setFilterOptions((prevState) => ({
            ...prevState,
            secondaryType: e.value,
        }));
    };

    return (
        <div className="container">
            {showFilterOptions ? (
              <>
                <form>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={filterNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Primary type:</label>
                        <Dropdown
                            options={types}
                            onChange={filterPrimaryChange}
                            placeholder="Select an option"
                        />
                    </div>
                    <div className="form-group">
                        <label>Secondary type:</label>
                        <Dropdown
                            options={types}
                            onChange={filterSecondaryChange}
                            placeholder="Select an option"
                        />
                    </div>
                </form>
                <button
                    className="btn btn-danger col-md-12"
                    onClick={() => setShowFilterOptions(false)}
                >
                  CLOSE FILTER
                  </button>
              </>
            ) : (
                <button
                    className="btn btn-outline-primary col-md-12"
                    onClick={() => setShowFilterOptions(true)}
                >
                    FILTER
                </button>
            )}
            <table className="table table-striped mt-20">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Type(s)</th>
                    </tr>
                </thead>
                <tbody>{loadPokeList()}</tbody>
            </table>
        </div>
    );
};

export default PokedexList;
