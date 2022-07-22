package com.hyperbyte.virtualcard.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) arg0;
        HttpServletResponse response = (HttpServletResponse) arg1;
        String usernameHeader = request.getHeader("X-auth-user-status");
        if(usernameHeader == null || usernameHeader.isEmpty()) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
        arg2.doFilter(arg0, arg1);
    }    
    
}
