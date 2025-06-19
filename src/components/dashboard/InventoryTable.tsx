
import React from 'react';
import { Search, Filter } from 'lucide-react';

const InventoryTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
          <div className="flex space-x-6">
            <button className="text-purple-600 border-b-2 border-purple-600 pb-2 text-sm font-medium">All</button>
            <button className="text-gray-500 hover:text-gray-700 pb-2 text-sm transition-colors">Available</button>
            <button className="text-gray-500 hover:text-gray-700 pb-2 text-sm transition-colors">Sold</button>
            <button className="text-gray-500 hover:text-gray-700 pb-2 text-sm transition-colors">Reserved</button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">Filter</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4">Vehicle Details</th>
              <th className="px-6 py-4">Stock ID</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-sm font-bold text-purple-600">TC</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Toyota Camry 2023</div>
                    <div className="text-sm text-gray-500">Hybrid • Automatic</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">CAR.2023.001</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  Available
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">$45,000</td>
              <td className="px-6 py-4 text-sm text-gray-500">Mar 15, 2024</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-sm font-bold text-blue-600">HC</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Honda Civic 2023</div>
                    <div className="text-sm text-gray-500">Gasoline • Manual</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">CAR.2023.002</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                  Sold
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">$38,500</td>
              <td className="px-6 py-4 text-sm text-gray-500">Mar 12, 2024</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-sm font-bold text-green-600">F1</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Ford F-150 2023</div>
                    <div className="text-sm text-gray-500">Gasoline • Automatic</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">CAR.2023.003</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                  Reserved
                </span>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">$52,000</td>
              <td className="px-6 py-4 text-sm text-gray-500">Mar 10, 2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
