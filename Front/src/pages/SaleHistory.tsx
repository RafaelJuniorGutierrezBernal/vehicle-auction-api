import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SaleHistory = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | string | null>(null);
    const API_BASE_URL = 'http://localhost:8081/api';
    
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/sales/list`,);
                const data = await response.json();
                setSales(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : String(err));
            }finally {
                setLoading(false);
            }    
                
            };
        fetchSales();
    }, []);
    
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el historial de ventas: {error.toString()}</div>;
    
    return (
        <div>
            <h1>Historial de Ventas</h1>
        </div>
    )
}
export default SaleHistory;