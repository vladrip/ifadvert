package com.vladrip.ifadvert.service

import com.vladrip.ifadvert.dto.*
import com.vladrip.ifadvert.mapper.Mapper
import com.vladrip.ifadvert.repository.UserRepository
import com.vladrip.ifadvert.security.DatabaseUserService
import jakarta.validation.ValidationException
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationServiceException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*


@Service
class AuthService(
    val databaseUserService: DatabaseUserService,
    val userService: UserService,
    val jwtTokenService: JwtTokenService,
    val authenticationManager: AuthenticationManager,
    val userRepository: UserRepository,
    val passwordEncoder: PasswordEncoder,
    val mapper: Mapper,
) {

    fun register(registrationDto: RegistrationDto) {
        if (registrationDto.password != registrationDto.passwordConfirm)
            throw ValidationException("Password and its confirmation do not match")

        val user = mapper.toUser(registrationDto, passwordEncoder.encode(registrationDto.password))
        userRepository.save(user)
    }

    fun login(credentialsDto: CredentialsDto): LoginResponse {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                credentialsDto.email,
                credentialsDto.password
            )
        )
        val userDetails: UserDetails = databaseUserService.loadUserByUsername(credentialsDto.email)

        val accessToken = jwtTokenService.generateAccessToken(userDetails)
        val refreshToken = jwtTokenService.generateRefreshToken(accessToken)
        val authUserDto: AuthUserDto = userService.getAuthUser(userDetails.username)
        return LoginResponse(accessToken, refreshToken, authUserDto)
    }

    fun refreshToken(refreshToken: String): TokensDto {
        val userDetails: UserDetails =
            databaseUserService.loadUserByUsername(jwtTokenService.getEmail(refreshToken))
        val refreshTokenExpiration = jwtTokenService.getRefreshExpirationDate(refreshToken)
        val accessToken = jwtTokenService.generateAccessToken(userDetails)

        if (refreshTokenExpiration.after(Date())) {
            val newRefreshToken = jwtTokenService.generateRefreshToken(accessToken, refreshTokenExpiration)
            return TokensDto(accessToken, newRefreshToken)
        } else {
            throw AuthenticationServiceException("Session expired")
        }
    }
}
