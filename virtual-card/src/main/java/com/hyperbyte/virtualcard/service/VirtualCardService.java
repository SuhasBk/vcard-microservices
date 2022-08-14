package com.hyperbyte.virtualcard.service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hyperbyte.virtualcard.model.User;
import com.hyperbyte.virtualcard.model.VirtualCardWrapper;
import com.hyperbyte.virtualcard.repository.VirtualCardRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class VirtualCardService {
    
    @Autowired
    VirtualCardRepository vCardRepository;

    public UUID createNewVirtualCard(VirtualCardWrapper cardWrapper) {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), cardWrapper);
        UUID uuid = UUID.randomUUID();
        cardWrapper.setCardId(uuid);
        cardWrapper = vCardRepository.save(cardWrapper);
        log.info("Leaving with response: {}", cardWrapper);
        return uuid;
    }

    public VirtualCardWrapper getVirtualCard(UUID id) {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), id);
        VirtualCardWrapper cardWrapper = vCardRepository.findById(id).orElse(null);
        log.info("Leaving with response: {}", cardWrapper);
        return cardWrapper;
    }

    public boolean deleteVirtualCard(UUID id) {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), id);
        try {
            vCardRepository.deleteById(id);
            return true;
        } catch(Exception e) {
            log.error("Failed to delete card: {}\n Reason: {}", id, e);
            return false;
        }
    }

    public List<VirtualCardWrapper> getMyCards(User user) {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), user);
        List<VirtualCardWrapper> cardWrappers = vCardRepository.findAllByCreatedBy(user.getUsername()).orElse(Collections.emptyList());
        log.info("Leaving with response size: {}", cardWrappers.size());
        return cardWrappers;
    }

    public List<VirtualCardWrapper> getAllCards() {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), null);
        List<VirtualCardWrapper> cardWrappers = vCardRepository.findAll();
        log.info("Leaving with response size: {}", cardWrappers.size());
        return cardWrappers;
    }
}
