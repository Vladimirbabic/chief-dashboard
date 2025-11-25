import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronLeft, 
  Sparkles, 
  ArrowUp,
  Sun,
  ArrowLeft,
  Zap,
  ExternalLink,
  CornerUpLeft
} from "lucide-react";
import Image from "next/image";

interface RevenueGrowthInsightProps {
  onBack: () => void;
  onChatStart?: (message: string) => void;
}

export function RevenueGrowthInsight({ onBack, onChatStart }: RevenueGrowthInsightProps) {
  const [chatInput, setChatInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && chatInput.trim() && onChatStart) {
      onChatStart(chatInput);
    }
  };
  return (
    <div className="flex h-full w-full overflow-hidden bg-[#F2F6F7] p-3 relative">
      {/* Main Content Panel */}
      <div className="flex flex-col w-full h-full bg-white rounded-xl border border-[#E6EBEC] shadow-sm overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center gap-3 border-b border-[#E6EBEC] px-6 py-4 bg-white">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full hover:bg-gray-100 border border-gray-200">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </Button>
          <span className="text-sm text-gray-500 font-medium">Missing Info</span>
          <span className="text-sm font-semibold text-gray-900">Lunaris Labs ($22,640)</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl">
            {/* Insight Overview Section */}
            <div className="bg-white p-8 pb-0">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-950">
                    <Image src="/chief-logo.png" alt="Chief" width={24} height={24} className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Chief</div>
                    <div className="text-xs text-gray-500">Top insights</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Thu, Dec 26, 2024</div>
                  <div className="flex items-center gap-2 justify-end">
                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200 px-2 py-0.5 text-xs font-medium flex items-center gap-1 border-0">
                      <div className="rounded-full bg-teal-700 p-0.5">
                          <ArrowUp className="h-2 w-2 text-white" />
                      </div>
                      +$100,000
                    </Badge>
                    <Badge variant="secondary" className="bg-white border border-gray-200 text-gray-700 px-2 py-0.5 text-xs font-medium shadow-sm">
                      12 Deals
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Large Metric */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">$485K</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-[2px] bg-blue-700"></div>
                      <span className="text-xs font-medium text-gray-600">Forcast</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                      <div className="w-3 h-3 rounded-[2px] bg-teal-500"></div>
                      <span className="text-xs font-medium text-gray-600">Improvement</span>
                  </div>
                </div>
              </div>

              {/* Line Graph */}
              <div className="mt-8 relative">
                <div className="h-64 relative w-full">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[11px] font-medium text-gray-400 pr-2 h-[85%]">
                    <span>$250k</span>
                    <span>$200k</span>
                    <span>$150k</span>
                    <span>$100k</span>
                    <span>$50k</span>
                    <span>$0k</span>
                  </div>
                  
                  {/* Graph area */}
                  <div className="ml-10 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between h-[85%]">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="border-t border-gray-100 border-dashed"></div>
                      ))}
                    </div>
                    
                    {/* Graph lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                           <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.2" />
                           <stop offset="50%" stopColor="#e879f9" stopOpacity="0.1" />
                           <stop offset="100%" stopColor="#f0abfc" stopOpacity="0.05" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      
                      {/* Fill Area - Complex polygon to match the visual "step" up */}
                      <path 
                        d="
                          M 0 212
                          L 180 212
                          L 220 170
                          L 300 170
                          L 340 127 
                          L 440 127
                          L 500 85
                          L 600 42
                          L 600 127
                          L 500 127
                          L 440 170
                          L 340 170
                          L 300 212
                          L 0 212
                          Z
                        "
                        fill="url(#chartGradient)"
                      />
                      
                      {/* Blue line (Forecast) - Bottom line */}
                      <path
                        d="
                          M 0 212 
                          L 280 212 
                          L 320 170 
                          L 420 170
                          L 460 127
                          L 600 127
                        "
                        fill="none"
                        stroke="#1e40af" 
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                       {/* Dot on Blue Line end */}
                       <circle cx="600" cy="127" r="4" fill="#1e40af" stroke="white" strokeWidth="2" />

                      {/* Teal line (Improvement) - Top line */}
                      <path
                        d="
                          M 180 212
                          L 220 170
                          L 300 170
                          L 340 127 
                          L 440 127
                          L 500 85
                          L 600 42
                        "
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Dot on Teal Line end */}
                      <circle cx="600" cy="42" r="4" fill="#14b8a6" stroke="white" strokeWidth="2" />
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-between text-xs text-gray-500 px-10">
                      <span>October</span>
                      <span>November</span>
                      <span>December</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight Details */}
            <div className="p-8 pt-0 space-y-8">
              {/* INSIGHT Section */}
              <div className="flex gap-5 relative">
                 {/* Left Border Line */}
                <div className="absolute left-[11px] top-8 bottom-[-20px] w-[2px] bg-purple-100"></div>
                
                <div className="relative z-10">
                   <Sun className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 space-y-2 pt-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">INSIGHT</h3>
                  </div>
                  <div className="border-l-[3px] border-purple-300 pl-4 py-1">
                      <p className="text-gray-900 font-medium text-[15px] leading-relaxed mb-2">
                      This deal is missing a champion and next step — two key fields for commit readiness.
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                      Deals missing these details are 40% less likely to close and often reduce forecast accuracy.
                      </p>
                  </div>
                </div>
              </div>

              {/* DIRECTION Section */}
              <div className="flex gap-5 relative">
                  {/* Left Border Line */}
                <div className="absolute left-[11px] top-8 bottom-[-20px] w-[2px] bg-purple-100"></div>

                <div className="relative z-10">
                    <CornerUpLeft className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 space-y-2 pt-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">DIRECTION</h3>
                  </div>
                  <div className="border-l-[3px] border-purple-300 pl-4 py-1">
                      <p className="text-gray-900 font-medium text-[15px] leading-relaxed">
                      Complete the missing fields so the deal stays in your active forecast.
                      </p>
                  </div>
                </div>
              </div>

              {/* ACTION Section */}
              <div className="flex gap-5">
                <div className="relative z-10">
                    <Zap className="h-6 w-6 text-teal-500 fill-teal-500" />
                </div>
                <div className="flex-1 space-y-4 pt-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xs font-bold text-teal-500 uppercase tracking-widest">ACTION</h3>
                  </div>
                  <div className="border-l-[3px] border-teal-400 pl-4 py-1">
                      <p className="text-gray-900 font-medium text-[15px] leading-relaxed mb-4">
                      Chief added placeholders for Champion and Next Step and highlighted them for your input in the deal record.
                      </p>
                      
                      {/* HubSpot Integration Card */}
                      <div className="bg-gray-50/80 rounded-xl border border-gray-200 overflow-hidden">
                          <div className="p-4 pb-3">
                              <div className="flex items-center gap-2 mb-3">
                                  <div className="h-5 w-5 bg-[#ff5c35] rounded-[4px] flex items-center justify-center">
                                  <span className="text-white text-[10px] font-bold">hub</span>
                                  </div>
                                  <span className="font-semibold text-gray-700 text-sm">HubSpot</span>
                              </div>
                              <div className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                                  <div className="text-sm text-gray-600 mb-2 font-medium">
                                      Added two Tags:
                                  </div>
                                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-1">
                                      <li>Champion</li>
                                      <li>Next Step</li>
                                  </ul>
                              </div>
                          </div>
                          <div className="px-4 pb-4 pt-0">
                              <Button 
                                  variant="outline" 
                                  className="w-fit h-8 bg-white text-xs font-medium border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                              >
                                  Open in Hubspot
                              </Button>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Input Spacer */}
            <div className="h-[200px]"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-8 py-4 bg-gradient-to-t from-white via-white to-transparent z-10">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-xl border border-[#E6EBEC] p-3 bg-white shadow-sm">
                <div className="mb-1 text-xs font-medium text-gray-500">
                  Ask: <span className="text-gray-900">Chief</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Ask Chief about this insight" 
                  className="w-full bg-transparent outline-none placeholder:text-gray-400 text-sm"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                Chief pulled most recent data at 1:23 am Yesterday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
