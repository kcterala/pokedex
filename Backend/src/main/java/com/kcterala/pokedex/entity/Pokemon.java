package com.kcterala.pokedex.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class Pokemon {
    private Integer id;
    private String name;
    private List<String> type;
    private List<String> abilities;
    private Integer height;
    private Integer weight;

}
