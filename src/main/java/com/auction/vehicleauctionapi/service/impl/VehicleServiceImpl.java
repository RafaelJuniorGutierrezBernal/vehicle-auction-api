package com.auction.vehicleauctionapi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.auction.vehicleauctionapi.model.dto.VehicleDTO;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import com.auction.vehicleauctionapi.repository.VehicleRepository;
import com.auction.vehicleauctionapi.service.VehicleService;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService{
    private final VehicleRepository vehicleRepository;

    @Override
    public VehicleEntity create(VehicleDTO dto) {
       String vin = dto.getVin().trim();
       if(vehicleRepository.existsByVin(vin)) {
        throw new IllegalArgumentException("Vehicle with VIN " + vin + " already exists.");
       }
         VehicleEntity entity = VehicleEntity.builder()
          .vin(vin)
                .year(dto.getYear())
                .make(dto.getMake())
                .model(dto.getModel())
                .trim(dto.getTrim())
                .body(dto.getBody())
                .transmission(dto.getTransmission())
                .state(dto.getState())
                .condition(dto.getCondition())
                .odometer(dto.getOdometer())
                .color(dto.getColor())
                .interior(dto.getInterior())
                .build();

        return vehicleRepository.save(entity);
    }

    @Override
    public VehicleEntity getByVin(String vin) {
        return vehicleRepository.findById(vin)
                .orElseThrow(() -> new EntityNotFoundException("Vehicle whith vin: " +vin));  
    }

    @Override
    public List<VehicleEntity> list() {
       return vehicleRepository.findAll();
    }
      
}
