package com.auction.vehicleauctionapi.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.auction.vehicleauctionapi.model.dto.SaleDTO;
import com.auction.vehicleauctionapi.model.entity.SaleEntity;
import com.auction.vehicleauctionapi.service.SaleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<SaleEntity> create(@Valid @RequestBody SaleDTO saleDTO){
    return ResponseEntity.status(HttpStatus.CREATED).body(saleService.create(saleDTO));
    }

    @GetMapping("/{id}")
    public SaleEntity get(@PathVariable Long saleId){
        return saleService.getById(saleId);
    }

    @GetMapping
    public List<SaleEntity>list(){
        return saleService.list();
    }
}


