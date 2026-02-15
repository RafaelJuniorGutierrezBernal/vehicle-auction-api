package com.auction.vehicleauctionapi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.auction.vehicleauctionapi.mapper.VehicleMapper;
import com.auction.vehicleauctionapi.model.dto.request.VehicleReqDTO;
import com.auction.vehicleauctionapi.model.dto.response.VehicleRespDTO;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import com.auction.vehicleauctionapi.repository.VehicleRepository;
import com.auction.vehicleauctionapi.service.VehicleService;


import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService{
    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;

    @Override
    public VehicleRespDTO create(VehicleReqDTO dto) {
       String vin = dto.getVin().trim();
       if(vehicleRepository.existsByVin(vin)) {
        throw new IllegalArgumentException("Vehicle with VIN " + vin + " already exists.");
       }
        VehicleEntity entity = vehicleMapper.toEntity(dto);
        entity = vehicleRepository.save(entity);
        return vehicleMapper.toResponseDTO(entity);
    }

    @Override
    public VehicleRespDTO getByVin(String vin) {
        return vehicleMapper.toResponseDTO(vehicleRepository.findById(vin).
        orElseThrow(EntityNotFoundException::new));
    }

    @Override
    public List<VehicleRespDTO> list() {
        return vehicleRepository.findAll().stream()
        .map(vehicleMapper::toResponseDTO)
        .toList();
    }
    @Override
    public void deleteByVin(String vin){
        vehicleRepository.deleteById(vin);
    }
    @Override
    public VehicleRespDTO updateVehicle (String vin, VehicleReqDTO vehicleReqDTO) {
        VehicleEntity existingVehicle = vehicleRepository.findById(vin)
        .orElseThrow(()->new EntityNotFoundException("Vehicle whith VIN: "+ vin +" not found"));
        vehicleMapper.updateEntityFromDTO(vehicleReqDTO, existingVehicle);
        existingVehicle = vehicleRepository.save(existingVehicle);
        return vehicleMapper.toResponseDTO(existingVehicle);

    }
}
