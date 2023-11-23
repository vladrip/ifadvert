package com.vladrip.ifadvert.dto

data class LoginResponse(
    val accessToken: String,
    val refreshToken: String,
    val user: AuthUserDto,
)