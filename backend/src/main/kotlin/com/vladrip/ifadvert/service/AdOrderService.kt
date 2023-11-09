package com.vladrip.ifadvert.service

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.entity.AdOrder
import com.vladrip.ifadvert.exception.ItemNotFoundException
import com.vladrip.ifadvert.mapper.Mapper
import com.vladrip.ifadvert.repository.AdOrderRepository
import org.springframework.stereotype.Service

@Service
class AdOrderService(
    private val adOrderRepository: AdOrderRepository,
    private val mapper: Mapper,
) {

    fun getAll(userId: Long): List<AdOrderDto> {
        return adOrderRepository.findByUsersId(userId).map(mapper::toAdOrderDto)
    }

    fun get(id: Long): AdOrderDto {
        return adOrderRepository.findById(id).map(mapper::toAdOrderDto)
            .orElseThrow { ItemNotFoundException(AdOrder::class.java, id) }
    }
}