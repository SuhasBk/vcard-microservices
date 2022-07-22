package com.hyperbyte.apigateway.filter;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.GatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.hyperbyte.apigateway.model.User;

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
            final List<String> apiEndpoints = List.of("/register", "/login");

            Predicate<ServerHttpRequest> isApiSecured = r -> apiEndpoints
                .stream()
                .noneMatch(uri -> r.getURI().getPath().contains(uri));
            
            if(isApiSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("Auth Info Missing!");
                }

                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

                String[] parts = authHeader.split(" ");

                if (parts.length != 2 || !"Bearer".equals(parts[0])) {
                    throw new RuntimeException("Incorrect Auth Structure");
                }

                String token = parts[1];

                return builder.build()
                    .get()
                    .uri("lb://USER-SERVICE/users-service/auth/validateToken/" + token)
                    .retrieve()
                    .bodyToMono(User.class)
                    .map(res -> {
                        exchange.getRequest()
                                .mutate()
                                .header("X-auth-user-status", res.getUsername())
                                .build();
                        return exchange;
                    })
                    .flatMap(chain::filter);
            }

            return chain.filter(exchange);
        };
    }

    

}
