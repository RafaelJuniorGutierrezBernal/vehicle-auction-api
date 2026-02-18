import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleDetail from '../components/vehicle/VehicleDetail';
import type { Vehicle } from '../models';
import { apiService } from '../services/api';

const AuctionDetail = () => {
    const { vin } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            if (!vin) return;
            try {
                setLoading(true);
                const data = await apiService.getVehicleByVin(vin);
                setVehicle(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching vehicle:', err);
                setError('No se pudo encontrar el vehículo.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [vin]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800">{error ?? 'Vehículo no encontrado'}</h2>
                <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <button 
                onClick={() => navigate('/')}
                className="mb-8 text-gray-600 hover:text-blue-600 font-medium flex items-center transition-colors"
            >
                <span className="mr-2">←</span> Volver al Catálogo
            </button>
            
            <VehicleDetail vehicle={vehicle} />
        </div>
    );
};

export default AuctionDetail;
