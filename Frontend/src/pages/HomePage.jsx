import { Button } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import PokemonBoard from "../components/PokemonBoard";
import Select from "react-select";
import nameData from "../assets/NameData";
import abilityData from "../assets/AbilityData";
import typeData from "../assets/TypeData";
import TypeData from "../assets/TypeData";

const HomePage = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    label: "Search Pokemon",
    value: "",
  });
  const [ability, setAbility] = useState({
    label: "Search Pokemon",
    value: "",
  });
  const [type, setType] = useState({
    label: "Search Pokemon",
    value: "",
  });
  const [pokemonData, setPokemonData] = useState([]);
  const [url, setUrl] = useState("http://localhost:8080/api/v1/pokemons/");
  const [offset, setOffset] = useState(0);
  const [lastSearchType, setLastSearchType] = useState("");
  /*
    TODO:
    when next is clicked url is changed.

  */

  function seturlandoffset() {
    setUrl("http://localhost:8080/api/v1/pokemons/");
    setOffset(0);
  }
  //Handle Search Click
  function handleSearchClick() {
    setOffset(0);
    setLastSearchType(search.value);
    getData(search.value, ability.value, type.value);

    setSearch({
      label: "Search Pokemon",
      value: "",
    });
  }

  //Handle Ability Click
  function handleAbilityClick(e) {
    console.log("ability click");
    setOffset(0);
    setLastSearchType("ability/" + ability.value);
    console.log("abiliry url", url);
    getData(search.value, ability.value, type.value);
    setAbility({
      label: "Search Pokemon",
      value: "",
    });
  }

  /*
    -> There is no offset endpoint from pokemon api for type.
    -> It takes more time than usual to load.
  */
  //Handle Type Click
  function handleTypeClick(e) {
    // seturlandoffset();
    setOffset(0);
    setLastSearchType("type/" + type.value);

    setType({
      label: "Search Pokemon",
      value: "",
    });
  }
  useEffect(() => {
    getData(search.value, ability.value, type.value);
  }, [lastSearchType]);

  function addOffset() {
    setOffset((prev) => prev + 20);
  }

  function removeOffset() {
    if (offset > 0) {
      setOffset((prev) => prev - 20);
    }
  }

  function getData(s, a, t) {
    let getUrl = url + lastSearchType;
    // if (s) {
    //   getUrl += s;
    // } else if (a) {
    //   getUrl += "ability/" + a;
    // } else if (t) {
    //   getUrl += "type/" + t;
    // }
    getUrl += "?offset=" + offset;
    // setUrl(url);
    setLoading(true);
    console.log("Actual ", getUrl);

    fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      });
  }

  // const prevUrlValue = useRef(url);
  // console.log("use reffing ", prevUrlValue);

  // useEffect(() => {
  //   if (prevUrlValue.current !== url) {
  //     getData(search.value, ability.value, type.value);
  //   }
  //   prevUrlValue.current = url;
  //   console.log("new value of url", url);
  // }, [url]);

  function getPage() {
    console.log("Page ", url);
    let getUrl = url + "?offset=" + offset;
    console.log("off set Url ", getUrl);
    fetch(getUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
      });
  }
  useEffect(() => {
    getData(search.value, ability.value, type.value);
  }, [offset]);

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
          <div className="d-flex flex-column gap-1 mx-5">
            <label style={{ fontSize: "bold", color: "white" }}>
              Search Pokemon By Name
            </label>
            <Select
              options={nameData}
              onChange={setSearch}
              defaultInputValue={""}
              isSearchable
              placeholder="Enter name"
              value={search}
            />
            <Button variant="primary" onClick={(e) => handleSearchClick(e)}>
              Search
            </Button>
          </div>

          <div className="d-flex flex-column gap-1 mx-5">
            <label style={{ fontSize: "bold", color: "white" }}>
              Search Pokemon By Ability
            </label>
            <Select
              options={abilityData}
              onChange={setAbility}
              defaultInputValue={""}
              isSearchable
              placeholder="Enter ability"
              value={ability}
            />
            <Button variant="primary" onClick={(e) => handleAbilityClick(e)}>
              Search
            </Button>
          </div>

          <div className="d-flex flex-column gap-1 mx-5">
            <label style={{ fontSize: "bold", color: "white" }}>
              Search Pokemon By Type
            </label>
            <Select
              options={typeData}
              onChange={setType}
              defaultInputValue={""}
              isSearchable
              placeholder="Enter type"
              value={type}
            />
            <Button variant="primary" onClick={(e) => handleTypeClick(e)}>
              Search
            </Button>
          </div>
        </div>
      </div>

      <div id="down" className="mt-5">
        {loading ? (
          <div>
            <h1>Loading...</h1>
            <p>Don't worry next time it will be faster</p>
          </div>
        ) : (
          <PokemonBoard
            data={pokemonData}
            next={addOffset}
            prev={removeOffset}
            offset={offset}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
