import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  Send, 
  Sparkles, 
  MoreHorizontal,
  Share,
  Paperclip,
  Zap,
  Folder
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  sender: 'user' | 'chief' | 'other';
  name?: string;
  content: React.ReactNode;
  timestamp?: string;
}

interface ChiefChatProps {
  onBack: () => void;
  initialMessage?: string;
  contextType?: 'insight' | 'meeting' | 'prep';
  contextData?: any;
}

export function ChiefChat({ onBack, initialMessage, contextType, contextData }: ChiefChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'chief',
      name: 'Chief',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Lead Capture → HubSpot</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>All website submissions pass through an API into HubSpot.</li>
              <li>Stored fields include: Contact ID, Submission Timestamp, and Lead Source.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Phone System Integration</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Outbound calls log to HubSpot using matching Contact IDs.</li>
              <li>Each call includes: Timestamp, Duration, and Outcome.</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 my-4 flex justify-center">
             {/* Math formula visualization */}
             <div className="text-center">
                <div className="font-serif italic text-lg mb-2">Conversion Rate = <span className="inline-flex flex-col align-middle mx-2 border-b border-black pb-1"><span>Closed Won Leads</span></span> × 100%</div>
                <div className="font-serif italic text-lg"><span className="inline-flex flex-col align-middle mx-2 pt-1"><span>Total Website Leads</span></span></div>
             </div>
          </div>

          <ul className="list-disc pl-5 space-y-1 text-gray-700">
             <li>Result: 8% vs. 12% benchmark.</li>
          </ul>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">4. Follow-Up Average</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Result: ~50 follow-ups per rep.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: '2',
      sender: 'other',
      name: 'Sam Daw',
      content: (
        <div className="bg-[#E6EBEC] p-4 rounded-lg rounded-tl-none text-gray-800">
           How can we determine which pipeline stage experiences the greatest drop-off for website leads, and what specific adjustments to our follow-up process would most effectively boost that 8% conversion rate closer to our 12% benchmark?
        </div>
      )
    }
  ]);

  const [inputValue, setInputValue] = useState(initialMessage || "");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputValue
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
    
    // Simulate Chief response
    setTimeout(() => {
       const chiefResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'chief',
        name: 'Chief',
        content: "I'm analyzing the pipeline stages now. Based on current data, the biggest drop-off occurs between 'Demo Scheduled' and 'Proposal Sent' (45% drop). To improve the 8% conversion rate, consider automating follow-ups 24 hours after the demo."
       };
       setMessages(prev => [...prev, chiefResponse]);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      {/* Sidebar - Chat History */}
      <div className="w-[280px] flex flex-col border-r border-[#E6EBEC] bg-white">
        <div className="p-4 flex items-center justify-between border-b border-[#E6EBEC]">
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 bg-teal-900 rounded-lg flex items-center justify-center">
               <Sparkles className="h-5 w-5 text-teal-400" />
             </div>
             <span className="font-semibold text-gray-900">Chief Chat</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pinned Chats</div>
            <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-teal-600 bg-teal-50">
              <div className="h-2 w-2 rounded-full bg-teal-500 mr-2" />
              Sales Forecasting
            </Button>
            <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-50">
              Customer Insight
            </Button>
            <div className="relative group">
               <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-50 bg-gray-100">
                Team Velocity
              </Button>
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            
            <div className="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Folders</div>
             <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-50 gap-2">
               <Folder className="h-4 w-4 text-teal-500" />
               Folder 1
            </Button>
             <Button variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-50 gap-2">
               <Folder className="h-4 w-4 text-teal-500" />
               Folder 2
            </Button>
            
             <div className="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Yesterday</div>
             {['Sales Forecasting', 'Customer Insight', 'Team Velocity'].map((item, i) => (
                <Button key={i} variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {item}
                </Button>
             ))}
             
             <div className="px-3 py-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Past 7 Days</div>
             {['Sales Forecasting', 'Customer Insight', 'Team Velocity'].map((item, i) => (
                <Button key={i} variant="ghost" className="w-full justify-start px-3 py-2 h-auto text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {item}
                </Button>
             ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <div className="h-16 border-b border-[#E6EBEC] flex items-center justify-between px-6 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <h2 className="text-lg font-semibold text-gray-900">Team Velocity</h2>
             {/* Context Badge based on artifact */}
             {contextType && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200">
                   {contextType === 'insight' && <Sparkles className="h-3 w-3 text-teal-600" />}
                   {contextType === 'meeting' && <Zap className="h-3 w-3 text-purple-600" />}
                   {contextType === 'prep' && <Folder className="h-3 w-3 text-blue-600" />}
                   Context: {contextType === 'insight' ? 'Revenue Insight' : contextType === 'meeting' ? 'Meeting Summary' : 'Prep Artifact'}
                </span>
             )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500 gap-2">
               <Share className="h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-500">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
           {/* Context Bubble if starting from an artifact */}
           {initialMessage && (
             <div className="flex justify-end mb-8">
               <div className="bg-gray-100 rounded-2xl rounded-tr-none px-6 py-4 max-w-2xl text-gray-800">
                  <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Context: {contextType}</div>
                  {initialMessage}
               </div>
             </div>
           )}

           {messages.map((msg) => (
             <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
               {msg.sender !== 'user' && (
                 <div className="mt-1">
                   {msg.sender === 'chief' ? (
                      <div className="h-8 w-8 bg-teal-900 rounded-lg flex items-center justify-center">
                        <Image src="/chief-logo.png" alt="Chief" width={20} height={20} className="brightness-0 invert" />
                      </div>
                   ) : (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SD</AvatarFallback>
                      </Avatar>
                   )}
                 </div>
               )}
               
               <div className={`max-w-3xl flex-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                 {msg.sender !== 'user' && (
                   <div className="font-semibold text-gray-900 mb-1">{msg.name}</div>
                 )}
                 <div className={`${msg.sender === 'user' ? 'bg-teal-50 rounded-2xl rounded-tr-none inline-block text-left' : ''}`}>
                    {typeof msg.content === 'string' ? (
                        <div className={msg.sender === 'user' ? "px-4 py-2" : ""}>{msg.content}</div>
                    ) : msg.content}
                 </div>
               </div>
             </div>
           ))}
           <div className="h-24"></div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-8 left-8 right-8 max-w-4xl mx-auto bg-white rounded-2xl border border-[#E6EBEC] shadow-lg p-2 flex flex-col gap-2">
           <input 
             className="w-full px-4 py-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
             placeholder="Ask Chief"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             autoFocus
           />
           <div className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                    <Paperclip className="h-4 w-4" />
                 </Button>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> GPT-4o
                 </span>
                 <Button size="icon" className="h-8 w-8 bg-teal-600 hover:bg-teal-700 rounded-lg" onClick={handleSend}>
                    <Send className="h-4 w-4 text-white" />
                 </Button>
              </div>
           </div>
           <div className="absolute -bottom-6 left-0 right-0 text-center">
              <span className="text-[10px] text-gray-400">Chief can make mistakes. Check important info.</span>
           </div>
        </div>
      </div>
    </div>
  );
}

