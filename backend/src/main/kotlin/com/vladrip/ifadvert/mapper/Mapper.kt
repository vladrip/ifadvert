package com.vladrip.ifadvert.mapper

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.dto.AuthUserDto
import com.vladrip.ifadvert.dto.FormAdOrderDto
import com.vladrip.ifadvert.entity.AdOrder
import com.vladrip.ifadvert.entity.User
import org.mapstruct.MappingTarget

@org.mapstruct.Mapper(componentModel = "spring")
interface Mapper {
    fun toAdOrderDto(adOrder: AdOrder): AdOrderDto

    fun toFormAdOrderDto(adOrder: AdOrder): FormAdOrderDto

    fun toAdOrder(formAdOrderDto: FormAdOrderDto): AdOrder

    fun toAuthUserDto(user: User): AuthUserDto

    fun mergeAdOrder(formAdOrderDto: FormAdOrderDto, @MappingTarget adOrder: AdOrder)
}