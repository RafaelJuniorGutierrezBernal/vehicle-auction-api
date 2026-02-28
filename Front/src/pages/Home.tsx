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
    <div className="mb-12 pl-12 text-right">
      <div className="inline-block">
        <h1 className="text-4xl lg:text-5xl font-bold text-blue-800">
          Acerca de Vehicle Management Company
        </h1>
        <p className="mt-6 mr-4 font-semibold text-gray-800 leading-relaxed max-w-3xl mx-auto">
          Vehicle Management Company es el socio confiable de cientos de concesionarios a lo largo de América Latina. Desde 2010 hemos desarrollado
          soluciones de software empresarial que automatizan la gestión de inventarios, la facturación, la atención al cliente y los análisis de
          desempeño. Nuestra plataforma está diseñada para adaptarse a concesionarios pequeños y grandes, con herramientas avanzadas para seguimiento
          de ventas, financiamiento y marketing digital. A través de alianzas estratégicas con fabricantes y servicios financieros, proporcionamos
          a nuestros clientes una cadena de valor completa que incrementa la eficiencia operativa y maximiza la rentabilidad.
        </p>
        <h2 className="mt-4 text-2xl font-bold text-blue-700">Nuestra Misión</h2>
        <p className="mt-4 mr-4 font-semibold text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Comprometidos con la innovación y el soporte permanente, ofrecemos capacitación continua y un equipo de asistencia 24/7. Nuestro objetivo
          es transformar la manera en la que los concesionarios gestionan sus operaciones, brindando una plataforma segura, escalable y fácil de usar
          que impulsa el crecimiento sostenible de su negocio.
        </p>
      </div>
    </div>
    </>
  );
};

export default Home;

