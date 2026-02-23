import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { vehicleService } from "../../services/VehicleService";
import type { Vehicle } from "../../models/Vehicle";
import VehicleForm from "./VehicleForm";

const EditVehicle = () => {
  const { vin } = useParams<{ vin: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!vin) return;
      try {
        const data = await vehicleService.getVehicleByVin(vin);
        setVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle for edit:", error);
        alert("No se pudo cargar la información del vehículo.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [vin, navigate]);

  const handleUpdate = async (formattedData: Vehicle) => {
    if (!vin) return;
    try {
      await vehicleService.updateVehicle(vin, formattedData);
      alert("Vehículo actualizado exitosamente");
      navigate(`/vehicle/${vin}`);
    } catch (error: any) {
      console.error("Error al actualizar vehículo:", error);
      alert(error.message || "Error al actualizar vehículo");
    }
  };

  if (loading) return <div className="text-center py-10">Cargando datos del vehículo...</div>;
  if (!vehicle) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Editar Vehículo</h2>
        <p className="mt-2 text-gray-600">Modifica los datos del vehículo: {vehicle.make} {vehicle.model} ({vin})</p>
      </div>

      <VehicleForm
        initialData={vehicle}
        onSubmit={handleUpdate}
        buttonText="Guardar Cambios"
        isEdit={true}
      />
    </div>
  );
};

export default EditVehicle;
