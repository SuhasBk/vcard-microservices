package com.hyperbyte.virtualcard.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hyperbyte.virtualcard.model.VirtualCardWrapper;

public interface VirtualCardRepository extends MongoRepository<VirtualCardWrapper, UUID> {
    
}
