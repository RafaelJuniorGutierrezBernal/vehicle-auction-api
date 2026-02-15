package com.auction.vehicleauctionapi.service;


import java.util.List;

import com.auction.vehicleauctionapi.model.dto.request.VehicleReqDTO;
import com.auction.vehicleauctionapi.model.dto.response.VehicleRespDTO;


public interface VehicleService {
    void deleteByVin(String vin);
    VehicleRespDTO create(VehicleReqDTO dto);
    VehicleRespDTO getByVin(String vin);
    List<VehicleRespDTO> list();
    VehicleRespDTO updateVehicle(String vin, VehicleReqDTO vehicleReqDTO);
}

