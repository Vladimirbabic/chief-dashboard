import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  Sparkles, 
  ArrowUp,
  Clock,
  CheckSquare,
  Mail,
  Send
} from "lucide-react";
import Image from "next/image";
import { ChiefChatPopup } from "./ChiefChatPopup";

interface MeetingSummaryProps {
  onBack: () => void;
  isPanel?: boolean;
  onChatStart?: (message: string) => void;
}

export function MeetingSummary({ onBack, isPanel = false, onChatStart }: MeetingSummaryProps) {
  const [showSummaryTemplates, setShowSummaryTemplates] = useState(false);
  const [showEmailTemplates, setShowEmailTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'followup' | 'updates' | 'snapshots' | 'clips'>('transcript');
  const [chatInput, setChatInput] = useState("");
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && chatInput.trim()) {
      setInitialChatMessage(chatInput);
      setShowChatPopup(true);
      setChatInput("");
    }
  };

  const handleViewFullChat = () => {
    setShowChatPopup(false);
    if (onChatStart) {
      onChatStart(initialChatMessage);
    }
  };
  
  const [isRegeneratingSummary, setIsRegeneratingSummary] = useState(false);
  const [isRegeneratingEmail, setIsRegeneratingEmail] = useState(false);
  
  const [selectedSummaryTemplate, setSelectedSummaryTemplate] = useState('Auto AI');
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState('Standard Follow-up');

  const [summaryContent, setSummaryContent] = useState({
    overview: "The team discussed Chief's competitive positioning as an actionable insight layer rather than just forecasting. Key differentiation: 'Forecasting tools tell you what might happen, Chief tells you what you can do today to change it'. Positioned as a complement to Gong/Clari that adds an insight layer.",
    keyPoints: [
      "Chief's competitive positioning: 'Forecasting tools tell you what might happen, Chief tells you what you can do today to change it'",
      "Focus on actionable insights at deal level rather than broad forecasting",
      "Integration approach with existing tools (GONG, Clary) rather than competition",
      "Position as complement that adds insight layer: 'Giving every rep a personal RevOps analyst'",
      "Seven critical insights identified for initial focus (Activity, Stalling, Close date, etc.)"
    ],
    status: "The team has defined the core insight engine framework and dashboard UI concept. Immediate focus is on delivering initial screens and setting up recurring design collaboration meetings.",
    actionItems: [
      "Vlad: Deliver initial dashboard screens by tomorrow",
      "Bret: Set up recurring design collaboration meetings (3 sessions/week)",
      "Engineering: Perfect the seven core insights before expanding features",
      "Demo: Build React prototype for investor presentations"
    ]
  });

  const [emailContent, setEmailContent] = useState({
    subject: "Meeting Recap: Chief Dashboard Design Strategy",
    body: `Hi Team,\n\nThanks for the productive session today. We've aligned on Chief's core positioning as an actionable insight layer ("Personal RevOps Analyst") rather than just another forecasting tool.\n\nWe agreed to focus on the 7 critical insights and integrate with existing tools like Gong and Clari.\n\nNext steps:\n- Vlad to deliver initial screens tomorrow\n- Bret to schedule design reviews\n- Engineering to focus on core insights\n\nBest,\nVlad`
  });

  const handleSummaryTemplateSelect = (template: string) => {
    setSelectedSummaryTemplate(template);
    setShowSummaryTemplates(false);
    setIsRegeneratingSummary(true);

    setTimeout(() => {
      setIsRegeneratingSummary(false);
      
      if (template === 'Auto AI' || template === 'Standard Summary') {
        setSummaryContent({
            overview: "The team discussed Chief's competitive positioning as an actionable insight layer rather than just forecasting. Key differentiation: 'Forecasting tools tell you what might happen, Chief tells you what you can do today to change it'. Positioned as a complement to Gong/Clari that adds an insight layer.",
            keyPoints: [
              "Chief's competitive positioning: 'Forecasting tools tell you what might happen, Chief tells you what you can do today to change it'",
              "Focus on actionable insights at deal level rather than broad forecasting",
              "Integration approach with existing tools (GONG, Clary) rather than competition",
              "Position as complement that adds insight layer: 'Giving every rep a personal RevOps analyst'",
              "Seven critical insights identified for initial focus (Activity, Stalling, Close date, etc.)"
            ],
            status: "The team has defined the core insight engine framework and dashboard UI concept. Immediate focus is on delivering initial screens and setting up recurring design collaboration meetings.",
            actionItems: [
              "Vlad: Deliver initial dashboard screens by tomorrow",
              "Bret: Set up recurring design collaboration meetings (3 sessions/week)",
              "Engineering: Perfect the seven core insights before expanding features",
              "Demo: Build React prototype for investor presentations"
            ]
        });
      } else if (template === 'Action-Oriented') {
        setSummaryContent({
            overview: "ACTION REQUIRED: Immediate alignment on Chief's actionable insight positioning. We must differentiate from passive forecasting tools by providing day-to-day actionable value.",
            keyPoints: [
                "URGENT: Define the 7 critical insights",
                "STRATEGY: Complement Gong/Clari, do not compete",
                "GOAL: Empower reps with a 'Personal RevOps Analyst'"
            ],
            status: "Design and Engineering phases initiated. Strict timeline for investor demo.",
            actionItems: [
                "Vlad: PRIORITY - Initial dashboard screens due tomorrow",
                "Bret: Schedule 3x/week design syncs immediately",
                "Engineering: Block all non-core insight work",
                "Team: Prepare React prototype for demo"
            ]
        });
      } else if (template === 'Executive Brief') {
        setSummaryContent({
            overview: "Strategic decision made to position Chief as an 'Actionable Insight Layer' atop existing stacks (Gong/Clari). This 'Personal RevOps Analyst' approach addresses the gap between forecasting and action.",
            keyPoints: [
                "Value Prop: Actionability > Forecasting",
                "Market Fit: Complementary integration strategy",
                "Product Focus: 7 core insight indicators"
            ],
            status: "Product definition complete. Moving to execution phase for investor prototype.",
            actionItems: [
                "Design: deliver initial concepts",
                "Engineering: execute core logic",
                "Management: oversee design cadence"
            ]
        });
      }
    }, 1500);
  };

  const handleEmailTemplateSelect = (template: string) => {
    setSelectedEmailTemplate(template);
    setShowEmailTemplates(false);
    setIsRegeneratingEmail(true);

    setTimeout(() => {
      setIsRegeneratingEmail(false);
      
      if (template === 'Standard Follow-up') {
        setEmailContent({
            subject: "Meeting Recap: Chief Dashboard Design Strategy",
            body: `Hi Team,\n\nThanks for the productive session today. We've aligned on Chief's core positioning as an actionable insight layer ("Personal RevOps Analyst") rather than just another forecasting tool.\n\nWe agreed to focus on the 7 critical insights and integrate with existing tools like Gong and Clari.\n\nNext steps:\n- Vlad to deliver initial screens tomorrow\n- Bret to schedule design reviews\n- Engineering to focus on core insights\n\nBest,\nVlad`
        });
      } else if (template === 'Recap & Next Steps') {
        setEmailContent({
            subject: "Action Items: Dashboard Strategy",
            body: `Team,\n\nHere are the key takeaways and action items from our strategy session:\n\nDECISIONS:\n- Positioning: Actionable Insights vs Forecasting\n- Integration: Gong/Clari complement\n\nACTION ITEMS:\n1. [Vlad] Dashboard screens due tomorrow\n2. [Bret] Setup design cadence (3x/week)\n3. [Eng] Build 7 core insights\n\nLet's move fast on this.\n\nThanks,\nVlad`
        });
      } else if (template === 'Investor Update') {
        setEmailContent({
            subject: "Progress Update: Chief Product Strategy",
            body: `Hi All,\n\nWe made significant progress on the product definition today. We have locked in the "Personal RevOps Analyst" positioning and the core insight framework.\n\nThe team is now moving to build the initial React prototype for the upcoming investor presentations.\n\nTimeline: Initial designs tomorrow, prototype to follow.\n\nRegards,\nVlad`
        });
      }
    }, 1500);
  };

  return (
    <div className={`flex h-full w-full overflow-hidden relative ${isPanel ? '' : 'bg-[#F2F6F7] p-3'}`}>
      <div className="flex flex-col w-full h-full bg-white rounded-xl border border-[#E6EBEC] shadow-sm overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center gap-4 border-b border-[#E6EBEC] px-6 py-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full hover:bg-gray-100 border border-gray-200">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">Int Chief Daily: Standup Prod & Eng</h1>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
              <span>Today 9:00 – 9:30pm</span>
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">6 hours ago</span>
              <div className="flex items-center gap-1 ml-2">
                <div className="flex -space-x-1.5">
                  <Avatar className="h-4 w-4 border border-white">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-4 w-4 border border-white">
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </div>
                <span>Sam Daw +8</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Column - Summary - 65% */}
          <div className="flex-[0_0_65%] overflow-y-auto border-r border-[#E6EBEC]">
            <div className="px-16 py-8">
              <div className="flex items-center justify-between mb-8 relative">
                <h2 className="text-2xl font-semibold text-gray-900">Meeting Summary</h2>
                <div className="relative">
                  <button 
                    className="flex items-center justify-center gap-2 px-3 py-1.5 h-8 bg-white border border-[#E6EBEC] rounded-[20px] shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(16,24,40,0.1)] hover:bg-gray-50 transition-colors"
                    onClick={() => setShowSummaryTemplates(!showSummaryTemplates)}
                  >
                    <Sparkles className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium text-gray-900">{selectedSummaryTemplate}</span>
                    <ChevronLeft className="h-3 w-3 text-gray-500 -rotate-90" />
                  </button>

                  {/* Summary Template Dropdown */}
                  {showSummaryTemplates && (
                    <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-xl border border-[#E6EBEC] shadow-lg z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between px-3 py-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">Summary Templates</span>
                      </div>
                      <div className="space-y-1">
                        <button 
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-lg text-left"
                          onClick={() => handleSummaryTemplateSelect('Standard Summary')}
                        >
                          <Sparkles className="h-4 w-4 text-teal-600" />
                          Standard Summary
                        </button>
                        <button 
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                          onClick={() => handleSummaryTemplateSelect('Action-Oriented')}
                        >
                          Action-Oriented
                        </button>
                        <button 
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                          onClick={() => handleSummaryTemplateSelect('Executive Brief')}
                        >
                          Executive Brief
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isRegeneratingSummary ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-70">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
                    <p className="text-sm font-medium text-gray-500 animate-pulse">Generating new summary...</p>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <section>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Overview</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {summaryContent.overview}
                    </p>
                    </section>

                    <section>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {summaryContent.keyPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                    </section>

                    <section>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Status</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {summaryContent.status}
                    </p>
                    </section>

                    <section>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Action Items</h3>
                    <div className="space-y-3">
                        {summaryContent.actionItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 h-4 w-4 rounded border border-gray-300 shrink-0 cursor-pointer hover:border-gray-400" />
                            <span className="text-gray-600">{item}</span>
                        </div>
                        ))}
                    </div>
                    </section>
                </div>
              )}
              {/* Spacer for bottom padding */}
              <div className="h-[200px]"></div>
            </div>
          </div>

          {/* Right Column - Transcript/Follow up/Updates - 35% */}
          <div className="flex-[0_0_35%] flex flex-col bg-gray-50/50">
            <div className="flex items-center gap-1 border-b border-[#E6EBEC] px-4 py-3 bg-white overflow-x-auto">
              <button 
                className={`h-8 px-3 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === 'followup' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setActiveTab('followup')}
              >
                Follow up
              </button>
              <button 
                className={`h-8 px-3 text-sm font-medium rounded-full transition-colors flex items-center gap-1 whitespace-nowrap ${activeTab === 'updates' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setActiveTab('updates')}
              >
                Updates
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-700">2</span>
              </button>
              <button 
                className={`h-8 px-3 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === 'snapshots' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setActiveTab('snapshots')}
              >
                Snapshots
              </button>
              <button 
                className={`h-8 px-3 text-sm font-medium rounded-full transition-colors flex items-center gap-1 whitespace-nowrap ${activeTab === 'clips' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setActiveTab('clips')}
              >
                Clips
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-[10px] font-bold text-purple-700">5</span>
              </button>
              <button 
                className={`h-8 px-3 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTab === 'transcript' ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
                onClick={() => setActiveTab('transcript')}
              >
                Transcript
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'transcript' && (
                <div className="space-y-6">
                  {/* Chat Item 1 */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">Darrell Steward</span>
                        <span className="text-xs text-gray-400">03/15 - 10:00 AM</span>
                      </div>
                      <div className="rounded-lg rounded-tl-none border border-gray-200 bg-white p-3 text-sm text-gray-600 shadow-sm">
                        Okay team, let's kick off the brainstorm for the LLM reliability one-pager. What's the core message we want to convey to our clients?
                      </div>
                    </div>
                  </div>

                  {/* Chat Item 2 */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">Jon Daniels</span>
                        <span className="text-xs text-gray-400">03/15 - 10:15 AM</span>
                      </div>
                      <div className="rounded-lg rounded-tl-none border border-gray-200 bg-white p-3 text-sm text-gray-600 shadow-sm">
                        We should lead with how we define and measure reliability. It's not just about uptime, but the factual accuracy and consistency of the output.
                      </div>
                    </div>
                  </div>

                  {/* Chat Item 3 */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://github.com/nextjs.png" />
                      <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">Savannah Nguyen</span>
                        <span className="text-xs text-gray-400">03/15 - 10:30 AM</span>
                      </div>
                      <div className="rounded-lg rounded-tl-none border border-gray-200 bg-white p-3 text-sm text-gray-600 shadow-sm">
                        Exactly. We need to highlight our RAG framework. It's the strongest proof point for grounding responses in verified data, which builds trust.
                      </div>
                    </div>
                  </div>

                  {/* Chat Item 4 */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">Jane Cooper</span>
                        <span className="text-xs text-gray-400">03/15 - 10:45 AM</span>
                      </div>
                      <div className="rounded-lg rounded-tl-none border border-gray-200 bg-white p-3 text-sm text-gray-600 shadow-sm">
                        Great point, Chloe. How do we simplify the concept of Retrieval-Augmented Generation for a non-technical audience on a single page?
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Item 5 */}
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">Jon Daniels</span>
                        <span className="text-xs text-gray-400">03/15 - 11:00 AM</span>
                      </div>
                      <div className="rounded-lg rounded-tl-none border border-gray-200 bg-white p-3 text-sm text-gray-600 shadow-sm">
                        How about a simple three-step graphic? 1. Query Analysis, 2. Secure Data Retrieval, 3. Verified Response Generation. Keep it high-level.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'followup' && (
                <div className="space-y-4">
                  {/* Follow-up Email Card */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#E6EBEC] bg-gray-50/50">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">Follow-up Email</span>
                      </div>
                      
                      {/* Email Template Auto AI Dropdown */}
                      <div className="relative">
                        <button 
                          className="flex items-center justify-center gap-2 px-3 py-1 h-7 bg-white border border-[#E6EBEC] rounded-[20px] shadow-sm hover:bg-gray-50 transition-colors"
                          onClick={() => setShowEmailTemplates(!showEmailTemplates)}
                        >
                          <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                          <span className="text-xs font-medium text-gray-900">{selectedEmailTemplate}</span>
                          <ChevronLeft className="h-3 w-3 text-gray-500 -rotate-90" />
                        </button>

                         {/* Email Template Dropdown */}
                         {showEmailTemplates && (
                            <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-xl border border-[#E6EBEC] shadow-lg z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                              <div className="flex items-center justify-between px-3 py-2 mb-1">
                                <span className="text-sm font-semibold text-gray-900">Email Templates</span>
                              </div>
                              <div className="space-y-1">
                                <button 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-lg text-left"
                                  onClick={() => handleEmailTemplateSelect('Standard Follow-up')}
                                >
                                  <Sparkles className="h-4 w-4 text-teal-600" />
                                  Standard Follow-up
                                </button>
                                <button 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                                  onClick={() => handleEmailTemplateSelect('Recap & Next Steps')}
                                >
                                  Recap & Next Steps
                                </button>
                                <button 
                                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg text-left"
                                  onClick={() => handleEmailTemplateSelect('Investor Update')}
                                >
                                  Investor Update
                                </button>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                    
                    {isRegeneratingEmail ? (
                      <div className="p-8 flex flex-col items-center justify-center space-y-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                        <p className="text-sm text-gray-500 animate-pulse">Rewriting email...</p>
                      </div>
                    ) : (
                      <div className="p-4 space-y-4 animate-in fade-in duration-300">
                        <div>
                          <label className="text-xs font-medium text-gray-500 mb-1 block">Subject</label>
                          <input 
                            type="text" 
                            value={emailContent.subject}
                            className="w-full text-sm text-gray-900 font-medium bg-transparent border-b border-gray-200 pb-2 outline-none focus:border-teal-600"
                            readOnly
                          />
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-500 mb-2 block">Body</label>
                          <div className="text-sm text-gray-900 whitespace-pre-line">
                            {emailContent.body}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 h-8 text-xs"
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm"
                            className="flex-1 h-8 text-xs bg-teal-600 hover:bg-teal-700 text-white"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Send Email
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'updates' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-900">Updates</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 text-xs text-teal-600 border-teal-200 hover:bg-teal-50"
                    >
                      Approve All
                    </Button>
                  </div>

                  {/* Update Item 1 */}
                  <div className="bg-white rounded-lg border border-[#E6EBEC] p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">Change stage in HubSpot</p>
                        <p className="text-xs text-gray-600">Update the stage from <span className="font-medium">Prospecting</span> to <span className="font-medium">Demo</span></p>
                      </div>
                      <div className="h-4 w-4 rounded border border-gray-300 shrink-0 cursor-pointer hover:border-teal-600 hover:bg-teal-50" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600 hover:text-gray-900">
                        Dismiss
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700 text-white">
                        Approve
                      </Button>
                    </div>
                  </div>

                  {/* Update Item 2 */}
                  <div className="bg-white rounded-lg border border-[#E6EBEC] p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">Push summary to HubSpot</p>
                        <p className="text-xs text-gray-600">Add meeting summary and notes to the deal record</p>
                      </div>
                      <div className="h-4 w-4 rounded border border-gray-300 shrink-0 cursor-pointer hover:border-teal-600 hover:bg-teal-50" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600 hover:text-gray-900">
                        Dismiss
                      </Button>
                      <Button size="sm" className="h-7 text-xs bg-teal-600 hover:bg-teal-700 text-white">
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'snapshots' && (
                <div className="space-y-6 pb-8">
                  {/* Key Moments */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Key Moments From This Call</h3>
                    <p className="text-sm text-gray-500 mb-4">We pulled the most important moments from your call for quick review:</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                          <span className="text-lg">💬</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">Pricing Discussion</span>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">00:12:15</span>
                          </div>
                          <p className="text-sm text-gray-600">Customer asked about enterprise tier options and volume discounts.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                          <span className="text-lg">⭐</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">Feature Request</span>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">00:24:30</span>
                          </div>
                          <p className="text-sm text-gray-600">Strong interest in Jira integration. Added to product wish list.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                          <span className="text-lg text-teal-600">✓</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">Next Steps Agreed</span>
                            <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">00:41:10</span>
                          </div>
                          <p className="text-sm text-gray-600">You agreed to send the proposal by Friday EOD.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Snapshot */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sentiment Snapshot</h3>
                    <p className="text-sm text-gray-500 mb-4">Here is the emotional tone breakdown from your latest call:</p>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-teal-50 rounded-xl p-4 text-center border-2 border-teal-100">
                        <div className="text-2xl mb-1">😊</div>
                        <div className="font-semibold text-teal-700">Positive</div>
                        <div className="text-xs text-gray-500 mt-1">Customer</div>
                      </div>
                      <div className="bg-teal-50 rounded-xl p-4 text-center border-2 border-teal-100">
                        <div className="text-2xl mb-1">😐</div>
                        <div className="font-semibold text-teal-700">Neutral</div>
                        <div className="text-xs text-gray-500 mt-1">You (Rep)</div>
                      </div>
                      <div className="bg-teal-50 rounded-xl p-4 text-center border-2 border-teal-100">
                        <div className="text-2xl mb-1">↑</div>
                        <div className="font-semibold text-teal-700">Improving</div>
                        <div className="text-xs text-gray-500 mt-1">vs Last Call</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Positive sentiment peaked during the roadmap discussion.</p>
                  </div>

                  {/* Question-to-Answer Ratio */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Question-to-Answer Ratio</h3>
                    <p className="text-sm text-gray-500 mb-4">Good discovery relies on asking the right amount of questions. Here is your ratio:</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-center gap-8 text-sm font-semibold text-gray-700 mb-2">
                        <span>You Asked</span>
                        <span>You Answered</span>
                      </div>
                      <div className="flex h-12 rounded-lg overflow-hidden">
                        <div className="bg-purple-400 flex-[60] flex items-center justify-center">
                          <span className="text-xl font-bold text-white">12</span>
                        </div>
                        <div className="bg-purple-200 flex-[40] flex items-center justify-center">
                          <span className="text-xl font-bold text-purple-600">8</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>60% Discovery</span>
                        <span>40% Education</span>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-700"><span className="font-semibold">Ideal Benchmark:</span> Top performers ask 10-15 questions per discovery call. You are in the green zone!</p>
                    </div>
                  </div>

                  {/* Speaking Pace Analysis */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Speaking Pace Analysis</h3>
                    <p className="text-sm text-gray-500 mb-4">We noticed a significant change in your speaking pace during this call:</p>
                    
                    <div className="mb-4">
                      <div className="h-3 rounded-full bg-gradient-to-r from-teal-400 via-green-400 via-yellow-300 to-red-300 relative">
                        <div className="absolute right-[15%] top-0 w-0.5 h-full bg-gray-800"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>SLOW</span>
                        <span>OPTIMAL</span>
                        <span>FAST</span>
                      </div>
                    </div>
                    
                    <div className="text-center mb-3">
                      <span className="text-4xl font-bold text-orange-400">180</span>
                      <span className="text-lg text-gray-500 ml-1">wpm</span>
                      <div className="inline-block ml-2 bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded">
                        +24% faster than your average
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 text-center">Fast pacing can sometimes reduce clarity. Try to slow down during technical explanations.</p>
                  </div>

                  {/* Long Monologue Detected */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Long Monologue Detected</h3>
                    <p className="text-sm text-gray-500 mb-4">We detected an extended monologue where you spoke for nearly a minute without pause:</p>
                    
                    <div className="bg-gray-800 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                            <span className="text-sm">🎙️</span>
                          </div>
                          <div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">DURATION</div>
                            <div className="text-teal-400 font-semibold">52 Seconds</div>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-gray-400">00:08:22</span>
                      </div>
                      
                      <div className="h-px bg-gray-700 mb-3"></div>
                      
                      <div className="flex items-end gap-0.5 h-8 mb-3">
                        {[3, 5, 3, 6, 4, 7, 9, 5, 6, 4, 7, 5, 3, 6, 8, 4, 5, 7, 3, 5].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 rounded-sm" 
                            style={{ 
                              height: `${h * 10}%`, 
                              backgroundColor: h > 6 ? '#D97756' : h > 4 ? '#C9A87C' : '#8B7355' 
                            }}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-300 italic">"...and that basically covers the entire architecture of the platform which I know is a lot to take in but essentially..."</p>
                    </div>
                    
                    <p className="text-sm text-gray-500 text-center mt-4">Shorter turns (under 30s) improve engagement. Try ending with a check-in question.</p>
                  </div>

                  {/* Customer Engagement Heatmap */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Engagement Heatmap</h3>
                    <p className="text-sm text-gray-500 mb-4">This heatmap shows where your customer was most engaged during the call:</p>
                    
                    <div className="relative mb-4">
                      <div className="h-20 rounded-lg bg-gradient-to-r from-orange-200 via-orange-300 to-purple-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" style={{ left: '25%', width: '30%' }}></div>
                        <div className="absolute top-1/2 left-[40%] -translate-y-1/2 bg-white px-2 py-1 rounded text-xs font-medium text-gray-700 shadow-sm">
                          Peak Interest
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>00:00</span>
                        <span>15:00</span>
                        <span>30:00</span>
                        <span>45:00</span>
                        <span>60:00</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                        <span className="font-medium text-gray-900">High Engagement:</span>
                        <span className="text-gray-600">Product Demo (18:00 - 24:00)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-purple-200"></div>
                        <span className="font-medium text-gray-900">Low Engagement:</span>
                        <span className="text-gray-600">Company Overview (02:00 - 08:00)</span>
                      </div>
                    </div>
                  </div>

                  {/* Topic Breakdown Report */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Topic Breakdown Report</h3>
                    <p className="text-sm text-gray-500 mb-4">Here is how your time was distributed across key topics:</p>
                    
                    <div className="flex justify-center mb-4">
                      <div className="relative w-40 h-40">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#C4B5FD" strokeWidth="4" strokeDasharray="26.4 100" strokeDashoffset="0" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#34D399" strokeWidth="4" strokeDasharray="21.1 100" strokeDashoffset="-26.4" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#FDE047" strokeWidth="4" strokeDasharray="15.8 100" strokeDashoffset="-47.5" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#DDD6FE" strokeWidth="4" strokeDasharray="14.1 100" strokeDashoffset="-63.3" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#FCA5A5" strokeWidth="4" strokeDasharray="10.6 100" strokeDashoffset="-77.4" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">TOPICS</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                        <span className="text-gray-700">Product (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <span className="text-gray-700">Pricing (24%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                        <span className="text-gray-700">Timeline (18%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-200"></div>
                        <span className="text-gray-700">Discovery (16%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-300"></div>
                        <span className="text-gray-700">Objections (12%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Commitments */}
                  <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Commitments Identified</h3>
                    <p className="text-sm text-gray-500 mb-4">Confirming these agreements in writing will increase deal velocity:</p>
                    
                    <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <span className="text-2xl">🤝</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-teal-700">1</span>
                          </div>
                          <div>
                            <p className="font-semibold text-teal-800">Sandbox Access</p>
                            <p className="text-sm text-gray-600 italic">"Yes, we can provide access to the sandbox."</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-teal-700">2</span>
                          </div>
                          <div>
                            <p className="font-semibold text-teal-800">Compliance Docs</p>
                            <p className="text-sm text-gray-600 italic">"I'll send you the compliance docs by EOD."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'clips' && (
                <div className="space-y-4 pb-8">
                  {/* Video Player Placeholder */}
                  <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-white/30 transition-colors">
                          <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                        </div>
                        <p className="text-white/60 text-sm">Click to play recording</p>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-2 mb-2 text-white text-xs">
                        <span className="bg-black/40 px-2 py-0.5 rounded">4:56 · Introduction</span>
                        <div className="flex-1"></div>
                        <span>30:54</span>
                      </div>
                      <div className="h-1 bg-gray-600 rounded-full">
                        <div className="h-full w-[16%] bg-teal-400 rounded-full relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-teal-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 text-white">
                          <button className="hover:text-teal-400">🔊</button>
                          <button className="text-xs font-medium">1x</button>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                          <button className="hover:text-teal-400">⏪</button>
                          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">⏸</button>
                          <button className="hover:text-teal-400">⏩</button>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                          <button className="hover:text-teal-400">⬜</button>
                          <button className="hover:text-teal-400">⛶</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speakers Timeline */}
                  <div className="space-y-3">
                    {/* Speaker 1 */}
                    <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="font-medium text-gray-900 text-sm">Lina Morris</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 text-sm">Grain</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">52%</span> · 16 min
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full flex gap-0.5 overflow-hidden">
                        {[1,0,1,1,0,1,0,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,0,1].map((active, i) => (
                          <div key={i} className={`flex-1 rounded-sm ${active ? 'bg-purple-400' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>

                    {/* Speaker 2 */}
                    <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="font-medium text-gray-900 text-sm">Alex Stoutenburgh</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 text-sm">Quest.io</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">48%</span> · 14 min
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full flex gap-0.5 overflow-hidden">
                        {[0,1,0,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0].map((active, i) => (
                          <div key={i} className={`flex-1 rounded-sm ${active ? 'bg-cyan-400' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>

                    {/* Screenshare */}
                    <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="font-medium text-gray-900 text-sm">Screenshare</span>
                        </div>
                        <div className="text-sm text-gray-500">12 min</div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full flex gap-0.5 overflow-hidden">
                        {[0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0].map((active, i) => (
                          <div key={i} className={`flex-1 rounded-sm ${active ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>

                    {/* Comments */}
                    <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="font-medium text-gray-900 text-sm">Comments</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <span>5</span>
                          <ChevronLeft className="h-4 w-4 -rotate-180" />
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full flex gap-0.5 overflow-hidden">
                        {[0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0].map((active, i) => (
                          <div key={i} className={`flex-1 rounded-sm ${active ? 'bg-gray-500' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>

                    {/* Clips */}
                    <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="font-medium text-gray-900 text-sm">Clips</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <span>5</span>
                          <ChevronLeft className="h-4 w-4 -rotate-180" />
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full flex gap-0.5 overflow-hidden">
                        {[0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1].map((active, i) => (
                          <div key={i} className={`flex-1 rounded-sm ${active ? 'bg-gray-500' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Saved Clips Section */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Saved Clips</h4>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-purple-600 text-xs">▶</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Pricing objection handling</p>
                            <p className="text-xs text-gray-500">00:12:15 · 45 sec</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-purple-600 text-xs">▶</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Feature demo - Dashboard</p>
                            <p className="text-xs text-gray-500">00:18:30 · 2 min</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-purple-600 text-xs">▶</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Integration requirements</p>
                            <p className="text-xs text-gray-500">00:24:45 · 1 min</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-purple-600 text-xs">▶</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Next steps agreement</p>
                            <p className="text-xs text-gray-500">00:41:10 · 30 sec</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-[#E6EBEC] p-3 cursor-pointer hover:border-teal-300 hover:bg-teal-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center shrink-0">
                            <span className="text-purple-600 text-xs">▶</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Customer success story mention</p>
                            <p className="text-xs text-gray-500">00:28:00 · 1 min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Input - Sticky at bottom of left column */}
        {!showChatPopup && (
          <div className="absolute bottom-0 left-0 w-[65%] px-16 py-4 bg-gradient-to-t from-white via-white to-transparent z-10">
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
                  placeholder="Ask Chief about this call" 
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
        )}

        {/* Chat Popup */}
        <ChiefChatPopup 
          isOpen={showChatPopup}
          onClose={() => setShowChatPopup(false)}
          onViewFullChat={handleViewFullChat}
          initialMessage={initialChatMessage}
          contextTitle="this meeting summary"
        />
      </div>
    </div>
  );
}
