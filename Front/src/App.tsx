import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuctionDetail from "./pages/AuctionDetail";
import Header from "./components/layout/Header";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import AddVehicle from "./components/vehicle/AddVehicle";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header />
      <NavBar />

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:vin" element={<AuctionDetail />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
