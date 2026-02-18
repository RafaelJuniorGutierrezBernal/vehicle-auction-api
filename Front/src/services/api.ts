import type { Vehicle } from '../models';
import keycloak from '../keycloak';

const API_BASE_URL = 'http://localhost:8081/api'; 

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': keycloak.token ? `Bearer ${keycloak.token}` : '',
});

export interface SaleRequest {
    seller: string;
    mmr: number;
    sellingPrice: number;
    saleDate: string;
    vehicleVin: string;
}

export const apiService = {

    createVehicle: async (vehicleData: Vehicle): Promise<Vehicle> =>{
        const { version, ...rest } = vehicleData as any;
        const dataToSave = { ...rest, trim: version };

        const response = await fetch(`${API_BASE_URL}/vehicles`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(dataToSave),
        });
        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            console.error('API Error details:', errorBody);
            throw new Error(errorBody.message || 'Error al crear el vehículo');
        }
        return response.json();
    },
    
    getVehicles: async (): Promise<Vehicle[]> => {
        const response = await fetch(`${API_BASE_URL}/vehicles/list`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Error al obtener vehículos');
        return response.json();
    },

    getVehicleByVin: async (vin: string): Promise<Vehicle> => {
        const response = await fetch(`${API_BASE_URL}/vehicles/${vin}`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Error al obtener el vehículo');
        return response.json();
    },

    
    createSale: async (saleData: SaleRequest): Promise<any> => {
        const response = await fetch(`${API_BASE_URL}/sales`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(saleData),
        });
        if (!response.ok) throw new Error('Error al procesar la venta');
        return response.json();
    }
};
