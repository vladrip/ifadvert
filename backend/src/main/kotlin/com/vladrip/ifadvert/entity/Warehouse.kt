package com.vladrip.ifadvert.entity

import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type

@Entity
class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null

    val latitude: Float? = null
    val longitude: Float? = null

    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    val inventory: Map<String, Int> = HashMap()

    @OneToMany(mappedBy = "warehouse")
    val adOrders: List<AdOrder>? = null
}