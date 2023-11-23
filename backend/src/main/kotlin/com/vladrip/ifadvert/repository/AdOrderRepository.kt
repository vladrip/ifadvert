package com.vladrip.ifadvert.repository

import com.vladrip.ifadvert.entity.AdOrder
import org.springframework.data.jpa.repository.JpaRepository

interface AdOrderRepository : JpaRepository<AdOrder, Long> {
    fun findByUsersEmail(email: String): List<AdOrder>
}