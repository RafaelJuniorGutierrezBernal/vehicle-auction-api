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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
@Tag(name = "Vehicle Management", description = "APIs for managing vehicles in the auction system")
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    @Operation(summary = "Create a new vehicle", description = "Creates a new vehicle entry in the auction system", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Vehicle created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input data"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public ResponseEntity<VehicleEntity> create(@Valid @RequestBody VehicleDTO vehicleDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.create(vehicleDTO));
    }

    @GetMapping("/{vin}")
    @Operation(summary = "Get vehicle by VIN", description = "Retrieves a vehicle using its Vehicle Identification Number", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vehicle found"),
        @ApiResponse(responseCode = "404", description = "Vehicle not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public VehicleEntity get(@Parameter(description = "Vehicle Identification Number") @PathVariable String vin){
        return vehicleService.getByVin(vin);
    }

    @GetMapping
    @Operation(summary = "List all vehicles", description = "Retrieves a list of all vehicles in the system", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of vehicles retrieved successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public List<VehicleEntity> list(){
        return vehicleService.list();
    }

}
