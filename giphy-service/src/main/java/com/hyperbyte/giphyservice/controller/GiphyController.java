package com.hyperbyte.giphyservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hyperbyte.giphyservice.model.GIF;
import com.hyperbyte.giphyservice.service.GiphyService;

@RestController
@RequestMapping("/giphy-service/api/v1")
public class GiphyController {

    @Autowired
    GiphyService giphyService;
    
    @PostMapping("/search")
    public List<GIF> search(@RequestBody String query) {
        return giphyService.search(query);
    }
}
