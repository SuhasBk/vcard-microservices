package com.hyperbyte.userservice.util;

import java.util.Date;
import java.util.UUID;

import javax.naming.AuthenticationException;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtil {

    private static String jwtSecret = "secretvcardsecret";

    private static long tokenValidity = 360000L * 360000L;

    public static Claims getClaims(final String token) {
        try {
            Claims body = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
            return body;
        } catch (Exception e) {
            System.out.println(e.getMessage() + " => " + e);
        }
        return null;
    }

    public static String generateToken(UUID id) {
        Claims claims = Jwts.claims().setSubject(id.toString());
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + tokenValidity;
        Date exp = new Date(expMillis);
        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(new Date(nowMillis))
            .setExpiration(exp)
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    public static void validateToken(final String token) throws Exception {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
        } catch (SignatureException ex) {
            throw new AuthenticationException("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            throw new AuthenticationException("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            throw new AuthenticationException("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            throw new AuthenticationException("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            throw new AuthenticationException("JWT claims string is empty.");
        }
    }

}
