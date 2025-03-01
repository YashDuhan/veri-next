'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { ChatMessage } from './integration';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: ChatMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full items-start gap-2 py-2',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <Bot className="h-4 w-4" />
        </Avatar>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-xl px-3 py-2',
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary text-secondary-foreground'
        )}
      >
        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
};

export default Message;
