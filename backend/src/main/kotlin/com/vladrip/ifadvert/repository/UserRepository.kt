package com.vladrip.ifadvert.repository

import com.vladrip.ifadvert.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, Long> {

    fun findByEmail(email: String): Optional<User>
}