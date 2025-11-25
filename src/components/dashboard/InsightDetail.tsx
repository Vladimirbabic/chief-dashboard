import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send, 
  Mail, 
  Calendar, 
  Database,
  ArrowLeft
} from "lucide-react";
import Image from "next/image";
import { ChiefChatPopup } from "./ChiefChatPopup";

interface InsightDetailProps {
  onBack: () => void;
  onChatStart?: (message: string) => void;
}

export function InsightDetail({ onBack, onChatStart }: InsightDetailProps) {
  const [showReasoning, setShowReasoning] = useState(false);
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

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#F2F6F7] p-3 relative">
      {/* Main Content Panel */}
      <div className={`flex flex-col w-full h-full bg-white rounded-xl border border-[#E6EBEC] shadow-sm transition-all duration-500 ease-in-out ${showReasoning ? 'mr-[400px]' : ''}`}>
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-[#E6EBEC] px-8 py-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <Image src="/chief-logo.png" alt="Chief" width={24} height={24} className="h-6 w-6" />
          <h1 className="text-xl font-medium text-gray-900">
            Chief drafted an email for you: <span className="font-bold">Following Up on Our Conversation</span>
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-3xl space-y-8">
            {/* Chief Message */}
            <div className="flex gap-4">
              <Image src="/chief-logo.png" alt="Chief Intelligence" width={40} height={40} className="h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Chief</span>
                  <span className="text-sm text-gray-500">Thu, Dec 26, 2024</span>
                </div>
                <div className="space-y-4 text-gray-900">
                  <p>Hi Jon,</p>
                  <p>Sarah's email has been waiting for your reply for 12 hours. I drafted a quick response you can review and send.</p>
                </div>
              </div>
            </div>

            {/* Incoming Email Card */}
            <div className="ml-[56px] overflow-hidden rounded-xl border border-purple-100 bg-purple-50/50">
              <div className="flex items-center gap-3 border-b border-purple-100 px-4 py-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900">Sarah's</span>
                <span className="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">sh@getchief.com</span>
              </div>
              <div className="p-4 text-gray-600">
                <p className="mb-2">Hi Jon,</p>
                <p>Thanks again for the platform walkthrough. My team had some questions about onboarding time and support coverage. Best, Sarah</p>
              </div>
            </div>

            {/* Suggested Reply Card */}
            <div className="ml-[56px] overflow-hidden rounded-xl border border-[#E6EBEC] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E6EBEC] bg-gray-50/50 px-4 py-2">
                <div className="flex items-center gap-2 text-sm font-medium text-teal-600">
                  <Sparkles className="h-4 w-4" />
                  Suggested reply
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-sm text-gray-500 hover:text-gray-900 hover:bg-transparent"
                  onClick={() => setShowReasoning(!showReasoning)}
                >
                  Reasoning <ChevronRight className={`ml-1 h-4 w-4 transition-transform duration-300 ${showReasoning ? 'rotate-180' : ''}`} />
                </Button>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="space-y-3 text-gray-900">
                  <p>Hi Sarah,</p>
                  <p>Most teams go live in 10–14 days. Our support is 24/7 via chat and email, plus you'll have a success manager during onboarding.</p>
                  <p>Would you like me to schedule a quick 20-min call to go over details?</p>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="outline" className="gap-2 text-gray-700">
                    Save as draft in Gmail
                  </Button>
                  <Button className="gap-2 bg-teal-900 text-white hover:bg-teal-800">
                    <Send className="h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Spacer for bottom padding */}
            <div className="h-[200px]"></div>
          </div>
        </div>

        {/* Footer Reply Input */}
        {!showChatPopup && (
          <div className="absolute bottom-0 left-0 w-full px-8 py-4 bg-gradient-to-t from-white via-white to-transparent z-10">
            <div className="mx-auto max-w-3xl">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 rounded-xl border border-[#E6EBEC] p-3 bg-white shadow-sm">
                  <div className="mb-1 text-xs font-medium text-gray-500">
                    Reply to: <span className="text-gray-900">Chief</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Send message to chief." 
                    className="w-full bg-transparent outline-none placeholder:text-gray-400 text-sm"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Popup */}
        <ChiefChatPopup 
          isOpen={showChatPopup}
          onClose={() => setShowChatPopup(false)}
          onViewFullChat={handleViewFullChat}
          initialMessage={initialChatMessage}
          contextTitle="this email draft"
        />
      </div>

      {/* Reasoning Panel - Slide in from right */}
      <div className={`absolute top-3 right-3 bottom-3 w-[380px] bg-white rounded-xl border border-[#E6EBEC] shadow-lg transform transition-transform duration-500 ease-in-out ${showReasoning ? 'translate-x-0' : 'translate-x-[120%]'}`}>
        <div className="h-full overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Reasoning</h1>
            <Button variant="ghost" size="icon" onClick={() => setShowReasoning(false)} className="h-8 w-8 rounded-full hover:bg-gray-100">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative ml-3 space-y-10 pl-6 border-l-2 border-gray-100">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-teal-600 ring-1 ring-gray-200" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Understand Sarah's ask</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p className="font-medium text-gray-900">Clarify onboarding timeline & support coverage.</p>
                <p>Tone detected: Concise, professional.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-teal-600 ring-1 ring-gray-200" />
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Gather signals</h3>
              <div className="space-y-3">
                {/* Hubspot Signal */}
                <div className="flex gap-2">
                  <div className="mt-0.5 shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-[#FFF1E6]">
                     <Database className="h-3 w-3 text-[#FF7A59]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-xs font-medium text-gray-900">Hubspot</h4>
                    <div className="rounded border border-gray-200 bg-white p-2">
                      <div className="grid grid-cols-[80px_1fr] gap-y-1 text-xs">
                        <span className="text-gray-500">Account</span>
                        <span className="font-medium text-gray-900">Acme Corp</span>
                        <span className="text-gray-500">Stage</span>
                        <span className="font-medium text-blue-600">Proposal shared</span>
                        <span className="text-gray-500">Next Steps</span>
                        <span className="font-medium text-gray-900">Clarify onboarding</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meeting Signal */}
                <div className="flex gap-2">
                  <div className="mt-0.5 shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-100">
                      <Calendar className="h-3 w-3 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-xs font-medium text-gray-900">Meeting Executive Asst</h4>
                    <div className="rounded border border-gray-200 bg-white p-2 text-xs text-gray-600">
                      Wants &lt;2 weeks go-live; needs dedicated rollout support.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-teal-600 ring-1 ring-gray-200" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Synthesize answer</h3>
              <ul className="space-y-1 list-disc pl-4 text-xs text-gray-600">
                <li>Onboarding: 10–14 days fits expectation.</li>
                <li>Support: 24/7 chat/email + success manager.</li>
                <li>CTA: Offer 20-min call.</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="relative pb-2">
              <div className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-teal-600 ring-1 ring-gray-200" />
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Review and Finish</h3>
              <p className="text-xs font-medium text-teal-600">Email Drafted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
