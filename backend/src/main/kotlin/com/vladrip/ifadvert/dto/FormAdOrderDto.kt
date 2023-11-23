package com.vladrip.ifadvert.dto

import com.vladrip.ifadvert.entity.AdOrder

data class FormAdOrderDto(
    val name: String,
    val type: AdOrder.AdType,
    val onlyDesign: Boolean,
    val budgetCents: Int,
)