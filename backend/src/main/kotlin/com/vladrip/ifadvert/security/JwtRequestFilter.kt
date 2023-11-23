package com.vladrip.ifadvert.security

import com.vladrip.ifadvert.service.JwtTokenService
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import java.util.stream.Collectors
import java.util.stream.Stream


@Component
class JwtRequestFilter(val jwtTokenService: JwtTokenService) : OncePerRequestFilter() {

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response)
            return
        }

        val jwtToken = authHeader.substring(7)
        val username: String? = jwtTokenService.getUsername(jwtToken)

        if (username == null) {
            filterChain.doFilter(request, response)
            return
        }

        val token = UsernamePasswordAuthenticationToken(
            username,
            null,
            Stream.of(jwtTokenService.getRole(jwtToken))
                .map { role -> SimpleGrantedAuthority("ROLE_" + role.name) }
                .collect(Collectors.toList())
        )
        SecurityContextHolder.getContext().authentication = token

        filterChain.doFilter(request, response)
    }
}
