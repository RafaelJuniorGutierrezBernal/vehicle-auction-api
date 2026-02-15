package com.auction.vehicleauctionapi.repository;

import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<VehicleEntity, String> {
    boolean existsByVin(String vin);
}
