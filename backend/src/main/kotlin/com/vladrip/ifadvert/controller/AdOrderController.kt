package com.vladrip.ifadvert.controller

import com.vladrip.ifadvert.dto.FormAdOrderDto
import com.vladrip.ifadvert.service.AdOrderService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/ad-orders")
class AdOrderController(
    private val adOrderService: AdOrderService
) {

    //TODO: don't fetch placements and designs
    @GetMapping
    fun getAll(authentication: Authentication) = adOrderService.getAll(authentication.name)

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long) = adOrderService.get(id)

    //TODO: allow agent to create ad order and then assign customer to it
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping
    fun create(@RequestBody formAdOrderDto: FormAdOrderDto, authentication: Authentication) =
        adOrderService.create(formAdOrderDto, authentication.name)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody formAdOrderDto: FormAdOrderDto, authentication: Authentication) =
        adOrderService.update(id, formAdOrderDto, authentication)
}