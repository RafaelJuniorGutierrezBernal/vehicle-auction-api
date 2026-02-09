package com.auction.vehicleauctionapi.service;

import java.util.List;

import com.auction.vehicleauctionapi.model.dto.SaleDTO;
import com.auction.vehicleauctionapi.model.entity.SaleEntity;
public interface SaleService {
    SaleEntity create(SaleDTO dto);
    SaleEntity getById(Long Id);
    List<SaleEntity> list();
}
