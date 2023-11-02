package com.vladrip.ifadvert.mapper

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.entity.AdOrder

@org.mapstruct.Mapper(componentModel = "spring")
interface Mapper {
    fun toAdOrderDto(adOrder: AdOrder): AdOrderDto
}