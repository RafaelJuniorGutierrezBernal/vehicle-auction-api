import React, { useState } from "react";
import { apiService } from "../../services/api";
import type { Vehicle } from "../../models/Vehicle";

function AddVehicle() {
  const [vehicleData, setVehicleData] = useState({
    vin: "",
    make: "",
    model: "",
    year: "",
    version: "",
    body: "",
    transmission: "",
    state: "",
    condition: "",
    odometer: "",
    color: "",
    interior: "",
    description: "",
    imageUrl: "",
    currentPrice: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!vehicleData.vin || !vehicleData.year) {
      alert("Por favor, ingresa al menos el VIN y el Año.");
      return;
    }

    try {
      const formattedData = {
        ...vehicleData,
        year: Number(vehicleData.year),
        condition: vehicleData.condition
          ? Number(vehicleData.condition)
          : undefined,
        odometer: vehicleData.odometer
          ? Number(vehicleData.odometer)
          : undefined,
        currentPrice: vehicleData.currentPrice
          ? Number(vehicleData.currentPrice)
          : undefined,
      };

      await apiService.createVehicle(formattedData as any as Vehicle);
      alert("Vehículo agregado exitosamente");
      setVehicleData({
        vin: "",
        make: "",
        model: "",
        year: "",
        version: "",
        body: "",
        transmission: "",
        state: "",
        condition: "",
        odometer: "",
        color: "",
        interior: "",
        description: "",
        imageUrl: "",
        currentPrice: "",
      });
    } catch (error: any) {
      console.error("Error al agregar vehículo:", error);
      alert(error.message || "Error al agregar vehículo");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="vin"
          value={vehicleData.vin}
          onChange={handleChange}
          placeholder="VIN"
        />
        <input
          type="text"
          name="make"
          value={vehicleData.make}
          onChange={handleChange}
          placeholder="Marca"
        />
        <input
          type="text"
          name="model"
          value={vehicleData.model}
          onChange={handleChange}
          placeholder="Modelo"
        />
        <input
          type="text"
          name="year"
          value={vehicleData.year}
          onChange={handleChange}
          placeholder="Año"
        />
        <input
          type="text"
          name="version"
          value={vehicleData.version}
          onChange={handleChange}
          placeholder="Versión / Equipamiento (ej: Sport, Lariat, EX)"
        />
        <input
          type="text"
          name="body"
          value={vehicleData.body}
          onChange={handleChange}
          placeholder="Body"
        />
        <input
          type="text"
          name="transmission"
          value={vehicleData.transmission}
          onChange={handleChange}
          placeholder="Transmisión"
        />
        <input
          type="text"
          name="state"
          value={vehicleData.state}
          onChange={handleChange}
          placeholder="Estado"
        />
        <input
          type="text"
          name="condition"
          value={vehicleData.condition}
          onChange={handleChange}
          placeholder="Condición"
        />
        <input
          type="text"
          name="odometer"
          value={vehicleData.odometer}
          onChange={handleChange}
          placeholder="Odometer"
        />
        <input
          type="text"
          name="color"
          value={vehicleData.color}
          onChange={handleChange}
          placeholder="Color"
        />
        <input
          type="text"
          name="interior"
          value={vehicleData.interior}
          onChange={handleChange}
          placeholder="Interior"
        />
        <input
          type="text"
          name="description"
          value={vehicleData.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="text"
          name="imageUrl"
          value={vehicleData.imageUrl}
          onChange={handleChange}
          placeholder="URL de la imagen"
        />
        <input
          type="text"
          name="currentPrice"
          value={vehicleData.currentPrice}
          onChange={handleChange}
          placeholder="Precio actual"
        />
        <button type="submit">Agregar vehículo</button>
      </div>
    </form>
  );
}

export default AddVehicle;
