package com.auction.vehicleauctionapi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.auction.vehicleauctionapi.model.entity.SaleEntity;
public interface SaleRepository extends JpaRepository<SaleEntity, Long> {
    
}
