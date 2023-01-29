package com.kcterala.pokedex.model;

import com.kcterala.pokedex.entity.Pokemon;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class PokemonResponse {
    private String next;
    private String prev;
    private List<Pokemon> list;
}
