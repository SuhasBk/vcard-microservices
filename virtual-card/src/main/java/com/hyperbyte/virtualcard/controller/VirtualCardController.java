package com.hyperbyte.virtualcard.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hyperbyte.virtualcard.model.User;
import com.hyperbyte.virtualcard.model.VirtualCardWrapper;
import com.hyperbyte.virtualcard.service.VirtualCardService;

@RestController
@RequestMapping("/vcard-service/api/v1")
public class VirtualCardController {

    @Autowired
    VirtualCardService vCardService;
    
    @PostMapping("/create")
    public UUID createNewVirtualCard(@RequestBody VirtualCardWrapper cardWrapper) {
        return vCardService.createNewVirtualCard(cardWrapper);
    }

    @GetMapping("/delete")
    public boolean deleteVirtualCard(@RequestParam UUID id) {
        return vCardService.deleteVirtualCard(id);
    }

    @GetMapping("/get")
    public VirtualCardWrapper getVirtualCard(@RequestParam UUID id) {
        return vCardService.getVirtualCard(id);
    }

    @DeleteMapping("/delete")
    public void deleteVirtualCard(@RequestBody VirtualCardWrapper cardWrapper) {
        vCardService.deleteVirtualCard(cardWrapper.getCardId());
    }

    @PostMapping("/getMyCards")
    public List<VirtualCardWrapper> getMyCards(@RequestBody User user) {
        return vCardService.getMyCards(user);
    }

    @GetMapping("/getAll")
    public List<VirtualCardWrapper> getAllCards() {
        return vCardService.getAllCards();
    }

}
