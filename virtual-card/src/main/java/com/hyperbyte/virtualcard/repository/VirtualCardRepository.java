package com.hyperbyte.virtualcard.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.hyperbyte.virtualcard.model.VirtualCardWrapper;

public interface VirtualCardRepository extends MongoRepository<VirtualCardWrapper, UUID> {
    Optional<List<VirtualCardWrapper>> findAllByCreatedBy(String username);
}
