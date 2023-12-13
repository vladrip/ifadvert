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
    var phone: String?,
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    var password: String,
    var firstname: String,
    var lastname: String,
    var isDisabled: Boolean = false,
    @Enumerated(EnumType.STRING)
    var role: Role = Role.CLIENT,
) {
    @ManyToMany(mappedBy = "users")
    var adOrders: MutableList<AdOrder> = mutableListOf()

    enum class Role {
        CLIENT,
        AGENT,
        DESIGNER,
        WORKER,
    }
}