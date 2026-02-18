import React from 'react';
import keycloak from '../../keycloak';

const Header: React.FC = () => {
  const userName = keycloak.authenticated ? (keycloak.tokenParsed?.preferred_username || "Usuario") : null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AutoDeal / Dealer Management</h1>
        <div className="flex items-center space-x-4">
          {keycloak.authenticated ? (
            <>
              <span className="text-gray-500 mr-2">Hola, <strong>{userName}</strong></span>
              <button 
                onClick={() => keycloak.logout()}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <button 
              onClick={() => keycloak.login()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
