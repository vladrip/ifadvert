package com.vladrip.ifadvert.service

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.mapper.Mapper
import com.vladrip.ifadvert.repository.AdOrderRepository
import org.springframework.stereotype.Service

@Service
class AdOrderService (
    private val adOrderRepository: AdOrderRepository,
    private val mapper: Mapper,
) {

    fun getAll(): List<AdOrderDto> {
        return adOrderRepository.findAll().map(mapper::toAdOrderDto).toList()
    }
}