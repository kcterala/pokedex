package com.kcterala.pokedex.controller;

import com.kcterala.pokedex.services.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pokemons")
public class PokemonController {
    @Autowired
    private PokemonService pokemonService;
    @GetMapping
    public String getPokemonByName(@RequestParam("name") String name){

        return pokemonService.getPokemonByName(name);

    }
}
