import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "./HomePage.css";
import PokemonBoard from "../components/PokemonBoard";
import Select from "react-select";

const HomePage = () => {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");
  const [ability, setAbility] = useState("");
  const [type, setType] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [url, setUrl] = useState("http://localhost:8080/api/v1/pokemons/");
  const [offset, setOffset] = useState(0);
  /*
    TODO:
    when next is clicked url is changed.

  */
  //Handle Search Change.
  function handleSearchChange(e) {
    const val = e.target.value;
    console.log(val);
    if (val == "") {
      setSearch(val);
      getData(val, ability);
    }
    setSearch(val);
  }

  //Handle Ability Change
  function handleAbilityChange(e) {
    const val = e.target.value;
    if (!val) {
      setAbility(val);
      getData(search, val);
    }
    setAbility(val);
  }

  //Handle Type Change
  function handleTypeChange(e) {
    const val = e.target.value;
    if (!val) {
      setType(val);
      getData(search, ability, val);
    }
    setType(val);
  }

  //Handle Search Click
  function handleSearchClick(e) {
    setSearch(search);
    getData(search, ability, type);
  }

  //Handle Ability Click
  function handleAbilityClick(e) {
    setAbility(ability);
    getData(search, ability, type);
  }

  //Handle Type Click
  function handleTypeClick(e) {
    setType(type);
    getData(search, ability, type);
  }

  function addOffset() {
    setOffset((prev) => prev + 20);
  }

  function removeOffset() {
    if (offset > 0) {
      setOffset((prev) => prev - 20);
    }
  }

  function getData(s, a, t) {
    let getUrl = url;
    if (s) {
      getUrl += s;
    } else if (a) {
      getUrl += "ability/" + a;
    } else if (t) {
      getUrl += "type/" + t;
    }
    getUrl += "?offset=" + offset;
    console.log("Actual ", getUrl);

    fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
      });
  }
  useEffect(() => {
    getData();
  }, [offset]);

  const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];

  return (
    <>
      <div
        id="up"
        className="d-flex flex-column justify-content-around align-items-center mb-5"
      >
        <div style={{ color: "#fff", font: "200px" }} className="mt-5">
          <h1>Pokedex</h1>
        </div>
        <div className="d-flex flex-row gap-5 justify-content-between">
          <div className="d-flex flex-column mx-5">
            <label style={{ fontSize: "bold", color: "white" }}>
              Search Pokemon By Name
            </label>
            <input
              type="text"
              className="input-group-text"
              onChange={(e) => handleSearchChange(e)}
              placeholder="Search Pokemon"
              value={search}
            />
            <Select
              options={aquaticCreatures}
              onChange={(opt) => console.log(opt.value)}
            />
            <Button variant="primary" onClick={(e) => handleSearchClick(e)}>
              Search
            </Button>
          </div>

          <div className="d-flex flex-column mx-5">
            <label style={{ fontSize: "bold", color: "white" }}>
              Search Pokemon By Ability
            </label>
            <input
              type="text"
              className="input-group-text"
              onChange={(e) => handleAbilityChange(e)}
              placeholder="Search Pokemon"
              value={ability}
            />
            <Button variant="primary" onClick={(e) => handleAbilityClick(e)}>
              Search
            </Button>
          </div>

          <div className="d-flex flex-column mx-5">
            <label style={{ fontSize: "bold", color: "white" }}>
              Search Pokemon By Type
            </label>
            <input
              type="text"
              className="input-group-text"
              onChange={(e) => handleTypeChange(e)}
              placeholder="Search Pokemon"
              value={type}
            />
            <Button variant="primary" onClick={(e) => handleTypeClick(e)}>
              Search
            </Button>
          </div>
        </div>
      </div>

      <div id="down" className="mt-5">
        <PokemonBoard data={pokemonData} next={addOffset} prev={removeOffset} />
      </div>
    </>
  );
};

export default HomePage;
