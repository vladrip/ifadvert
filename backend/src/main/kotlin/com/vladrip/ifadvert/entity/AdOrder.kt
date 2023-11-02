package com.vladrip.ifadvert.entity

import com.fasterxml.jackson.annotation.JsonTypeInfo
import io.hypersistence.utils.hibernate.type.json.JsonType
import jakarta.persistence.*
import org.hibernate.annotations.Type
import java.time.LocalDateTime

@Entity
class AdOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null

    val name: String = ""

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val type = AdType.BILLBOARD

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status = Status.CREATED

    @Column(nullable = false)
    val onlyDesign = false

    val costCents: Int? = null

    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    val placements: List<Placement> = ArrayList()

    @Type(JsonType::class)
    @Column(columnDefinition = "json")
    val designs: List<String> = ArrayList()

    @ManyToMany
    @JoinTable(
        name = "ad_order_user",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "ad_order_id")]
    )
    val users: List<User>? = null

    @ManyToMany
    @JoinTable(
        name = "ad_order_contract",
        joinColumns = [JoinColumn(name = "contract_id")],
        inverseJoinColumns = [JoinColumn(name = "ad_order_id")]
    )
    val contracts: List<Contract>? = null

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    val warehouse: Warehouse? = null

    enum class AdType {
        BILLBOARD,
        BROADCAST,
        TRANSPORT,
    }

    enum class Status {
        CREATED,
        UNDER_REVIEW,
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
            val billboardId: Long,
            val latitude: Float,
            val longitude: Float,
            val direction: Direction,
            val picture: String,
            override val description: String = "",
        ) : Placement() {
            enum class Direction {
                NORTH,
                EAST,
                SOUTH,
                WEST
            }
        }

        data class VehiclePlacement(
            val vehicleId: String,
            val type: VehicleType,
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
            val nextBroadcast: LocalDateTime,
            val durationSec: Int,
            override val description: String = "",
        ) : Placement()
    }
}