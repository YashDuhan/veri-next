import { API_BASE_URL } from '@/app/api/api';

export interface ChatMessage {
  role: 'user' | 'system';
  content: string;
}

export interface ChatRequest {
  question: string;
  previous_convo: string[][];
}

export interface ChatResponse {
  answer: string;
}

export async function sendChatMessage(message: string, history: ChatMessage[]): Promise<string> {
  try {
    // Extract only user messages for the previous_convo
    const previousUserMessages = history
      .filter(msg => msg.role === 'user')
      .map(msg => [msg.content]); // Wrap each message in an array to match API schema
    
    const request: ChatRequest = {
      question: message,
      previous_convo: previousUserMessages
    };
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    
    const data = await response.json() as ChatResponse;
    
    // Parsing data
    if (!data.answer) return 'Something went wrong';
    
    try {
      const parsedAnswer = JSON.parse(data.answer);
      return parsedAnswer.response || 'Something went wrong';
    } catch {
      // Return raw answer if parsing fails
      return data.answer;
    }
  } catch (error) {
    throw error;
  }
}
