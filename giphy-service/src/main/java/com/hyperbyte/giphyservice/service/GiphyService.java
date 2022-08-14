package com.hyperbyte.giphyservice.service;

import java.net.URL;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyperbyte.giphyservice.model.GIF;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GiphyService {

    @Autowired
    ObjectMapper mapper;

    @Value("${giphy.api-key}")
    String API_KEY;

    public List<GIF> search(String query) {
        try {
            query = URLEncoder.encode(query, "UTF-8");
            URL url = new URL(String.format("https://api.giphy.com/v1/gifs/search?q=%s&limit=20&api_key=%s", query, API_KEY));

            log.info("GIPHY API URL: {}", url.toString());
            
            JsonNode jsonData = mapper.readTree(url.openStream());
            GIF[] results = mapper.readValue(jsonData.get("data").toString(), GIF[].class);
            return Arrays.asList(results)
                .stream()
                .limit(10)
                .collect(Collectors.toList());
        } catch(Exception e) {
            log.error(e.toString());
            return null;
        }
    }
    
}
