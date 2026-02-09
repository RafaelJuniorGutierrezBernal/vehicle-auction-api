package com.auction.vehicleauctionapi.model.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor @AllArgsConstructor
@Builder
@Data
public class SaleDTO {
    
    private Long id;
    @NotBlank(message = "Seller is Required")
    private String seller;

    @DecimalMin(value = "0.0", inclusive = true ,message = "MMR Cannot be negative")
    private BigDecimal mmr;
    @NotNull(message = "Selling Price is required" )
    @DecimalMin(value = "0.0",inclusive = true, message = "Selling Price Cannot be negative")
    private BigDecimal sellingPrice;
    @NotNull(message = "saleDate Is Required")
    private LocalDate saleDate;

    @NotBlank(message = "vehicleVin is required")
    private String vehicleVin;

}

