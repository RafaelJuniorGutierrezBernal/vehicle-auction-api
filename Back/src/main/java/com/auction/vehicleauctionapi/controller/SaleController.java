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

import com.auction.vehicleauctionapi.model.dto.request.SaleReqDTO;
import com.auction.vehicleauctionapi.model.dto.response.SaleRespDTO;
import com.auction.vehicleauctionapi.service.SaleService;

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
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@Tag(name = "Sale Management", description = "APIs para gestionar ventas del sistema de subastas de vehículos")
public class SaleController {

    private final SaleService saleService;

    @PostMapping
    @Operation(summary = "Crear una venta", description = "Registra una nueva venta en el sistema de subastas", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Venta creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "401", description = "No autorizado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<SaleRespDTO> create(@Valid @RequestBody SaleReqDTO saleDTO) {
        SaleRespDTO response = saleService.create(saleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{saleId}")
    @Operation(summary = "Obtener venta por ID", description = "Recupera una venta por su identificador único", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Venta encontrada"),
        @ApiResponse(responseCode = "404", description = "Venta no encontrada"),
        @ApiResponse(responseCode = "401", description = "No autorizado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<SaleRespDTO> getSale(@Parameter(description = "Identificador único de la venta") @PathVariable Long saleId) {
        return ResponseEntity.ok(saleService.getById(saleId));
    }

    @GetMapping
    @Operation(summary = "Listar todas las ventas", description = "Recupera el listado de todas las ventas del sistema", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de ventas obtenida correctamente"),
        @ApiResponse(responseCode = "401", description = "No autorizado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<List<SaleRespDTO>> listSales() {
        return ResponseEntity.ok(saleService.list());
    }


    @DeleteMapping("/{saleId}")
    @Operation(summary = "Eliminar una venta", description = "Elimina una venta por su identificador único", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Venta eliminada correctamente"),
        @ApiResponse(responseCode = "404", description = "Venta no encontrada"),
        @ApiResponse(responseCode = "401", description = "No autorizado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<Void> deleteSale(@Parameter(description = "Identificador único de la venta") @PathVariable Long saleId) {
        saleService.deleteById(saleId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una venta", description = "Actualiza una venta existente", security = @SecurityRequirement(name = "bearer-jwt"))
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Venta actualizada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "404", description = "Venta no encontrada"),
        @ApiResponse(responseCode = "401", description = "No autorizado"),
        @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    public ResponseEntity<SaleRespDTO>updateSale(@PathVariable Long id, 
        @Valid @RequestBody SaleReqDTO saleReqDTO) 
    {
    SaleRespDTO response = saleService.updateSale(id, saleReqDTO);
    return ResponseEntity.ok(response);
    }
}


