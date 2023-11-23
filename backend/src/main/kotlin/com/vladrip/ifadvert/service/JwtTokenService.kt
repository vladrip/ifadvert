package com.vladrip.ifadvert.service

import com.vladrip.ifadvert.entity.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.*


@Component
class JwtTokenService(
    @Value("\${jwt.access.secret}")
    private val accessSecret: String,
    @Value("\${jwt.refresh.secret}")
    private val refreshSecret: String,
    @Value("\${jwt.access.validity-time}")
    private val jwtAccessLifeTime: Duration,
    @Value("\${jwt.refresh.validity-time}")
    private val jwtRefreshLifeTime: Duration,
) {
    private val accessSecretKey = Keys.hmacShaKeyFor(accessSecret.toByteArray())
    private val refreshSecretKey = Keys.hmacShaKeyFor(refreshSecret.toByteArray())

    fun generateAccessToken(userDetails: UserDetails): String {
        val claims: MutableMap<String, Any> = HashMap()
        val role = userDetails.authorities.stream()
            .map { it.authority }
            .findFirst()
            .orElseThrow {
                AuthenticationServiceException(
                    "Couldn't find granted authority (role) for user " + userDetails.username
                )
            }
        claims["role"] = role
        val issuedDate = Date()
        val expiredDate = Date(issuedDate.time + jwtAccessLifeTime.toMillis())
        return Jwts.builder()
            .claims(claims)
            .subject(userDetails.username)
            .issuedAt(issuedDate)
            .expiration(expiredDate)
            .signWith(accessSecretKey)
            .compact()
    }

    @JvmOverloads
    fun generateRefreshToken(accessToken: String?, expiredDate: Date? = null): String {
        val issuedDate = Date()
        return Jwts.builder()
            .subject(getUsername(accessToken))
            .issuedAt(issuedDate)
            .expiration(
                Optional.ofNullable<Date>(expiredDate).orElse(Date(issuedDate.time + jwtRefreshLifeTime.toMillis()))
            )
            .id(UUID.randomUUID().toString())
            .signWith(refreshSecretKey)
            .compact()
    }

    fun getUsername(token: String?): String? {
        return getAllClaimsFromAccessToken(token).subject
    }

    fun getEmail(token: String): String {
        return getAllClaimsFromRefreshToken(token).subject
    }

    fun getRole(token: String?): User.Role {
        return User.Role.valueOf(getAllClaimsFromAccessToken(token).get("role", String::class.java))
    }

    fun getRefreshExpirationDate(token: String): Date {
        return getAllClaimsFromRefreshToken(token).expiration
    }

    private fun getAllClaimsFromAccessToken(token: String?): Claims {
        return Jwts.parser()
            .verifyWith(accessSecretKey)
            .build()
            .parseSignedClaims(token).payload
    }

    private fun getAllClaimsFromRefreshToken(token: String): Claims {
        return Jwts.parser()
            .verifyWith(refreshSecretKey)
            .build()
            .parseSignedClaims(token).payload
    }
}
