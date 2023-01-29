import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

const PokemonBoard = (props) => {
  const pokemonData = props.data;
  const next = props.next;
  const prev = props.prev;
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#CBC3E3",
    bug: "FDDFDF",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#f6f6f6",
  };
  console.log("Hello ", pokemonData);
  return (
    <>
      <div
        className="d-grid gap-1 m-4 pl-3"
        style={{
          paddingLeft: "7px",
          gridTemplateColumns: "repeat(auto-fill, 18rem)",
        }}
      >
        {pokemonData &&
          pokemonData.map((pokemon) => (
            <Card
              key={pokemon.id}
              style={{
                height: "28rem",
                width: "15rem",
                padding: "0",
                marginBottom: "2rem",
                margintLeft: "2rem",
                backgroundColor: `${colors[pokemon.type.slice(0)]}`,
                boxShadow: "0 3px 15px rgba(100,100,100,0.5)",
              }}
              className="d-flex flex-column justify-content-around"
            >
              <Card.Body>
                <Image
                  style={{ height: "130px", width: "130px" }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  className="bg-gradient"
                />
                <Card.Title
                  style={{
                    font: "10px",
                    fontSize: "bold",
                  }}
                >
                  {pokemon.name}{" "}
                </Card.Title>

                <Card.Text>
                  <div className="pb-2">
                    <i>Height: </i>
                    {pokemon.height}
                  </div>
                  <div className="pb-2">
                    <i>Weight: </i>
                    {pokemon.weight}
                  </div>
                  <div className="pb-2">
                    <b>
                      <i>Type</i>
                    </b>
                  </div>
                  <div className="d-flex flex-column justify-content-center mb-1">
                    {pokemon &&
                      pokemon.type.map((t) => (
                        <div
                          style={{
                            // backgroundColor: "#fceaff",
                            borderRadius: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "80%",
                              backgroundColor: "#fceaff",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {t}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="pb-2">
                    <b>
                      <i>Abilities</i>
                    </b>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    {pokemon &&
                      pokemon.abilities.map((t) => (
                        <div
                          style={{
                            // backgroundColor: "#fceaff",
                            borderRadius: "2px",
                            paddingLeft: "2px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "80%",
                              backgroundColor: "#fceaff",
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {t}
                          </span>
                        </div>
                      ))}
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>

      {pokemonData.length > 19 && (
        <div className="d-flex justify-content-center gap-5">
          {props.offset > 0 && <Button onClick={() => prev()}>Prev</Button>}
          {props.offset < pokemonData.length && (
            <Button onClick={() => next()}>Next</Button>
          )}
        </div>
      )}
    </>
  );
};

export default PokemonBoard;
