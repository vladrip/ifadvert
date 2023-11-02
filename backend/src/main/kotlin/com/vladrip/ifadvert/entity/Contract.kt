package com.vladrip.ifadvert.entity

import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type

@Entity
class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null
    val partyName: String? = null

    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    val documents: List<String>? = null

    @ManyToMany(mappedBy = "contracts")
    val adOrders: List<AdOrder>? = null
}