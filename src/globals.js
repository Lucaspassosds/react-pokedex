const globals = {
    api: 'https://pokeapi.co/api/v2/pokemon',
    colors: {
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
    },
    types: [
        "Any",
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
    ],
    generationConfig:[
        //GEN 1
        {
            start: 1,
            end: 151,
        },
        // GEN 2
        {
            start: 152,
            end: 251,
        },
        //GEN 3
        {
            start: 252,
            end: 386,
        },
        //GEN 4
        {
            start: 387,
            end: 493,
        },
        //GEN 5
        {
            start: 494,
            end: 649,
        },
        //GEN 6
        {
            start: 650,
            end: 721,
        },
        //GEN 7
        {
            start: 722,
            end: 809,
        },
    ]
};

export default globals;