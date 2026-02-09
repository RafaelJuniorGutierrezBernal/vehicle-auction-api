package com.auction.vehicleauctionapi.controllerT;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.auction.vehicleauctionapi.controller.SaleController;
import com.auction.vehicleauctionapi.service.SaleService;

@WebMvcTest(SaleController.class)
class SaleControllerTest {

  @Autowired MockMvc mockMvc;

  @MockBean SaleService saleService;

  @Test
  void createSale_returns201() throws Exception {
    String body = """
      {"seller":"AL","mmr":12000.00,"sellingPrice":12500.00,"saleDate":"2026-02-09","vehicleVin":"1HGCM82633A004352"}
    """;

    // when(saleService.create(any())).thenReturn(...);

    mockMvc.perform(post("/api/sales")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
      .andExpect(status().isCreated());
  }
}
