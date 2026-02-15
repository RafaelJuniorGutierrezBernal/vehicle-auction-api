package com.auction.vehicleauctionapi.model.dto.response;

import lombok.Data;

@Data
public class VehicleRespDTO {
    private String vin;
    private Integer year;
    private String make;
    private String model;
    private String trim;
    private String body;
    private String transmission;
    private String state;
    private Integer condition;   
    private Integer odometer;    
    private String color;
    private String interior;
}
