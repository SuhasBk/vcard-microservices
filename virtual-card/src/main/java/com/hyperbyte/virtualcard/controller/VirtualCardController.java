package com.hyperbyte.virtualcard.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    
    @PostMapping("/createCard")
    public UUID createNewVirtualCard(@RequestBody VirtualCardWrapper cardWrapper) {
        return vCardService.createNewVirtualCard(cardWrapper);
    }

    @GetMapping("/deleteCard")
    public boolean deleteVirtualCard(@RequestParam("cardId") UUID id) {
        return vCardService.deleteVirtualCard(id);
    }

    @PostMapping("/getCard")
    public VirtualCardWrapper getVirtualCard(@RequestBody VirtualCardWrapper cardWrapper) {
        return vCardService.getVirtualCard(cardWrapper.getCardId());
    }

    @DeleteMapping("/deleteCard")
    public void deleteVirtualCard(@RequestBody VirtualCardWrapper cardWrapper) {
        vCardService.deleteVirtualCard(cardWrapper.getCardId());
    }

    @PostMapping("/getMyCards")
    public List<VirtualCardWrapper> getMyCards(@RequestBody User user) {
        return vCardService.getMyCards(user);
    }

    @PutMapping("/saveCard")
    public boolean saveVirtualCard(@RequestBody VirtualCardWrapper cardWrapper) {
        return vCardService.saveVirtualCard(cardWrapper);
    }

    @GetMapping("/getAllCards")
    public List<VirtualCardWrapper> getAllCards() {
        return vCardService.getAllCards();
    }

}
