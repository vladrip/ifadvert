package com.vladrip.ifadvert.security

import com.vladrip.ifadvert.entity.User
import com.vladrip.ifadvert.repository.UserRepository
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class DatabaseUserService(val userRepository: UserRepository) : UserDetailsService {

    override fun loadUserByUsername(email: String): UserDetails {
        val user: User = userRepository.findByEmail(email)
            .orElseThrow { UsernameNotFoundException("User not found: $email") }
        return org.springframework.security.core.userdetails.User(
            user.email,
            user.password,
            !user.isDisabled,
            true,
            true,
            true, listOf(SimpleGrantedAuthority(user.role.name))
        )
    }
}
