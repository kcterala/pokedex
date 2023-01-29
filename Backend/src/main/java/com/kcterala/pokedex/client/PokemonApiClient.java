package com.kcterala.pokedex.client;


import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
@Component
public class PokemonApiClient {

    private final String BASE_URL = "https://pokeapi.co/api/v2/";
    private RestTemplate restTemplate;
    public PokemonApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public JSONObject getPokemonByName(String name){
        String json = restTemplate.getForObject(BASE_URL+"pokemon/"+name,String.class);
        return new JSONObject(json);
    }

    public JSONObject getAllPokemons(Integer offset) {
        String json = restTemplate.getForObject(BASE_URL+"pokemon/?offset="+offset+"&limit=20", String.class);
        return new JSONObject(json);
    }

    public JSONObject getPokemonsByType(String type) {
        String json = restTemplate.getForObject(BASE_URL+"type/"+type, String.class);
        return new JSONObject(json);
    }

    public JSONObject getPokemonByAbility(String ability) {
        String json = restTemplate.getForObject(BASE_URL+"ability/"+ability, String.class);
        return new JSONObject(json);
    }
}
