import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-blue-500">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-25">
          <h1 className="text-4xl font-bold text-white">Safary</h1>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
