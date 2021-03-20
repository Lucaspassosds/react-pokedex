import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleRight,
    faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";
import VanillaTilt from "vanilla-tilt";
import "../css/App.css";
import global from "../globals";
const { api, characteric_api, colors, colors_light } = global;

const Pokemon = (props) => {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});
    const [images, setImages] = useState([]);
    const id = props.match.params.id;

    let bg;
    if (pokemon?.types && pokemon.types[0]) {
        switch (pokemon.types[0]) {
            case "water":
                bg = require("../assets/images/water.jpg");
                break;
            case "fire":
                bg = require("../assets/images/fire.jpg");
                break;
            case "grass":
                bg = require("../assets/images/grass.png");
                break;
            case "poison":
                bg = require("../assets/images/poison.jpg");
                break;
            case "flying":
                bg = require("../assets/images/flying.jpg");
                break;
            case "dragon":
                bg = require("../assets/images/dragon.jpg");
                break;
            case "bug":
                bg = require("../assets/images/bug.jpg");
                break;
            case "fairy":
                bg = require("../assets/images/fairy.jpg");
                break;
            case "electric":
                bg = require("../assets/images/electric.jpg");
                break;
            case "rock":
                bg = require("../assets/images/rock.jpg");
                break;
            case "ground":
                bg = require("../assets/images/ground.jpg");
                break;
            case "steel":
                bg = require("../assets/images/steel.jpg");
                break;
            case "dark":
                bg = require("../assets/images/dark.jpg");
                break;
            case "ghost":
                bg = require("../assets/images/ghost.jpg");
                break;
            case "psychic":
                bg = require("../assets/images/psychic.jpg");
                break;
            case "fighting":
                bg = require("../assets/images/fighting.jpg");
                break;
            case "ice":
                bg = require("../assets/images/ice.jpg");
                break;
            default:
                bg = require("../assets/images/normal.jpg");
                break;
        }
    }

    useEffect(() => {
        async function getPokemon() {
            try {
                let route = `${api}/${id}`;
                const res = await axios.get(route);
                const { data } = res;
                route = `${characteric_api}/${id}`;
                let entryRes = null;
                try {
                    entryRes = await axios.get(route);
                } catch (error) {
                    console.error(error);
                }
                const charateristicData = entryRes?.data;
                const pokemon = {
                    id: data.id,
                    name: data.name,
                    types: [
                        res.data.types[0].type.name,
                        res.data.types[1]?.type.name,
                    ],
                    color: colors[res.data.types[0].type.name],
                    abilities: [
                        data.abilities[0].ability.name,
                        data.abilities[1]?.ability.name,
                    ],
                    description: charateristicData?.descriptions.find(
                        (value) => value.language.name === "en"
                    ).description,
                };
                setPokemon(pokemon);
                const { sprites } = data;
                const images = {
                    svg: sprites.other?.dream_world?.front_default,

                    official:
                        sprites["other"]["official-artwork"]["front_default"],

                    normal: sprites.front_default,

                    back: sprites.back_default,

                    shiny: sprites.front_shiny,

                    back_shiny: sprites.back_shiny,
                };
                setImages(images);
                setLoading(false);
            } catch (err) {
                console.error("FETCH POKEMON ERROR", err);
            }
        }
        getPokemon();
    }, []);

    const svgSource = images.svg
        ? images.svg
        : images.official
        ? images.official
        : images.normal;

    const options = {
        scale: 1.5,
        speed: 1000,
        max: 30,
    };

    return (
        <>
            <div className='bg-img' style={{ backgroundImage: `url(${bg.default})` }}>
                <div className='layer p-3' />
            </div>

            <div
                className='left'
                style={{
                    visibility: id > 1 ? "visible" : "hidden",
                }}
                data-tooltip='Previous Pokemon'
            >
                <FontAwesomeIcon
                    size='4x'
                    icon={faAngleDoubleLeft}
                    data-tooltip='teste'
                    onClick={() =>
                        (window.location.href = `/pokemon/${id - 1}`)
                    }
                />
            </div>
            <div
                className='right'
                style={{
                    visibility: id <= 809 ? "visible" : "hidden",
                }}
                data-tooltip='Next Pokemon'
            >
                <FontAwesomeIcon
                    size='4x'
                    icon={faAngleDoubleRight}
                    data-tooltip='teste'
                    onClick={() =>
                        (window.location.href = `/pokemon/${parseInt(id) + 1}`)
                    }
                />
            </div>
            <div className='container pokedex'>
                <div
                    style={{
                        maxHeight: "100vh",
                        backgroundColor:
                            colors_light[
                                pokemon.types
                                    ? pokemon.types[1]
                                        ? pokemon?.types[1]
                                        : pokemon?.types[0]
                                    : "#ffffff"
                            ],
                    }}
                    className='poke-container mb-5'
                >
                    {loading ? (
                        <div className='loader-container'>
                            <img
                                className='snorlax'
                                src={require("../assets/images/snorlax.gif").default}
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
                            <h3 className='poke-name'>{pokemon.name}</h3>
                            <div
                                className='poke-info'
                                style={{
                                    backgroundColor:
                                        colors_light[
                                            pokemon.types[1]
                                                ? pokemon.types[1]
                                                : pokemon.types[0]
                                        ],
                                }}
                            >
                                <div
                                    className='photo-info col-md-4'
                                    style={{
                                        backgroundColor:
                                            colors_light[
                                                pokemon.types[1]
                                                    ? pokemon.types[1]
                                                    : pokemon.types[0]
                                            ],
                                    }}
                                >
                                    <Tilt
                                        option={options}
                                        className='img-container'
                                    >
                                        <img
                                            src={svgSource}
                                            alt='Oops! Image couldn"t be loaded. Sorry! 😢'
                                            className='main-img'
                                        />
                                    </Tilt>
                                    <div className='front-back rounded'>
                                        <div className='poke-row'>
                                            <div className='poke-card col-md-6'>
                                                <h6>Default</h6>
                                            </div>
                                            <div className='poke-card col-md-6'>
                                                <h6>Shiny</h6>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className='poke-row'>
                                            <div className='poke-card col-md-6'>
                                                <div className='flip-card'>
                                                    <div className='flip-card-inner'>
                                                        <div className='flip-card-front'>
                                                            <img
                                                                className='poke-sprite'
                                                                src={
                                                                    images.normal
                                                                }
                                                                alt={
                                                                    pokemon.name +
                                                                    " NORMAL"
                                                                }
                                                            />
                                                        </div>
                                                        <div className='flip-card-back'>
                                                            <img
                                                                src={
                                                                    images.back
                                                                }
                                                                alt={
                                                                    pokemon.name +
                                                                    " back"
                                                                }
                                                                className='poke-sprite'
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='poke-card col-md-6'>
                                                <div className='flip-card'>
                                                    <div className='flip-card-inner'>
                                                        <div className='flip-card-front'>
                                                            <img
                                                                className='poke-sprite'
                                                                src={
                                                                    images.shiny
                                                                }
                                                                alt={
                                                                    pokemon.name +
                                                                    " SHINY"
                                                                }
                                                            />
                                                        </div>
                                                        <div className='flip-card-back'>
                                                            <img
                                                                className='poke-sprite'
                                                                src={
                                                                    images.back_shiny
                                                                }
                                                                alt={
                                                                    pokemon.name +
                                                                    " SHINY BACK"
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className='dex-info col-md-4'
                                    style={{
                                        backgroundColor: pokemon.types[1]
                                            ? colors_light[pokemon.types[0]]
                                            : "#EBEBEB",
                                    }}
                                >
                                    <img
                                        src={images.official}
                                        alt='Oops! Image couldn"t be loaded. Sorry! 😢'
                                    />
                                    <h6 className='description-text'>
                                        "
                                        {pokemon.description ||
                                            "Gotta catch 'em all!"}
                                        "
                                    </h6>
                                    <div className='types-container'>
                                        <h6>
                                            Type
                                            {pokemon.types[1] ? "s" : ""}
                                        </h6>
                                        <hr />
                                        <div>
                                            <span
                                                className='type-text'
                                                style={{
                                                    backgroundColor:
                                                        colors[
                                                            pokemon.types[0]
                                                        ],
                                                }}
                                            >
                                                {pokemon.types[0].toUpperCase()}
                                            </span>{" "}
                                            {pokemon.types[1] && (
                                                <span
                                                    className='type-text'
                                                    style={{
                                                        backgroundColor:
                                                            colors[
                                                                pokemon.types[1]
                                                            ],
                                                    }}
                                                >
                                                    {pokemon.types[1].toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='front-back'>
                                        <div className='poke-row justify-content-center'>
                                            <div className='poke-card col-md-6'>
                                                <h6>
                                                    Ability{" "}
                                                    {pokemon.abilities[1]
                                                        ? "1"
                                                        : ""}
                                                </h6>
                                            </div>
                                            {pokemon.abilities[1] ? (
                                                <div className='poke-card col-md-6'>
                                                    <h6>Ability 2</h6>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <hr style={{ margin: 0 }} />
                                        <div className='poke-row justify-content-center'>
                                            <div className='poke-card col-md-6'>
                                                <p>
                                                    <i>
                                                        {pokemon.abilities[0]}
                                                    </i>
                                                </p>
                                            </div>
                                            {pokemon.abilities[1] ? (
                                                <div className='poke-card col-md-6'>
                                                    <p>
                                                        <i>
                                                            {
                                                                pokemon
                                                                    .abilities[1]
                                                            }
                                                        </i>
                                                    </p>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
        VanillaTilt.init(tilt.current, options);
    }, [options]);

    return <div ref={tilt} {...rest} />;
}

export default Pokemon;
