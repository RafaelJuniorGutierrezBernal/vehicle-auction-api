package com.auction.vehicleauctionapi.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.auction.vehicleauctionapi.model.dto.request.VehicleReqDTO;
import com.auction.vehicleauctionapi.model.dto.response.VehicleRespDTO;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface VehicleMapper {

    VehicleRespDTO toResponseDTO(VehicleEntity vehicleEntity);
    VehicleEntity toEntity(VehicleReqDTO requestDTO);
    List<VehicleRespDTO> toResponseDTO(List<VehicleEntity> vehicleEntity);
    @Mapping(target = "vin", ignore = true)
    void updateEntityFromDTO(VehicleReqDTO reqDTO, @MappingTarget VehicleEntity vehicleEntity);
}
