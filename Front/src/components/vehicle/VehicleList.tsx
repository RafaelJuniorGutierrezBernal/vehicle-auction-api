import VehicleCard from './VehicleCard'
import type { Vehicle } from '../../models'

interface VehicleListProps {
  vehicles: Vehicle[];
  onVehicleClick?: (vehicle: Vehicle) => void;
  loading?: boolean;
}

function VehicleList({ vehicles, onVehicleClick, loading = false }: VehicleListProps) {
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No se encontraron vehículos disponibles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard 
          key={vehicle.vin} 
          vehicle={vehicle} 
          onViewDetails={() => onVehicleClick?.(vehicle)}
        />
      ))}
    </div>
  )
}

export default VehicleList
