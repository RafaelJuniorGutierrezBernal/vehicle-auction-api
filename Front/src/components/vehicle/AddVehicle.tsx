import { useNavigate } from "react-router-dom";
import { vehicleService } from "../../services/VehicleService";
import VehicleForm from "./VehicleForm";

function AddVehicle() {
  const navigate = useNavigate();

  const handleCreate = async (formattedData: any) => {
    try {
      await vehicleService.createVehicle(formattedData);
      alert("Vehículo agregado exitosamente");
      navigate("/");
    } catch (error: any) {
      console.error("Error al agregar vehículo:", error);
      alert(error.message || "Error al agregar vehículo");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Agregar Nuevo Vehículo</h2>
        <p className="mt-2 text-gray-600">Completa la información técnica del vehículo para ingresarlo al inventario.</p>
      </div>
      
      <VehicleForm 
        onSubmit={handleCreate} 
        buttonText="Registrar Vehículo" 
      />
    </div>
  );
}

export default AddVehicle;
