import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";

const PokemonBoard = () => {
  const [pokemonData, setPokemonData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/pokemons")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPokemonData(data);
      });
  }, []);

  return (
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
              height: "18rem",
              width: "14rem",
              marginBottom: "2rem",
              margintLeft: "2rem",
              boxShadow: "2px",
            }}
            className="d-flex flex-column justify-content-around shadow"
          >
            <Card.Body>
              <Card.Title style={{ font: "10px", fontSize: "bold" }}>
                {pokemon.name}{" "}
              </Card.Title>
              <Image
                style={{ height: "100px", width: "100px" }}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              />
              <div className="d-flex justify-content-center">{pokemon.id}</div>
              <Card.Text>
                <div className="d-flex justify-content-around gap">
                  {pokemon &&
                    pokemon.type.map((t) => (
                      <div
                        style={{
                          backgroundColor: "#fceaff",
                          borderRadius: "2px",
                          paddingLeft: "2px",
                        }}
                      >
                        {t}
                      </div>
                    ))}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default PokemonBoard;
