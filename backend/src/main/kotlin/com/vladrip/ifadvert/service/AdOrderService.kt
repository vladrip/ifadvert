package com.vladrip.ifadvert.service

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.dto.FormAdOrderDto
import com.vladrip.ifadvert.entity.AdOrder
import com.vladrip.ifadvert.entity.User
import com.vladrip.ifadvert.exception.ItemNotFoundException
import com.vladrip.ifadvert.mapper.Mapper
import com.vladrip.ifadvert.repository.AdOrderRepository
import com.vladrip.ifadvert.repository.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service

@Service
class AdOrderService(
    private val adOrderRepository: AdOrderRepository,
    private val userRepository: UserRepository,
    private val mapper: Mapper,
) {

    fun getAll(userEmail: String): List<AdOrderDto> {
        return adOrderRepository.findByUsersEmail(userEmail).map(mapper::toAdOrderDto)
    }

    fun get(id: Long): AdOrderDto {
        return adOrderRepository.findById(id).map(mapper::toAdOrderDto)
            .orElseThrow { ItemNotFoundException(AdOrder::class.java, id) }
    }

    fun create(formAdOrderDto: FormAdOrderDto, userEmail: String) {
        val adOrder = mapper.toAdOrder(formAdOrderDto)
        val user = userRepository.findByEmail(userEmail)
            .orElseThrow { ItemNotFoundException(User::class.java, "email", userEmail) }
        adOrder.users.add(user)
        adOrderRepository.save(adOrder)
    }

    fun update(id: Long, formAdOrderDto: FormAdOrderDto, authentication: Authentication): FormAdOrderDto {
        val adOrder = adOrderRepository.findById(id)
            .orElseThrow { ItemNotFoundException(AdOrder::class.java, id) }
        mapper.mergeAdOrder(formAdOrderDto, adOrder)
        adOrderRepository.save(adOrder)
        return mapper.toFormAdOrderDto(adOrder)
    }
}