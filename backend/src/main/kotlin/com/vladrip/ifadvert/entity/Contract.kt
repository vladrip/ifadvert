package com.vladrip.ifadvert.entity

import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type

@Entity
class Contract(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long,
    var partyName: String,
) {
    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    var documents: MutableList<String> = mutableListOf()

    @ManyToMany(mappedBy = "contracts")
    var adOrders: MutableList<AdOrder> = mutableListOf()
}