import React from 'react';
import { Link } from 'react-router-dom';
import keycloak from '../../keycloak';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-100 border-b border-gray-200 py-2 px-8">
      <div className="max-w-7xl mx-auto flex space-x-6">
        <Link to="/" className="text-gray-600 hover:text-blue-900 font-medium">
          Catálogo
        </Link>
        {keycloak.authenticated && (
          <Link to="/add-vehicle" className="text-gray-600 hover:text-blue-900 font-medium">
            Agregar Vehículo
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
