import React, { useState, useEffect } from "react";
import type { Vehicle } from "../../models/Vehicle";

interface VehicleFormProps {
  initialData?: Partial<Vehicle>;
  onSubmit: (data: Vehicle) => Promise<void>;
  buttonText: string;
  isEdit?: boolean;
}

const VehicleForm = ({ initialData, onSubmit, buttonText, isEdit = false }: VehicleFormProps) => {
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

  useEffect(() => {
    if (initialData) {
      setVehicleData({
        vin: initialData.vin || "",
        make: initialData.make || "",
        model: initialData.model || "",
        year: initialData.year?.toString() || "",
        version: initialData.version || "",
        body: initialData.body || "",
        transmission: initialData.transmission || "",
        state: initialData.state || "",
        condition: initialData.condition?.toString() || "",
        odometer: initialData.odometer?.toString() || "",
        color: initialData.color || "",
        interior: initialData.interior || "",
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
        currentPrice: initialData.currentPrice?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

    const formattedData = {
      ...vehicleData,
      year: Number(vehicleData.year),
      condition: vehicleData.condition ? Number(vehicleData.condition) : undefined,
      odometer: vehicleData.odometer ? Number(vehicleData.odometer) : undefined,
      currentPrice: vehicleData.currentPrice ? Number(vehicleData.currentPrice) : undefined,
    };

    await onSubmit(formattedData as any as Vehicle);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">VIN</label>
            <input
              type="text"
              name="vin"
              value={vehicleData.vin}
              onChange={handleChange}
              disabled={isEdit}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Identificador Único (VIN)"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              name="make"
              value={vehicleData.make}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Toyota"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              name="model"
              value={vehicleData.model}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Corolla"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Año</label>
            <input
              type="number"
              name="year"
              value={vehicleData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: 2024"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Versión / Trim</label>
            <input
              type="text"
              name="version"
              value={vehicleData.version}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: XLE, Sport"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Carrocería (Body)</label>
            <input
              type="text"
              name="body"
              value={vehicleData.body}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Sedan, SUV"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Transmisión</label>
            <input
              type="text"
              name="transmission"
              value={vehicleData.transmission}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Automática"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              name="state"
              value={vehicleData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Nuevo, Usado"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Condición (1-5)</label>
            <input
              type="number"
              name="condition"
              value={vehicleData.condition}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: 4.5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Kilometraje (km)</label>
            <input
              type="number"
              name="odometer"
              value={vehicleData.odometer}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: 15000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Color Exterior</label>
            <input
              type="text"
              name="color"
              value={vehicleData.color}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Blanco"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Color Interior</label>
            <input
              type="text"
              name="interior"
              value={vehicleData.interior}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Negro Cuero"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Precio Actual</label>
            <input
              type="number"
              name="currentPrice"
              value={vehicleData.currentPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Precio oficial de venta"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">URL de Imagen</label>
          <input
            type="text"
            name="imageUrl"
            value={vehicleData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={vehicleData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Detalles sobre el estado, mantenimiento, etc."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default VehicleForm;
