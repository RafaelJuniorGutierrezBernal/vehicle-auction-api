package com.auction.vehicleauctionapi.model.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;
@Data
public class SaleRespDTO {
    private Long id;
    private String seller;
    private BigDecimal mmr;  
    private BigDecimal sellingPrice;
    private LocalDate saleDate;
    private VehicleRespDTO vehicle;
}
