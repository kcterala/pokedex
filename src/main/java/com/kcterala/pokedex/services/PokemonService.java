package com.kcterala.pokedex.services;

import com.kcterala.pokedex.client.PokemonApiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PokemonService {
    @Autowired
    private PokemonApiClient pokemonApiClient;
    public String getPokemonByName(String name) {
        return pokemonApiClient.getPokemonByName(name).getString("name");
    }
}
