package com.kcterala.pokedex.services;

import com.kcterala.pokedex.client.PokemonApiClient;
import com.kcterala.pokedex.entity.Pokemon;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PokemonService {

    private PokemonApiClient pokemonApiClient;

    public PokemonService(PokemonApiClient pokemonApiClient) {
        this.pokemonApiClient = pokemonApiClient;
    }

    public Pokemon getPokemonByName(String name) {
        JSONObject object = pokemonApiClient.getPokemonByName(name);

        //Create Abilities List from JSON Object
        JSONArray abilities = (JSONArray) object.get("abilities");
        List<String> abilityList = new ArrayList<>();
        for(int i = 0; i < abilities.length(); i++){
            JSONObject ability = (JSONObject) abilities.get(i);
            JSONObject ab = (JSONObject) ability.get("ability");
            abilityList.add(ab.getString("name"));
        }

        //Create Type List from JSON Object
        JSONArray types = (JSONArray) object.get("types");
        List<String> typeList = new ArrayList<>();
        for(int i = 0; i < types.length(); i++){
            JSONObject type = (JSONObject) types.get(i);
            JSONObject ty = (JSONObject) type.get("type");
            typeList.add(ty.getString("name"));
        }

        Pokemon pokemon = Pokemon.builder()
                .id(object.getInt("id"))
                .name(object.getString("name"))
                .height(object.getInt("height"))
                .weight(object.getInt("weight"))
                .abilities(abilityList)
                .type(typeList)
                .build();

        return pokemon;

    }


    public List<Pokemon> getAllPokemons() {
        JSONObject object = pokemonApiClient.getAllPokemons();
        JSONArray pokemonList = (JSONArray) object.get("results");
        List<Pokemon> pokemons = new ArrayList<>();

        for(Object obj : pokemonList){
            JSONObject key = (JSONObject) obj;
            Pokemon pokemon = getPokemonByName(key.getString("name"));
            pokemons.add(pokemon);
        }
        return pokemons;
    }

    public List<Pokemon> getPokemonsByType(String type) {
        JSONObject object = pokemonApiClient.getPokemonsByType(type);
        List<Pokemon> pokemons = new ArrayList<>();
        JSONArray pokemonList = (JSONArray) object.get("pokemon");
        for(Object obj : pokemonList){
            JSONObject key = (JSONObject) obj;
            JSONObject pokemonObject = (JSONObject) key.get("pokemon");
            pokemons.add(getPokemonByName(pokemonObject.getString("name")));
        }

        return pokemons;
    }

    public List<Pokemon> getPokemonsByAbility(String ability) {
        JSONObject object = pokemonApiClient.getPokemonByAbility(ability);
        List<Pokemon> pokemons = new ArrayList<>();
        JSONArray pokemonList = (JSONArray) object.get("pokemon");
        for(Object obj : pokemonList){
            JSONObject key = (JSONObject) obj;
            JSONObject pokemonObject = (JSONObject) key.get("pokemon");
            pokemons.add(getPokemonByName(pokemonObject.getString("name")));
        }

        return pokemons;
    }
}
