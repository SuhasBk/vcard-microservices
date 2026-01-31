package com.hyperbyte.virtualcard.service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.thymeleaf.context.Context;
import org.thymeleaf.TemplateEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

    record ProcessedCard(String imageUrl, String text) {}

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    public VirtualCardService(TemplateEngine templateEngine, JavaMailSender eMailSender) {
        this.templateEngine = templateEngine;
        this.emailSender = eMailSender;
    }

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

    public void shareVirtualCard(UUID id) {
        new Thread(()-> {
            VirtualCardWrapper cardData = getVirtualCard(id);
            List<ProcessedCard> cleanCards = cardData.getCards().stream()
                    .map(c -> {
                        String rawUrl = c.getGif().getUrl();
                        String cleanUrl = rawUrl.replace("giphy.com/embed", "media.giphy.com/media") + "/giphy.gif";
                        return new ProcessedCard(cleanUrl, c.getText() != null ? c.getText().toString() : "");
                    })
                    .collect(Collectors.toList());

            // 2. PREPARE CONTEXT: Pass data to Thymeleaf
            Context context = new Context();
            context.setVariable("title", cardData.getTitle());
            context.setVariable("fromName", cardData.getFromName());
            context.setVariable("cards", cleanCards); // Pass the cleaned list

            String htmlBody = templateEngine.process("email-template", context);

            // 4. SEND EMAIL
            try {
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setTo(cardData.getToEmail());
                helper.setSubject(cardData.getTitle());
                helper.setText(htmlBody, true); // 'true' means this is HTML, not plain text

                emailSender.send(message);
            } catch (MessagingException e) {
                throw new RuntimeException("Failed to send email", e);
            }
        }).start();
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

    public boolean saveVirtualCard(VirtualCardWrapper cardWrapper) {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), cardWrapper);
        return vCardRepository.save(cardWrapper).getCardId() == cardWrapper.getCardId();
    }

    public List<VirtualCardWrapper> getAllCards() {
        log.info("Entering {} with payload: {}", Thread.currentThread().getStackTrace()[1].getMethodName(), null);
        List<VirtualCardWrapper> cardWrappers = vCardRepository.findAll();
        log.info("Leaving with response size: {}", cardWrappers.size());
        return cardWrappers;
    }
}
