package com.vladrip.ifadvert.dto

import com.vladrip.ifadvert.entity.User

data class AuthUserDto(
    val id: Long,
    val email: String,
    val firstName: String,
    val lastName: String,
    val role: User.Role,
)