
import React, { useState } from 'react';
import { Car, DollarSign, Users, Calendar } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCard from '../components/dashboard/StatsCard';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import InventoryTable from '../components/dashboard/InventoryTable';
import ChatWidget from '../components/chat/ChatWidget';

const Index: React.FC = () => {
  const [apiUrl, setApiUrl] = useState('http://localhost:3000');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <DashboardHeader />

      {/* Overview Section */}
      <div className="px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value="$2.45M"
            change={20}
            period="vs last month"
            icon={<DollarSign className="w-6 h-6" />}
            gradient="from-emerald-500 to-teal-600"
          />
          <StatsCard
            title="Cars Sold"
            value="1,250"
            change={15}
            period="vs last month"
            icon={<Car className="w-6 h-6" />}
            gradient="from-blue-500 to-cyan-600"
          />
          <StatsCard
            title="Active Customers"
            value="3,847"
            change={8}
            period="vs last month"
            icon={<Users className="w-6 h-6" />}
            gradient="from-purple-500 to-pink-600"
          />
          <StatsCard
            title="Pending Orders"
            value="150"
            change={-5}
            period="vs last month"
            icon={<Calendar className="w-6 h-6" />}
            gradient="from-orange-500 to-red-600"
          />
        </div>

        {/* Charts Section */}
        <DashboardCharts />

        {/* Data Table Section */}
        <InventoryTable />
      </div>

      {/* Chat Widget */}
      <ChatWidget apiUrl={apiUrl} />

      {/* API Configuration Panel (Hidden by default) */}
      <div className="fixed top-4 left-4 bg-white rounded-lg shadow border border-gray-200 p-3 opacity-20 hover:opacity-100 transition-opacity">
        <div className="text-xs text-gray-600 mb-1">API URL:</div>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className="text-xs bg-gray-50 border border-gray-300 rounded px-2 py-1 w-64"
          placeholder="http://localhost:3000"
        />
      </div>
    </div>
  );
};

export default Index;
