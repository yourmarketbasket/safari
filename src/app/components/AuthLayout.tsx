import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const imageUrl = "https://source.unsplash.com/random/1200x900/?travel,abstract";
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-white">Safary</h1>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
