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

import com.auction.vehicleauctionapi.model.dto.VehicleDTO;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import com.auction.vehicleauctionapi.service.VehicleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService service;

    @PostMapping
    public ResponseEntity<VehicleEntity> create(@Valid @RequestBody VehicleDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto))
        ;
    }

    @GetMapping("/{vin}")
    public VehicleEntity get(@PathVariable String vin){
        return service.getByVin(vin);
    }

    @GetMapping
    public List<VehicleEntity>list(){
        return service.list();
    }
}
