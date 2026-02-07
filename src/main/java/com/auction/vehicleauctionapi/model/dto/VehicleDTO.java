package com.auction.vehicleauctionapi.model.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor @AllArgsConstructor
@Builder
@Data
public class VehicleDTO {
    @NotBlank(message = "VIN is required")
    private String vin;
    
    @Min(value = 1886, message = "Year must be greater than 1886")
    private Integer year;

    private String make;
    private String model;
    private String trim;
    private String body;
    private String transmission;
    private String state;
    
    @Min(value = 0, message = "Condition cannot be negative")
    private Integer condition;   
    @Min(value = 0, message = "Odometer cannot be negative")
    private Integer odometer;    

    private String color;
    private String interior;
}
