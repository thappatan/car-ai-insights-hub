import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BarChart3, Image, Loader2, RefreshCw, MessageCircle, X, Minimize2, TrendingUp, TrendingDown, Search, Filter, Car, DollarSign, Users, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Types for the API
interface QueryRequest {
  query: string;
  sessionId?: string;
}

interface QueryResponse {
  query: string;
  response: string;
  toolsUsed: string[];
  chartSpec?: any;
  timestamp: string;
  processingTime?: number;
  sessionId: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  chartSpec?: any;
  toolsUsed?: string[];
  processingTime?: number;
  images?: string[];
}

// Sample data for charts
const salesData = [
  { month: 'Jan', sales: 45, revenue: 180000 },
  { month: 'Feb', sales: 52, revenue: 208000 },
  { month: 'Mar', sales: 48, revenue: 192000 },
  { month: 'Apr', sales: 61, revenue: 244000 },
  { month: 'May', sales: 55, revenue: 220000 },
  { month: 'Jun', sales: 67, revenue: 268000 },
];

const vehicleTypeData = [
  { name: 'Sedans', value: 35, color: '#8B5CF6' },
  { name: 'SUVs', value: 28, color: '#06B6D4' },
  { name: 'Trucks', value: 20, color: '#10B981' },
  { name: 'Coupes', value: 17, color: '#F59E0B' },
];

// Enhanced Chart component using Recharts
const ChartRenderer: React.FC<{ chartSpec: any; title?: string }> = ({ chartSpec, title }) => {
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

// Enhanced Dashboard Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: string;
  change: number;
  period: string;
  icon: React.ReactNode;
  gradient: string;
}> = ({ title, value, change, period, icon, gradient }) => {
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

// Enhanced Message component
const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
              : 'bg-gradient-to-br from-purple-500 to-purple-600'
          }`}>
            {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
          </div>
        </div>
        
        {/* Message content */}
        <div className={`rounded-2xl px-5 py-4 shadow-sm ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
            : 'bg-white border border-gray-100 text-gray-800'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
          
          {/* Images */}
          {message.images && message.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {message.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={img} 
                    alt={`Car image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNGMUY1RjkiLz48cGF0aCBkPSJNNzAgNTQuNUg5MEw4MCA2NC41SDcwVjU0LjVaIiBmaWxsPSIjOTNDNUZEIi8+PHBhdGggZD0iTTcwIDY0LjVIODBMOTAgNzQuNUg3MFY2NC41WiIgZmlsbD0iIzMzODVGRiIvPjx0ZXh0IHg9IjEwMCIgeT0iNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NzI4MCI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 rounded-lg px-2 py-1">
                    <Image className="w-3 h-3 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Chart */}
          {message.chartSpec && (
            <ChartRenderer chartSpec={message.chartSpec} />
          )}
          
          {/* Metadata */}
          {!isUser && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  {message.toolsUsed && message.toolsUsed.length > 0 && (
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      🔧 {message.toolsUsed.join(', ')}
                    </span>
                  )}
                  {message.chartSpec && (
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                      <BarChart3 className="w-3 h-3 inline mr-1" />
                      Chart
                    </span>
                  )}
                </div>
                {message.processingTime && (
                  <span className="text-gray-500">{message.processingTime}ms</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Index: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! Welcome to the AI Car Dealership Assistant 🚗\n\nI can help you with:\n• Inventory management\n• Sales analytics\n• Customer insights\n• Financial reports\n\nWhat would you like to explore today?',
      timestamp: new Date(),
      toolsUsed: [],
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>();
  const [apiUrl, setApiUrl] = useState('http://localhost:3000');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // API service function
  const sendQuery = async (query: string, sessionId?: string): Promise<QueryResponse> => {
    const response = await fetch(`${apiUrl}/ai-agent/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, sessionId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  // Extract images from response text
  const extractImages = (text: string): string[] => {
    const imageRegex = /https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/gi;
    return text.match(imageRegex) || [];
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendQuery(inputValue, sessionId);
      
      const images = extractImages(response.response);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.response,
        timestamp: new Date(response.timestamp),
        chartSpec: response.chartSpec,
        toolsUsed: response.toolsUsed,
        processingTime: response.processingTime,
        images: images.length > 0 ? images : undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
      setSessionId(response.sessionId);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Sorry, there was an error connecting to the service: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check:\n• API URL is correct\n• Backend server is running\n• Network connection`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear conversation
  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: 'Hello! Starting a fresh conversation. How can I assist you today?',
        timestamp: new Date(),
        toolsUsed: [],
      }
    ]);
    setSessionId(undefined);
  };

  // Sample queries
  const suggestedPrompts = [
    'Show me sales trends',
    'Inventory status report',
    'Customer analytics',
    'Revenue breakdown',
    'Top selling models',
    'Monthly performance'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: '#8B5CF6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vehicle Types Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Vehicle Types</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vehicleTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {vehicleTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
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
      </div>

      {/* Enhanced Chat Widget - Made Larger */}
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>
      ) : (
        <div className={`fixed bottom-8 right-8 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300 ${
          isMinimized ? 'w-96 h-16' : 'w-[480px] h-[700px]'
        }`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">AI Assistant</div>
                <div className="text-xs text-gray-600">How can I help you today?</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Suggested Prompts */}
              <div className="p-6 border-b border-gray-50 bg-gray-50">
                <div className="text-xs font-semibold text-gray-700 mb-3">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(prompt)}
                      className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-purple-50 hover:border-purple-200 text-left transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages - Increased height */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[440px]">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                      <span className="text-gray-600 text-sm">AI is thinking...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Section */}
              <div className="border-t border-gray-100 p-6 bg-white rounded-b-2xl">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message here..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm transition-all min-h-[44px] max-h-32"
                      rows={1}
                      disabled={isLoading}
                      style={{ height: 'auto' }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
