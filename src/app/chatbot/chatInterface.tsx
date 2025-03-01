'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, sendChatMessage } from './integration';
import { Message } from './message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageSquare, Send, Trash2, X } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'Hello! I\'m your VeriTrust assistant. How can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear chat history and reset to initial welcome message
  const handleClearChat = () => {
    setMessages([
      {
        role: 'system',
        content: 'Hello! I\'m your VeriTrust assistant. How can I help you today?'
      }
    ]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await sendChatMessage(userMessage.content, messages);
      setMessages(prev => [...prev, { role: 'system', content: response }]);
    } catch {
      // Simple error handling
      setMessages(prev => [...prev, { role: 'system', content: 'Something went wrong' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button (when closed) */}
      {!isOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="h-12 w-12 rounded-full"
                aria-label="Open chat"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with VeriTrust</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Chat Interface (when open) */}
      {isOpen && (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col shadow-lg animate-in slide-in-from-bottom duration-300">
          <CardHeader className="p-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">VeriTrust Assistant</CardTitle>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full p-0"
                      onClick={handleClearChat}
                      aria-label="Clear chat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full p-0"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <ScrollArea className="flex-1 p-3 custom-scrollbar">
            <div className="flex flex-col gap-2">
              {messages.map((message, index) => (
                <Message 
                  key={index} 
                  message={message} 
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <CardFooter className="p-3 pt-2">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatInterface;
