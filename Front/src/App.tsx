import { useState } from "react";
import VehicleList from "./components/vehicle/VehicleList";
import type { Vehicle } from "./models";

function App() {
  const [vehicles] = useState<Vehicle[]>([
    {
      vin: "ABC123XYZ",
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      transmission: "Automática",
      odometer: 45000,
      description: "Excelente estado, único dueño, mantenimiento en concesionario.",
      imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=400&h=300&auto=format&fit=crop",
      startingPrice: 55000000,
      currentPrice: 58500000,
      status: "active",
      auctionEndDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) // 2 días después
    },
    {
      vin: "DEF456UVW",
      make: "Mazda",
      model: "CX-5",
      year: 2022,
      transmission: "Automática",
      odometer: 12000,
      description: "Como nuevo, Full equipo, techo corredizo, tapicería en cuero.",
      imageUrl: "https://images.unsplash.com/photo-1629810452336-0560a6711689?q=80&w=400&h=300&auto=format&fit=crop",
      startingPrice: 110000000,
      currentPrice: 115000000,
      status: "active",
      auctionEndDate: new Date(Date.now() + 1000 * 60 * 60 * 5) // 5 horas después
    },
    {
      vin: "GHI789QRS",
      make: "Ford",
      model: "F-150",
      year: 2018,
      transmission: "Automática",
      odometer: 89000,
      description: "Potente motor, tracción 4x4, lista para el trabajo pesado.",
      imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=400&h=300&auto=format&fit=crop",
      startingPrice: 140000000,
      currentPrice: 140000000,
      status: "pending",
      auctionEndDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5) // 5 días después
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Simple */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">AutoDeal / Dealer Management</h1>
          <nav className="space-x-4">
            <button className="text-gray-600 hover:text-blue-600 font-medium">Catálogo</button>
            <button className="text-gray-600 hover:text-blue-600 font-medium">Ventas</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Iniciar Sesión
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Subastas Activas</h2>
          <p className="mt-2 text-gray-600">Explora nuestro inventario disponible para subasta inmediata.</p>
        </div>

        <VehicleList 
          vehicles={vehicles} 
          onVehicleClick={(v) => console.log('Detalle de:', v.vin)} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-8 text-center text-gray-500">
        <p>&copy; 2026 AutoDeal System. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
