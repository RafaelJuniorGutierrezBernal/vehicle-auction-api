import type { Vehicle } from "../../models";
import Button from "../common/Button";
import { apiService } from "../../services/api";
import keycloak from "../../keycloak";

interface VehicleDetailProps {
    vehicle: Vehicle;
}

const VehicleDetail = ({ vehicle }: VehicleDetailProps) => {
    const isAdmin = keycloak.hasResourceRole('ADMIN') || keycloak.hasRealmRole('ADMIN');
    
    const formatPrice = (price?: number): string => {
        if (price === undefined) return 'N/A';
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
            <div className="space-y-4">
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                    <img 
                        src={vehicle.imageUrl ?? '/placeholder-vehicle.png'} 
                        alt={`${vehicle.make} ${vehicle.model}`} 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>

            
            <div className="space-y-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">{vehicle.make} {vehicle.model}</h1>
                    <p className="text-xl text-gray-500">{vehicle.year} • {vehicle.transmission ?? 'N/A'} • {vehicle.odometer?.toLocaleString() ?? 'N/A'} km</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Precio de Venta</p>
                            <p className="text-4xl font-black text-blue-800">{formatPrice(vehicle.currentPrice)}</p>
                        </div>
                    </div>
                    
                    {!keycloak.authenticated ? (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500">Inicia sesión para realizar transacciones sobre este vehículo.</p>
                            <Button 
                                variant="primary" 
                                className="w-full text-lg py-4"
                                onClick={() => keycloak.login()}
                            >
                                Iniciar Sesión para Comprar
                            </Button>
                        </div>
                    ) : isAdmin ? (
                        <Button 
                            variant="confirmacionPuja" 
                            className="w-full text-lg py-4"
                            onClick={async () => {
                                if (window.confirm(`¿Estás seguro de que deseas confirmar la venta de este ${vehicle.make} ${vehicle.model}?`)) {
                                    try {
                                        await apiService.createSale({
                                            seller: keycloak.tokenParsed?.preferred_username || "Sistema AutoDeal",
                                            mmr: 0,
                                            sellingPrice: vehicle.currentPrice || 0,
                                            saleDate: new Date().toISOString().split('T')[0],
                                            vehicleVin: vehicle.vin
                                        });
                                        alert('¡Venta realizada con éxito!');
                                    } catch (error) {
                                        console.error('Error al vender:', error);
                                        alert('Hubo un error al procesar la venta.');
                                    }
                                }
                            }}
                        >
                            Confirmar Venta
                        </Button>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-yellow-700 text-sm italic">
                            Tu cuenta no tiene permisos de administrador para registrar ventas.
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Especificaciones</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-xl p-3">
                            <p className="text-xs text-gray-500 uppercase">VIN</p>
                            <p className="font-semibold">{vehicle.vin}</p>
                        </div>
                        <div className="border rounded-xl p-3">
                            <p className="text-xs text-gray-500 uppercase">Estado</p>
                            <p className="font-semibold">
                                {vehicle.status === 'active' ? 'Activo' : 
                                 vehicle.status === 'pending' ? 'Pendiente' : 
                                 vehicle.status === 'closed' ? 'Cerrado' : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Descripción</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {vehicle.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetail;
