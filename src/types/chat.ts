
export interface QueryRequest {
  query: string;
  sessionId?: string;
}

export interface QueryResponse {
  query: string;
  response: string;
  toolsUsed: string[];
  chartSpec?: any;
  timestamp: string;
  processingTime?: number;
  sessionId: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  chartSpec?: any;
  toolsUsed?: string[];
  processingTime?: number;
  images?: string[];
}
