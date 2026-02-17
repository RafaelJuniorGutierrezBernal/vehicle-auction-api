package com.auction.vehicleauctionapi.controller;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.auction.vehicleauctionapi.model.dto.request.VehicleReqDTO;
import com.auction.vehicleauctionapi.model.dto.response.VehicleRespDTO;
import com.auction.vehicleauctionapi.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


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
    public ResponseEntity<VehicleRespDTO> create(@Valid @RequestBody VehicleReqDTO vehicleDTO){
       VehicleRespDTO response = vehicleService.create(vehicleDTO);
       return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{vin}")
    @Operation(summary = "Get vehicle by VIN", description = "Retrieves a vehicle using its Vehicle Identification Number", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vehicle found"),
        @ApiResponse(responseCode = "404", description = "Vehicle not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public ResponseEntity<VehicleRespDTO> get(@Parameter(description = "Vehicle Identification Number")@Valid @PathVariable String vin){
        return ResponseEntity.ok(vehicleService.getByVin(vin));
    }

    @GetMapping("/list")
    @Operation(summary = "List all vehicles", description = "Retrieves a list of all vehicles in the system", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of vehicles retrieved successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public ResponseEntity<List<VehicleRespDTO>> listVehicles(){
        return ResponseEntity.ok(vehicleService.list());
    }
    @DeleteMapping("/{vin}")
    @Operation(summary = "Delete a vehicle", description = "Deletes a vehicle from the auction system", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Vehicle deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Vehicle not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public ResponseEntity<Void> delete(@Parameter(description = "Vehicle Identification Number")@Valid @PathVariable String vin){
        vehicleService.deleteByVin(vin);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{vin}")
    @Operation(summary = "Update a vehicle", description = "Updates a vehicle in the auction system", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vehicle updated successfully"),
        @ApiResponse(responseCode = "404", description = "Vehicle not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
    })
    public ResponseEntity<VehicleRespDTO> updateVehicle(@PathVariable String vin,
        @Valid @RequestBody VehicleReqDTO vehicleReqDTO) 
        {
        VehicleRespDTO response = vehicleService.updateVehicle(vin, vehicleReqDTO);
        return ResponseEntity.ok(response);        
    }

}
