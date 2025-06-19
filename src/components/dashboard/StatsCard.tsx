
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  period: string;
  icon: React.ReactNode;
  gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, period, icon, gradient }) => {
  const isPositive = change > 0;
  
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-sm`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xs text-gray-500">{period}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
