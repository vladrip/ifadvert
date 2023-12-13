package com.vladrip.ifadvert.dto

import com.vladrip.ifadvert.entity.User

data class AuthUserDto(
    val id: Long,
    val email: String,
    val firstname: String,
    val lastname: String,
    val role: User.Role,
)