
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, MessageCircle, X, Minimize2, Loader2 } from 'lucide-react';
import { ChatMessage, QueryResponse } from '../../types/chat';
import MessageBubble from './MessageBubble';

interface ChatWidgetProps {
  apiUrl: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ apiUrl }) => {
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
    <>
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

              {/* Messages */}
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

              {/* Input Section */}
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
    </>
  );
};

export default ChatWidget;
