package com.vladrip.ifadvert.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

data class CredentialsDto(
    @Email(message = "Email неккоректний")
    @NotEmpty(message = "Email повинен бути вказаний")
    val email: String,
    @NotEmpty(message = "Пароль повинен бути вказаний")
    val password: String,
)