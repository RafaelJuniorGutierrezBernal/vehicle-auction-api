package com.auction.vehicleauctionapi.model.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "sales",
        indexes = {
                @Index(name = "idx_sales_seller", columnList = "seller"),
                @Index(name = "idx_sales_saledate", columnList = "saleDate"),
                @Index(name = "idx_sales_vehicle_vin", columnList = "vehicle_vin")
        })

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relación: muchas ventas pueden apuntar a un mismo vehículo (por VIN)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vehicle_vin", referencedColumnName = "vin", nullable = false)
    private VehicleEntity vehicle;

    @Column(nullable = false)
    private String seller;

    
    @Column(precision = 12, scale = 2)
    private BigDecimal mmr;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal sellingPrice;

    
    @Column(nullable = false)
    private LocalDate saleDate;

}
    