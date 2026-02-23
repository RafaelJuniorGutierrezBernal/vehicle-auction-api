import Card from "../common/Card";
import Button from "../common/Button";
import type { Vehicle } from "../../models";

interface VehicleCardProps {
    vehicle: Vehicle;
    onViewDetails?: () => void;
}

function VehicleCard({ vehicle, onViewDetails }: VehicleCardProps) {

    const formatPrice = (price?: number): string => {
        if (price === undefined) return 'N/A';
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price)
    }

    const getStatusColor = (status: string = 'active'): string => {
        switch (status) {
            case 'active': return 'bg-green-500'
            case 'closed': return 'bg-red-500'
            case 'pending': return 'bg-yellow-500'
            default: return 'bg-gray-500'
        }
    }

    const getStatusText = (status: string = 'active'): string => {
        switch (status) {
            case 'active': return 'Disponible'
            case 'closed': return 'Vendido'
            case 'pending': return 'Pendiente'
            default: return status
        }
    }

    return (
        <Card className="max-w-sm" onClick={onViewDetails}>
            {/* Imagen del vehiculo*/}
            <div className="relative">
                <img
                    src={vehicle.imageUrl || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                />
                {/*Badge de estado */}
                <div className={`absolute top-2 right-2 ${getStatusColor(vehicle.status)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {getStatusText(vehicle.status)}
                </div>
            </div>
            {/* Contenido del card */}
            <div className="p-4">
                {/* Título: Marca y Modelo */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {vehicle.make} {vehicle.model}
                </h3>
                {/*Informacion Basica */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{vehicle.year}</span>
                    <span>{(vehicle.odometer || 0).toLocaleString()} km</span>
                    <span>{vehicle.transmission}</span>
                </div>

                {/*Descripcion */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {vehicle.description || 'Sin descripción disponible'}
                </p>
                <div className="border-t border-gray-200 my-3"></div>
                {/* Precios */}
                <div className="mb-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-800">Precio Actual:</span>
                        <span className="text-xl font-bold text-blue-600">{formatPrice(vehicle.currentPrice)}</span>
                    </div>
                </div>
                {/* Boton de accion */}
                <Button
                    variant="primary"
                    onClick={(e) => {
                        e?.stopPropagation()
                        onViewDetails?.()
                    }}
                >
                    Ver Detalles
                </Button>
            </div>
        </Card>
    )
}
export default VehicleCard
