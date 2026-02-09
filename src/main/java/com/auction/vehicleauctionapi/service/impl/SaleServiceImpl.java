package com.auction.vehicleauctionapi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.auction.vehicleauctionapi.model.dto.SaleDTO;
import com.auction.vehicleauctionapi.model.entity.SaleEntity;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import com.auction.vehicleauctionapi.repository.SaleRepository;
import com.auction.vehicleauctionapi.repository.VehicleRepository;
import com.auction.vehicleauctionapi.service.SaleService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService{
    private final SaleRepository saleRepository;
    private final VehicleRepository vehicleRepository;

    @Override
    public SaleEntity create(SaleDTO dto) {
        String vin = dto.getVehicleVin().trim();
      VehicleEntity vehicle = vehicleRepository.findById(vin)
            .orElseThrow(() -> new EntityNotFoundException("There is no vehicle whith vin: " + vin));

    SaleEntity sale = SaleEntity.builder()
            .vehicle(vehicle)
            .seller(dto.getSeller())
            .mmr(dto.getMmr())
            .sellingPrice(dto.getSellingPrice())
            .saleDate(dto.getSaleDate())
            .build();
    return saleRepository.save(sale);
}
    

    @Override
    public SaleEntity getById(Long id) {
       return saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale whith ID: " +id)); 
    }

    @Override
    public List<SaleEntity> list() {
        return saleRepository.findAll();
    }
}
