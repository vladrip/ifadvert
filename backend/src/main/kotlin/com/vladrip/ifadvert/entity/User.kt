package com.vladrip.ifadvert.entity

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*

@Table(name = "users")
@Entity
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null

    @Column(unique = true, nullable = false)
    val email: String? = null

    @Column(nullable = false)
    val phoneNumber: String? = null

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    val password: String? = null

    @Column(nullable = false)
    val firstName: String? = null

    @Column(nullable = false)
    val lastName: String? = null

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val role = Role.CUSTOMER

    @ManyToMany(mappedBy = "users")
    val adOrders: List<AdOrder>? = null

    enum class Role {
        CUSTOMER, AGENT, DESIGNER, WORKER
    }
}