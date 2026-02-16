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

    const getTimeRemaining = (endDate?: Date): string => {
        if (!endDate) return 'Sin fecha';
        const now = new Date()
        const end = new Date(endDate)
        const diff = end.getTime() - now.getTime()

        if (diff <= 0) return 'Subasta Finalizada'

        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        if (days > 0) return `${days}d ${hours}h restantes`
        return `${hours}h restantes`
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
            case 'active': return 'Activa'
            case 'closed': return 'Cerrada'
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
                {/* Separador */}
                <div className="border-t border-gray-200 my-3"></div>

                {/* Precios */}
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Precio Inicial: </span>
                        <span className="text-sm text-gray-700">{formatPrice(vehicle.startingPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-800">Puja actual:</span>
                        <span className="text-xl font-bold text-blue-600">{formatPrice(vehicle.currentPrice)}</span>
                    </div>
                </div>
                {/* Tiempo restante */}
                <div className="bg-gray-100 rounded-lg p-2 mb-4 text-center">
                    <span className="text-sm text-gray-700">
                        {getTimeRemaining(vehicle.auctionEndDate)}
                    </span>
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
