import { Button } from "react-bootstrap";
import React from "react";
import "./HomePage.css";
import PokemonBoard from "../components/PokemonBoard";

const HomePage = () => {
  return (
    <>
      <div id="up" className="d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="input-group-text"
          placeholder="Search Pokemon"
        />
        <Button variant="primary">Hello</Button>
      </div>
      <div id="down">
        <PokemonBoard />
      </div>
    </>
  );
};

export default HomePage;
