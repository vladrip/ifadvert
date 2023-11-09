package com.vladrip.ifadvert.repository

import com.vladrip.ifadvert.entity.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
}