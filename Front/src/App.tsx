import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import AddVehicle from "./components/vehicle/AddVehicle";
import EditVehicle from "./components/vehicle/EditVehicle";
import SaleHistory from "./pages/SaleHistory";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header />
      <NavBar />

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:vin" element={<VehicleDetailPage />} />
          <Route path="/edit-vehicle/:vin" element={<EditVehicle />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/sales-history" element={<SaleHistory />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
