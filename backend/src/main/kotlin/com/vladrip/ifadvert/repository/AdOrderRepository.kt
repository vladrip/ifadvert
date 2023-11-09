package com.vladrip.ifadvert.repository

import com.vladrip.ifadvert.entity.AdOrder
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface AdOrderRepository : JpaRepository<AdOrder, Long> {
    fun findByUsersId(id: Long): List<AdOrder>
}