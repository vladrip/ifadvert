package com.vladrip.ifadvert.entity

import com.fasterxml.jackson.annotation.JsonTypeInfo
import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type
import java.time.LocalDateTime

@Entity
class AdOrder(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long,
    var name: String,
    @Enumerated(EnumType.STRING)
    var type: AdType = AdType.BILLBOARD,
    @Enumerated(EnumType.STRING)
    var status: Status = Status.NEW,
    var onlyDesign: Boolean = false,
    var costCents: Int? = null,
    var budgetCents: Int,
    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    var placements: MutableList<Placement> = mutableListOf(),
    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    var designs: MutableList<String> = mutableListOf(),
    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    var warehouse: Warehouse? = null,
    @ManyToMany
    @JoinTable(
        name = "ad_order_user",
        joinColumns = [JoinColumn(name = "ad_order_id")],
        inverseJoinColumns = [JoinColumn(name = "user_id")]
    )
    var users: MutableList<User> = mutableListOf(),
    @ManyToMany
    @JoinTable(
        name = "ad_order_contract",
        joinColumns = [JoinColumn(name = "ad_order_id")],
        inverseJoinColumns = [JoinColumn(name = "contract_id")]
    )
    var contracts: MutableList<Contract> = mutableListOf(),
) {
    constructor() : this(id = 0, name = "", budgetCents = 0)

    enum class AdType {
        BILLBOARD,
        BROADCAST,
        TRANSPORT,
    }

    enum class Status {
        NEW,
        PROCESSING,
        AWAITING_PAYMENT,
        DESIGNING,
        AWAITING_CONFIRMATION,
        COMPLETED,
        EXECUTING,
        IN_ACTION,
        DISCONTINUED,
        CANCELED,
    }

    @JsonTypeInfo(use = JsonTypeInfo.Id.DEDUCTION)
    sealed class Placement {
        abstract val description: String

        data class BillboardPlacement(
            val boardId: Long,
            val latitude: Float,
            val longitude: Float,
            val direction: Direction,
            val picture: String?,
            override val description: String = "",
        ) : Placement() {
            enum class Direction {
                NORTH,
                EAST,
                SOUTH,
                WEST
            }
        }

        data class TransportPlacement(
            val vehicleId: String,
            val type: VehicleType,
            val picture: String?,
            override val description: String = "",
        ) : Placement() {
            enum class VehicleType {
                BUS,
                TRUCK,
                METRO,
            }
        }

        data class BroadcastPlacement(
            val channel: String,
            val isRadio: Boolean,
            val nextBroadcast: LocalDateTime?,
            val durationSec: Int,
            override val description: String = "",
        ) : Placement()
    }
}