package com.auction.vehicleauctionapi.service;


import java.util.List;

import com.auction.vehicleauctionapi.model.dto.VehicleDTO;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;

public interface VehicleService {
    VehicleEntity create(VehicleDTO dto);
    VehicleEntity getByVin(String vin);
    List<VehicleEntity> list();
}

