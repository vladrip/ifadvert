package com.vladrip.ifadvert.controller

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.service.AdOrderService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/ad-orders")
class AdOrderController (
    private val adOrderService: AdOrderService
) {

    @GetMapping
    fun getAll(): List<AdOrderDto> {
        return adOrderService.getAll()
    }
}