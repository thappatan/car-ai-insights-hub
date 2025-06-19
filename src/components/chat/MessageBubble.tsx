
import React from 'react';
import { Bot, User, BarChart3, Image } from 'lucide-react';
import { ChatMessage } from '../../types/chat';
import ChartRenderer from '../dashboard/ChartRenderer';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
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

export default MessageBubble;
