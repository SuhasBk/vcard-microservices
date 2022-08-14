package com.hyperbyte.virtualcard.model;

import java.util.LinkedList;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("virtualcards")
public class VirtualCardWrapper {
    
    @Id
    UUID cardId;
    String createdBy;
    String title;
    String category;
    String fromName;
    String fromEmail;
    String toName;
    String toEmail;
    LinkedList<Card> cards;
}
