package com.hyperbyte.apigateway.filter;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class GatewayAuthFilter implements GatewayFilterFactory<GatewayAuthFilter.Config> {

    public static class Config {}

    private WebClient.Builder builder;

    public GatewayAuthFilter(WebClient.Builder builder) {
        this.builder = builder;
    }

    @Override
    public Class<Config> getConfigClass() {
        return Config.class;
    }

    @Override
    public GatewayFilter apply(Config config) {
        
        return (exchange, chain) -> {
            final List<String> apiEndpoints = List.of("/register", "/login", "/getUser");

            Predicate<ServerHttpRequest> isApiSecured = r -> apiEndpoints
                .stream()
                .noneMatch(uri -> r.getURI().getPath().contains(uri));
            
            if(isApiSecured.test(exchange.getRequest())) {
                String authHeader = Optional.ofNullable(exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION))
                                            .orElseThrow(() -> new RuntimeException("Failed to authorize request. Auth info missing.")).get(0);

                String userId = Optional.ofNullable(exchange.getRequest().getHeaders().get("USER_ID"))
                                        .orElseThrow(() -> new RuntimeException("Failed to authorize request. USER_ID header missing.")).get(0);

                String[] parts = authHeader.split(" ");

                if (parts.length != 2 || !"Bearer".equals(parts[0])) {
                    throw new RuntimeException("Incorrect Auth Structure");
                }

                String token = parts[1];

                return builder.build()
                    .get()
                    .uri("lb://USER-SERVICE/users-service/auth/validateToken/" + token)
                    .header("USER_ID", userId)
                    .retrieve()
                    .bodyToMono(String.class)
                    .map(username -> {
                        exchange.getRequest()
                                .mutate()
                                .header("X-auth-user-status", username)
                                .build();
                        return exchange;
                    })
                    .flatMap(chain::filter);
            }

            return chain.filter(exchange);
        };
    }

    

}
