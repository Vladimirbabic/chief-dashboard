import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, ExternalLink, Sparkles, Send } from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  sender: 'user' | 'chief';
  content: string;
  timestamp: Date;
}

interface ChiefChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onViewFullChat: () => void;
  initialMessage?: string;
  contextTitle?: string;
}

export function ChiefChatPopup({ 
  isOpen, 
  onClose, 
  onViewFullChat, 
  initialMessage = "",
  contextTitle = "this context"
}: ChiefChatPopupProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with the first message when popup opens
  useEffect(() => {
    if (isOpen && initialMessage && messages.length === 0) {
      const userMessage: Message = {
        id: '1',
        sender: 'user',
        content: initialMessage,
        timestamp: new Date()
      };
      setMessages([userMessage]);
      
      // Simulate Chief's response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const chiefResponse: Message = {
          id: '2',
          sender: 'chief',
          content: `I understand you're asking about "${initialMessage.slice(0, 50)}${initialMessage.length > 50 ? '...' : ''}". Let me help you with that. Based on the context of ${contextTitle}, I can provide relevant insights and assistance.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, chiefResponse]);
      }, 1500);
    }
  }, [isOpen, initialMessage, contextTitle]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Reset messages when popup closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInputValue("");
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate Chief's response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const chiefResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'chief',
        content: "I'm here to help! Based on the information available, I can assist you further. Would you like me to elaborate on any specific aspect?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, chiefResponse]);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-2 left-8 right-8 h-[400px] z-50 flex flex-col bg-white rounded-2xl border border-[#E6EBEC] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6EBEC] bg-gray-50/50">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-950">
            <Image src="/chief-logo.png" alt="Chief" width={16} height={16} className="h-4 w-4" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">Chief Chat</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50 gap-1"
            onClick={onViewFullChat}
          >
            View in Chief Chat
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.sender === 'chief' ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-950 shrink-0">
                <Image src="/chief-logo.png" alt="Chief" width={18} height={18} className="h-[18px] w-[18px]" />
              </div>
            ) : (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-sm' 
                  : 'bg-gray-100 text-gray-900 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-950 shrink-0">
              <Image src="/chief-logo.png" alt="Chief" width={18} height={18} className="h-[18px] w-[18px]" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#E6EBEC] bg-white">
        <div className="flex gap-2 items-center">
          <input 
            type="text" 
            placeholder="Continue the conversation..." 
            className="flex-1 px-4 py-2.5 text-sm bg-gray-50 rounded-full border border-[#E6EBEC] outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            size="icon" 
            className="h-10 w-10 rounded-full bg-teal-600 hover:bg-teal-700 text-white shrink-0"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
            <Sparkles className="h-2.5 w-2.5" />
            Chief is here to help with {contextTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

