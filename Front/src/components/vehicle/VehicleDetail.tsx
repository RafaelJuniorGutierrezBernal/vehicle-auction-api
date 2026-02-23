import { useNavigate } from "react-router-dom";
import type { Vehicle } from "../../models";
import Button from "../common/Button";
import { saleService } from "../../services/SaleService";
import keycloak from "../../keycloak";
import { vehicleService } from "../../services/VehicleService";

interface VehicleDetailProps {
    vehicle: Vehicle;
}

const VehicleDetail = ({ vehicle }: VehicleDetailProps) => {
    const navigate = useNavigate();
    const isAdmin = keycloak.hasResourceRole('ADMIN') || keycloak.hasRealmRole('ADMIN');
    const isSold = vehicle.status === 'closed';
    
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
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                    <img 
                        src={vehicle.imageUrl ?? '/placeholder-vehicle.png'} 
                        alt={`${vehicle.make} ${vehicle.model}`} 
                        className="w-full h-full object-cover"
                    />
                    {isSold && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-4xl font-black uppercase tracking-widest border-4 border-white px-6 py-2 rotate-12">
                                Vendido
                            </span>
                        </div>
                    )}
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
                        <div className="space-y-3">
                            <Button 
                                variant="primary" 
                                className="w-full text-lg py-4"
                                disabled={isSold}
                                onClick={async () => {
                                    if (window.confirm(`¿Estás seguro de que deseas confirmar la venta de este ${vehicle.make} ${vehicle.model}?`)) {
                                        try {
                                            await saleService.createSale({
                                                seller: keycloak.tokenParsed?.preferred_username || "Sistema AutoDeal",
                                                mmr: 0,
                                                sellingPrice: vehicle.currentPrice || 0,
                                                saleDate: new Date(),
                                                vehicleVin: vehicle.vin
                                            });
                                            alert('¡Venta realizada con éxito!');
                                            navigate("/"); 
                                        } catch (error) {
                                            console.error('Error al vender:', error);
                                            alert('Hubo un error al procesar la venta.');
                                        }
                                    }
                                }}
                            >
                                {isSold ? 'Vehículo Vendido' : 'Confirmar Venta Directa'}
                            </Button>

                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => navigate(`/edit-vehicle/${vehicle.vin}`)}
                                >
                                    Editar Info
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={async () => {
                                        if (window.confirm('¿Está seguro de que desea eliminar el vehículo?')) {
                                            try {
                                                await vehicleService.deleteVehicleByVin(vehicle.vin);
                                                alert('¡Vehículo eliminado con éxito!');
                                                navigate("/");
                                            } catch (error) {
                                                console.error('Error al eliminar:', error);
                                                alert('No se pudo eliminar el vehículo. Por favor, inténtalo de nuevo.');
                                            }
                                        }
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
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
                                {vehicle.status === 'active' ? 'Disponible' : 
                                 vehicle.status === 'pending' ? 'Pendiente' : 
                                 vehicle.status === 'closed' ? 'Vendido' : 'N/A'}
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
