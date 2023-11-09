package com.vladrip.ifadvert.controller

import com.vladrip.ifadvert.service.AdOrderService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/ad-orders")
class AdOrderController (
    private val adOrderService: AdOrderService
) {

    @GetMapping //TODO: get id from jwt
    fun getAll() = adOrderService.getAll(1)

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long) = adOrderService.get(id)
}