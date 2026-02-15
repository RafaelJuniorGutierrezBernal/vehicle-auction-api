package com.auction.vehicleauctionapi.repositoyT;
import com.auction.vehicleauctionapi.model.entity.VehicleEntity;
import com.auction.vehicleauctionapi.repository.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class VehicleRepositoryTest {

  @Autowired VehicleRepository vehicleRepository;

  @Test
  void saveAndFindById() {
    VehicleEntity v = new VehicleEntity();
    v.setVin("1HGCM82633A004352");
    v.setYear(2018);

    vehicleRepository.save(v);

    assertThat(vehicleRepository.findById("1HGCM82633A004352")).isPresent();
  }
}