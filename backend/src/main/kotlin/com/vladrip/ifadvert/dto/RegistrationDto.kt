package com.vladrip.ifadvert.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty

data class RegistrationDto(
    @Email(message = "Email is invalid")
    @NotEmpty(message = "Email is required")
    val email: String,
    @NotEmpty(message = "Password is required")
    val password: String,
    @NotEmpty(message = "Password confirmation is required")
    val passwordConfirm: String,
    @NotEmpty(message = "Firstname is required")
    val firstname: String,
    @NotEmpty(message = "Surname is required")
    val lastname: String,
    @NotEmpty(message = "Phone number is required")
    val phone: String,
)
