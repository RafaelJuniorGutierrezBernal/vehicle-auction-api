import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Vehicle } from '../models';
import VehicleList from '../components/vehicle/VehicleList';
import { vehicleService } from '../services/VehicleService';

const Home = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const data = await vehicleService.getVehicles();
        setVehicles(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('No se pudieron cargar los vehículos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Catálogo de Vehículos</h2>
        <p className="mt-2 text-gray-600">Explora nuestro inventario disponible para venta inmediata.</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <VehicleList 
        vehicles={vehicles} 
        loading={loading}
        onVehicleClick={(v) => navigate(`/vehicle/${v.vin}`)} 
      />
    </>
  );
};

export default Home;

