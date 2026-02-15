import { useState } from "react";
import Button from "./components/common/Button";
import Card from "./components/common/Card";

function App() {
  const [bidCount, setBidCount] = useState(0);

  const handlePrimaryClick = () => {
    setBidCount(bidCount + 1);
    alert(`!Puja realizada! Total de pujas: ${bidCount + 1}`);
  };

  const handleSecondaryClick = () => {
    alert("Ver detalles del vehiculo");
  };

  const handleDangerClick = () => {
    if (confirm("¿Estás seguro de cancelar?")) {
      setBidCount(0);
      alert("Pujas canceladas correctamente");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Vehicle Auction
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Probando el componente Button
        </p>
        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">
              Numero de pujas:{" "}
              <span className="font-bold text-blue-600">{bidCount}</span>
            </p>
          </div>
          {/* Boton Primary - el mas importante */}
          <Button onClick={handlePrimaryClick} variant="primary">
            Hacer Puja
          </Button>
          {/*Boton Secundario - accion secundaria */}
          <Button onClick={handleSecondaryClick} variant="secondary">
            ver Detalles
          </Button>
          {/*Boton Danger - Accion Peligrosa */}
          <Button onClick={handleDangerClick} variant="danger">
            Cancelar Puja
          </Button>
        </div>
        
        <div className="p-8">
          <Card className="max-w-md p-6">
            <h2 className="text-2xl font-bold mb-2">Toyota Corolla</h2>
            <p className="text-gray-600 mb-4">Año: 2020 | 50,000 km</p>
            <p className="text-xl font-bold text-blue-600 mb-4">$15,000</p>
            <Button variant="primary" onClick={() => console.log('Ver detalles clicked')}>Ver Detalles</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
