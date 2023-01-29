package com.kcterala.pokedex.controller;

import com.kcterala.pokedex.entity.Pokemon;
import com.kcterala.pokedex.model.PokemonResponse;
import com.kcterala.pokedex.services.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pokemons")
@CrossOrigin
public class PokemonController {
    @Autowired
    private PokemonService pokemonService;
    @GetMapping("/{name}")
    public ResponseEntity<List<Pokemon>> getPokemonByName(@PathVariable String name){
        Pokemon pokemon = pokemonService.getPokemonByName(name);
        List<Pokemon> pokemonList = new ArrayList<>();
        pokemonList.add(pokemon);
        return ResponseEntity.ok(pokemonList);
    }


    @GetMapping
    public ResponseEntity<List<Pokemon>> getPokemons(@RequestParam("offset") Integer offset){
        List<Pokemon> pokemonList = pokemonService.getAllPokemons(offset);
        return ResponseEntity.ok(pokemonList);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Pokemon>> getPokemonsByType(@PathVariable String type,@RequestParam Integer offset){
        List<Pokemon> pokemonList = pokemonService.getPokemonsByType(type, offset);
        return ResponseEntity.ok(pokemonList);
    }

    @GetMapping("/ability/{ability}")
    public ResponseEntity<List<Pokemon>> getPokemonByAbility(@PathVariable String ability){
        List<Pokemon> pokemonList = pokemonService.getPokemonsByAbility(ability);
        return ResponseEntity.ok(pokemonList);
    }
}
