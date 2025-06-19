
import React from 'react';
import { User } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dealership Dashboard
            </h1>
            <p className="text-gray-600 mt-1">AI-Powered Automotive Analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Welcome back, Temitope</p>
              <p className="text-xs text-gray-500">March 19, 2024</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
