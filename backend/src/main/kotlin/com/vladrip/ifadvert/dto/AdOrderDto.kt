package com.vladrip.ifadvert.dto

import com.vladrip.ifadvert.entity.AdOrder

data class AdOrderDto (
    val id: Long?,
    val name: String,
    val type: AdOrder.AdType,
    val status: AdOrder.Status,
    val onlyDesign: Boolean,
    val costCents: Int,
    val designs: List<String>,
    val placements: List<AdOrder.Placement>,
)