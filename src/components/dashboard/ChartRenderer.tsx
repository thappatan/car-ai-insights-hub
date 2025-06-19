
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 45, revenue: 180000 },
  { month: 'Feb', sales: 52, revenue: 208000 },
  { month: 'Mar', sales: 48, revenue: 192000 },
  { month: 'Apr', sales: 61, revenue: 244000 },
  { month: 'May', sales: 55, revenue: 220000 },
  { month: 'Jun', sales: 67, revenue: 268000 },
];

interface ChartRendererProps {
  chartSpec: any;
  title?: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartSpec, title }) => {
  if (!chartSpec) return null;

  return (
    <div className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm">
      <h4 className="text-sm font-semibold text-gray-700 mb-4">{title || 'Chart'}</h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
            <YAxis stroke="#6B7280" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartRenderer;
