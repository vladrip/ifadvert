package com.vladrip.ifadvert.entity

import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type

@Entity
class Warehouse(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long,
    var latitude: Float,
    var longitude: Float,
    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    var inventory: Map<String, Int> = mapOf()
) {
    @OneToMany(mappedBy = "warehouse")
    var adOrders: MutableList<AdOrder> = mutableListOf()
}