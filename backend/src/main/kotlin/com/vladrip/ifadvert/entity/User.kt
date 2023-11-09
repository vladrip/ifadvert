package com.vladrip.ifadvert.entity

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*

@Table(name = "users")
@Entity
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long,
    @Column(unique = true)
    var email: String,
    var phoneNumber: String?,
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var password: String,
    var firstName: String,
    var lastName: String,
    @Enumerated(EnumType.STRING)
    var role: Role = Role.CUSTOMER,
) {
    @ManyToMany(mappedBy = "users")
    var adOrders: List<AdOrder> = listOf()

    enum class Role {
        CUSTOMER, AGENT, DESIGNER, WORKER
    }
}