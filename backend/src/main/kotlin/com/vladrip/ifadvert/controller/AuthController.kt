package com.vladrip.ifadvert.controller

import com.vladrip.ifadvert.dto.CredentialsDto
import com.vladrip.ifadvert.dto.LoginResponse
import com.vladrip.ifadvert.dto.RegistrationDto
import com.vladrip.ifadvert.dto.TokenDto
import com.vladrip.ifadvert.service.AuthService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/auth")
class AuthController(
    val authService: AuthService,
    @Value("\${jwt.refresh.cookies.http-only}")
    val cookieHttpOnly: Boolean = false,
    @Value("\${jwt.refresh.cookies.secured}")
    val cookieSecured: Boolean = false,
) {

    @PostMapping("/register")
    fun register(@Valid @RequestBody registrationDto: RegistrationDto) {
        authService.register(registrationDto)
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody credentialsDto: CredentialsDto, response: HttpServletResponse): LoginResponse {
        val loginResponse: LoginResponse = authService.login(credentialsDto)
        addRefreshTokenCookie(response, loginResponse.refreshToken)
        return loginResponse
    }

    @PostMapping("/refresh-token")
    fun refreshToken(
        @CookieValue(REFRESH_TOKEN_KEY) refreshToken: String,
        response: HttpServletResponse
    ): TokenDto {
        val tokensDto = authService.refreshToken(refreshToken)
        addRefreshTokenCookie(response, tokensDto.refreshToken)
        return TokenDto(tokensDto.accessToken)
    }

    private fun addRefreshTokenCookie(response: HttpServletResponse, refreshToken: String) {
        val cookie = Cookie(REFRESH_TOKEN_KEY, refreshToken)
        cookie.secure = cookieSecured
        cookie.isHttpOnly = cookieHttpOnly
        response.addCookie(cookie)
    }

    companion object {
        const val REFRESH_TOKEN_KEY = "REFRESH_TOKEN"
    }
}
