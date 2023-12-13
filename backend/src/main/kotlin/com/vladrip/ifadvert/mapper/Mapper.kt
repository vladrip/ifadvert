package com.vladrip.ifadvert.mapper

import com.vladrip.ifadvert.dto.AdOrderDto
import com.vladrip.ifadvert.dto.AuthUserDto
import com.vladrip.ifadvert.dto.FormAdOrderDto
import com.vladrip.ifadvert.dto.RegistrationDto
import com.vladrip.ifadvert.entity.AdOrder
import com.vladrip.ifadvert.entity.User
import org.mapstruct.Mapping
import org.mapstruct.MappingTarget
import org.mapstruct.ReportingPolicy

@org.mapstruct.Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface Mapper {
    fun toAdOrderDto(adOrder: AdOrder): AdOrderDto

    fun toFormAdOrderDto(adOrder: AdOrder): FormAdOrderDto

    fun toAdOrder(formAdOrderDto: FormAdOrderDto): AdOrder

    fun toAuthUserDto(user: User): AuthUserDto

    fun mergeAdOrder(formAdOrderDto: FormAdOrderDto, @MappingTarget adOrder: AdOrder)

    @Mapping(source = "hashedPassword", target = "password")
    @Mapping(target = "role", expression = "java(com.vladrip.ifadvert.entity.User.Role.CLIENT)")
    fun toUser(registrationDto: RegistrationDto, hashedPassword: String): User
}