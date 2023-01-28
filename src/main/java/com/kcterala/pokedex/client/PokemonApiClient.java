package com.kcterala.pokedex.client;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
@Component
public class PokemonApiClient {
    @Autowired
    private RestTemplate restTemplate;

    private String BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

    public JSONObject getPokemonByName(String name){
        String json = restTemplate.getForObject(BASE_URL+name,String.class);
        return new JSONObject(json);
    }
}
