package com.vladrip.ifadvert.service

import com.vladrip.ifadvert.dto.AuthUserDto
import com.vladrip.ifadvert.entity.User
import com.vladrip.ifadvert.exception.ItemNotFoundException
import com.vladrip.ifadvert.mapper.Mapper
import com.vladrip.ifadvert.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(val userRepository: UserRepository, val mapper: Mapper) {

    fun getAuthUser(email: String): AuthUserDto {
        return userRepository.findByEmail(email).map(mapper::toAuthUserDto)
            .orElseThrow { ItemNotFoundException(User::class.java, "email", email) }
    }
}