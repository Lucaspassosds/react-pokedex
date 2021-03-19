import React, { useEffect, useState } from "react";
import Radium from "radium";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleRight,
    faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-dropdown";
import Td from "./TableData.component";
import global from "../globals";
import "react-dropdown/style.css";
import "../css/App.css";
const { api, colors, types, generationConfig } = global;

const PokedexList = (props) => {
    const [pokeList, setPokeList] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        name: "",
        primaryType: "",
        secondaryType: "",
    });
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentGen, setCurrentGen] = useState(0);

    const generations = [
        "Gen 1",
        "Gen 2",
        "Gen 3",
        "Gen 4",
        "Gen 5",
        "Gen 6",
        "Gen 7",
    ];

    //gambiarra
    let bg;
    switch (currentGen) {
        case 0:
            bg = require("../assets/images/gen1.jpg");
            break;
        case 1:
            bg = require("../assets/images/gen2.jpg");
            break;
        case 2:
            bg = require("../assets/images/gen3.png");
            break;
        case 3:
            bg = require("../assets/images/gen4.jpg");
            break;
        case 4:
            bg = require("../assets/images/gen5.jpg");
            break;
        case 5:
            bg = require("../assets/images/gen6.jpg");
            break;
        case 6:
            bg = require("../assets/images/gen7.jpg");
            break;
        default:
            bg = require("../assets/images/gen1.jpg");
            break;
    }

    useEffect(() => {
        async function getPokemons() {
            setLoading(true);
            const { start, end } = generationConfig[currentGen];
            for (let id = start; id <= end; id++) {
                const route = `${api}/${id}`;
                try {
                    const res = await axios.get(route);
                    console.log("STATUS", res.status);
                    const pokemon = {
                        id: res.data.id,
                        name: res.data.name,
                        type: [
                            res.data.types[0].type.name,
                            res.data.types[1]?.type.name,
                        ],
                        color: colors[res.data.types[0].type.name],
                        src: res.data.sprites.front_default,
                    };
                    setPokeList((prevList) => [...prevList, pokemon]);
                } catch (err) {
                    console.error("FETCH POKEMON ERROR", err);
                }
            }
            setLoading(false);
        }
        getPokemons();
    }, [currentGen]);

    const loadPokeList = () => {
        let list = pokeList;
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

        return list.map((value, i) => {
            const name =
                value.name.charAt(0).toUpperCase() + value.name.slice(1);
            const primaryType = value.type[0];
            const secondaryType = value.type[1];

            return (
                <tr
                    key={value.id}
                    style={{
                        transition: "0.75s",
                        ":hover": {
                            backgroundColor: value.color,
                            color: "white",
                        },
                    }}
                >
                    <Td to={`/pokemon/${value.id}`}>{value.id}</Td>
                    <Td to={`/pokemon/${value.id}`}>{name}</Td>
                    <Td to={`/pokemon/${value.id}`}>
                        <img src={value.src} alt={name}></img>
                    </Td>
                    <td>
                        <span
                            className='type-text'
                            style={{ backgroundColor: colors[primaryType] }}
                        >
                            {primaryType.toUpperCase()}
                        </span>{" "}
                        {secondaryType && (
                            <span
                                className='type-text'
                                style={{
                                    backgroundColor: colors[secondaryType],
                                }}
                            >
                                {secondaryType.toUpperCase()}
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
        if (e.value !== "Any") {
            setFilterOptions((prevState) => ({
                ...prevState,
                primaryType: e.value,
            }));
        } else {
            setFilterOptions((prevState) => ({
                ...prevState,
                primaryType: "",
            }));
        }
    };
    const filterSecondaryChange = (e) => {
        if (e.value !== "Any") {
            setFilterOptions((prevState) => ({
                ...prevState,
                secondaryType: e.value,
            }));
        } else {
            setFilterOptions((prevState) => ({
                ...prevState,
                primaryType: "",
            }));
        }
    };
    const selectGenerationChange = (e) => {
        setCurrentGen(generations.indexOf(e.value));
        setPokeList([]);
    };

    return (
        <div className='bg-img' style={{ backgroundImage: `url(${bg})` }}>
            <div className='p-3 layer'>
                <div
                    className='left'
                    style={{
                        visibility: currentGen !== 0 ? "visible" : "hidden",
                    }}
                    data-tooltip={`Generation ${currentGen}`}
                >
                    <FontAwesomeIcon
                        size='4x'
                        icon={faAngleDoubleLeft}
                        onClick={() => {
                            if (currentGen > 0 && !loading) {
                                setCurrentGen(currentGen - 1);
                                setPokeList([]);
                            }
                        }}
                        data-tooltip='teste'
                    />
                </div>
                <div
                    className='right'
                    style={{
                        visibility: currentGen !== 6 ? "visible" : "hidden",
                    }}
                    data-tooltip={`Generation ${currentGen + 2}`}
                >
                    <FontAwesomeIcon
                        size='4x'
                        icon={faAngleDoubleRight}
                        onClick={() => {
                            if (currentGen < 6 && !loading) {
                                setCurrentGen(currentGen + 1);
                                setPokeList([]);
                            }
                        }}
                        data-tooltip='teste'
                    />
                </div>
                <div className='container pokedex'>
                    {showFilterOptions ? (
                        <div className='p-2 mb-2 rounded'>
                            <form style={{ backgroundColor: "white" }}>
                                <div className='form-group'>
                                    <label>Name: </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        onChange={filterNameChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Primary type:</label>
                                    <Dropdown
                                        options={types}
                                        onChange={filterPrimaryChange}
                                        placeholder='Select an option'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Secondary type:</label>
                                    <Dropdown
                                        options={types}
                                        onChange={filterSecondaryChange}
                                        placeholder='Select an option'
                                    />
                                </div>
                            </form>
                            <button
                                className='btn btn-danger col-md-12 mb-2'
                                onClick={() => setShowFilterOptions(false)}
                            >
                                CLOSE FILTER
                            </button>
                        </div>
                    ) : !loading ? (
                        <button
                            className='btn btn-outline-primary col-md-12 mb-2'
                            onClick={() => setShowFilterOptions(true)}
                        >
                            FILTER
                        </button>
                    ) : (
                        <></>
                    )}
                    <div className='poke-container mb-5'>
                        {loading ? (
                            <div className='loader-container'>
                                <img
                                    className='snorlax'
                                    src={require("../assets/images/snorlax.gif")}
                                    alt='Zzzzzz'
                                />
                                <div className='wavy'>
                                    <span style={{ "--i": 1 }}> L </span>
                                    <span style={{ "--i": 2 }}> o </span>
                                    <span style={{ "--i": 3 }}> a </span>
                                    <span style={{ "--i": 4 }}> d </span>
                                    <span style={{ "--i": 5 }}> i </span>
                                    <span style={{ "--i": 6 }}> n </span>
                                    <span style={{ "--i": 7 }}> g </span>
                                    <span style={{ "--i": 8 }}> . </span>
                                    <span style={{ "--i": 9 }}> . </span>
                                    <span style={{ "--i": 10 }}> . </span>
                                    <span style={{ "--i": 11 }}>&nbsp;</span>
                                    <span style={{ "--i": 12 }}> T </span>
                                    <span style={{ "--i": 13 }}> h </span>
                                    <span style={{ "--i": 14 }}> i </span>
                                    <span style={{ "--i": 15 }}> s </span>
                                    <span style={{ "--i": 16 }}>&nbsp;</span>
                                    <span style={{ "--i": 17 }}> m </span>
                                    <span style={{ "--i": 18 }}> i </span>
                                    <span style={{ "--i": 19 }}> g </span>
                                    <span style={{ "--i": 20 }}> h </span>
                                    <span style={{ "--i": 21 }}> t </span>
                                    <span style={{ "--i": 22 }}>&nbsp;</span>
                                    <span style={{ "--i": 23 }}> t </span>
                                    <span style={{ "--i": 24 }}> a </span>
                                    <span style={{ "--i": 25 }}> k </span>
                                    <span style={{ "--i": 26 }}> e </span>
                                    <span style={{ "--i": 27 }}>&nbsp;</span>
                                    <span style={{ "--i": 28 }}> a </span>
                                    <span style={{ "--i": 29 }}>&nbsp;</span>
                                    <span style={{ "--i": 30 }}> w </span>
                                    <span style={{ "--i": 31 }}> h </span>
                                    <span style={{ "--i": 32 }}> i </span>
                                    <span style={{ "--i": 33 }}> l </span>
                                    <span style={{ "--i": 34 }}> e </span>
                                    <span style={{ "--i": 35 }}> . </span>
                                    <span style={{ "--i": 36 }}> . </span>
                                    <span style={{ "--i": 37 }}> . </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3 className='gen-name'>
                                    Generation {currentGen + 1}
                                </h3>
                                <div className='goto'>
                                    <p className='goto-txt'>Go to Gen</p>
                                    <Dropdown
                                        options={generations.filter(
                                            (gen) =>
                                                generations.indexOf(gen) !==
                                                currentGen
                                        )}
                                        onChange={selectGenerationChange}
                                        placeholder={
                                            "Generation " + (currentGen + 1)
                                        }
                                    />
                                </div>
                                <div className='table-responsive'>
                                    <table className='table'>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Radium(PokedexList);
