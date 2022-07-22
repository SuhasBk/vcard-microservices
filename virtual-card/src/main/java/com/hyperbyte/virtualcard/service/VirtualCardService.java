package com.hyperbyte.virtualcard.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hyperbyte.virtualcard.model.VirtualCardWrapper;
import com.hyperbyte.virtualcard.repository.VirtualCardRepository;

@Service
public class VirtualCardService {
    
    @Autowired
    VirtualCardRepository vCardRepository;

    public UUID createNewVirtualCard(VirtualCardWrapper cardWrapper) {
        UUID uuid = UUID.randomUUID();
        cardWrapper.setCardId(uuid);
        vCardRepository.save(cardWrapper);
        return uuid;
    }

    public VirtualCardWrapper getVirtualCard(UUID id) {
        return vCardRepository.findById(id).orElse(null);
    }

    public boolean deleteVirtualCard(UUID id) {
        try {
            vCardRepository.deleteById(id);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    public List<VirtualCardWrapper> getAllCards() {
        return vCardRepository.findAll();
    }
}
