package com.auction.vehicleauctionapi.service;

import java.util.List;

import com.auction.vehicleauctionapi.model.dto.request.SaleReqDTO;
import com.auction.vehicleauctionapi.model.dto.response.SaleRespDTO;

public interface SaleService {
    void deleteById(Long id);
    SaleRespDTO create(SaleReqDTO dto);
    SaleRespDTO getById(Long id);
    List<SaleRespDTO> list();
    SaleRespDTO updateSale(Long id, SaleReqDTO saleReqDTO);
}
