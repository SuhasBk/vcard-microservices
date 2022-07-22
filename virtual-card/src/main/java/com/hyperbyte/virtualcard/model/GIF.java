package com.hyperbyte.virtualcard.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GIF {
    String title;
    List<String> tags;
    @JsonAlias("embed_url")
    String url;
}
