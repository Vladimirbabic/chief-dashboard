"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { 
  Search, 
  Mail, 
  Archive, 
  Share2, 
  Video, 
  Pencil, 
  Sparkles,
  MoreHorizontal,
  Trash2,
  ArrowUpRight,
  Calendar,
  FileText,
  MessageCircle
} from "lucide-react";
import { InsightDetail } from "@/components/dashboard/InsightDetail";
import { MeetingSummary } from "@/components/dashboard/MeetingSummary";
import { PreMeetingPrep } from "@/components/dashboard/PreMeetingPrep";
import { RevenueGrowthInsight } from "@/components/dashboard/RevenueGrowthInsight";
import { ChiefChat } from "@/components/dashboard/ChiefChat";
import { InsightsFeed, insights } from "@/components/dashboard/InsightsFeed";

export default function DashboardPage() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [chatContext, setChatContext] = useState<{type: 'insight' | 'meeting' | 'prep', initialMessage: string} | null>(null);

  const handleChatStart = (type: 'insight' | 'meeting' | 'prep', message: string) => {
    setChatContext({ type, initialMessage: message });
    setSelectedInsight('chat');
  };

  const renderContent = () => {
    if (selectedInsight === 'chat' && chatContext) {
      return (
        <ChiefChat 
          onBack={() => {
            setSelectedInsight(null);
            setChatContext(null);
          }}
          initialMessage={chatContext.initialMessage}
          contextType={chatContext.type}
        />
      );
    }
    if (selectedInsight === 'email') {
      return <InsightDetail onBack={() => setSelectedInsight(null)} onChatStart={(msg) => handleChatStart('insight', msg)} />;
    }
    if (selectedInsight === 'revenue-growth') {
      return <RevenueGrowthInsight onBack={() => setSelectedInsight(null)} onChatStart={(msg) => handleChatStart('insight', msg)} />;
    }
    if (selectedInsight === 'meeting') {
      return <MeetingSummary onBack={() => setSelectedInsight(null)} onChatStart={(msg) => handleChatStart('meeting', msg)} />;
    }
    if (selectedInsight === 'pre-meeting') {
      return <PreMeetingPrep onBack={() => setSelectedInsight(null)} onChatStart={(msg) => handleChatStart('prep', msg)} />;
    }
    if (selectedInsight === 'insights-feed') {
      return <InsightsFeed onBack={() => setSelectedInsight(null)} onMeetingClick={() => setSelectedInsight('meeting')} />;
    }
    
    if (selectedInsight?.startsWith('insight-')) {
      const insightId = selectedInsight.replace('insight-', '');
      return <InsightsFeed onBack={() => setSelectedInsight(null)} insightId={insightId} onMeetingClick={() => setSelectedInsight('meeting')} />;
    }
    
    return (
      <div className="mx-auto max-w-[1128px] p-8">
        <h1 className="mb-2 text-4xl font-medium text-gray-900">
          Good Morning Bret,
        </h1>
        <div className="mb-8 text-xl font-normal text-gray-500 flex items-center gap-2 flex-wrap">
          Chief found
          <span className="inline-flex items-center gap-1 text-gray-900 font-medium">
            <Sparkles className="h-5 w-5 text-teal-600" />
            {insights.length} deals at risk
          </span>
          and
          <span className="inline-flex items-center gap-1 text-gray-900 font-medium">
            <Video className="h-5 w-5 text-purple-600" />
            2 meetings
          </span>
          that need your attention today.
        </div>
        
        {/* Insights Section */}
        <section className="mb-12 overflow-hidden rounded-xl border border-[#E6EBEC] bg-white shadow-[0px_0px_6px_rgba(0,0,0,0.02),0px_2px_4px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between border-b border-[#E6EBEC] px-6 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">Deal Insights</h2>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-100 px-1.5 text-xs font-medium text-teal-700">{insights.length}</span>
            </div>
            <Button 
              variant="ghost" 
              className="h-8 text-xs font-medium text-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:border hover:border-teal-200"
              onClick={() => setSelectedInsight('insights-feed')}
            >
              Go to Insights Inbox
            </Button>
          </div>

          <div className="space-y-0">
            {/* Item 1 - Chief Assistant (Pre-Meeting) */}
            <div 
              className="group flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-[#E6EBEC] last:border-0 cursor-pointer"
              onClick={() => setSelectedInsight('pre-meeting')}
            >
              <Image src="/assistant-logo.png" alt="Chief Assistant" width={40} height={40} className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Chief Assistant</span>
                  <span className="flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                    <span className="uppercase">Jul 16</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-0.5">
                  Pre-Meeting Prep: <span className="font-medium text-gray-900">Proposal Call</span> with 
                  <span className="flex items-center gap-1 font-medium text-gray-900">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JC</AvatarFallback>
                    </Avatar>
                    Jessica Chen
                  </span>
                  and
                  <span className="flex items-center gap-1 font-medium text-gray-900">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    Mark Robinson
                  </span>
                  from
                  <span className="flex items-center gap-1 font-medium text-gray-900">
                    Stripe
                    <Image src="https://logo.clearbit.com/stripe.com" alt="Stripe" width={14} height={14} className="rounded-sm" />
                  </span>
                </p>
              </div>
              <Button 
                variant="outline" 
                className="h-8 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedInsight('pre-meeting');
                }}
              >
                View Meeting
              </Button>
            </div>

            {/* Item 2 - Chief Assistant (Meeting Summary) */}
            <div 
              className="group flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-[#E6EBEC] last:border-0 cursor-pointer"
              onClick={() => setSelectedInsight('meeting')}
            >
              <Image src="/assistant-logo.png" alt="Chief Assistant" width={40} height={40} className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Chief Assistant</span>
                  <span className="flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                    <span className="uppercase">Jul 16</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Meeting Summary: <span className="font-medium text-gray-900">Int Chief Daily: Standup Prod & Eng</span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">2 updates</span>
                </p>
              </div>
              <Button 
                variant="outline" 
                className="h-8 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedInsight('meeting');
                }}
              >
                View Summary
              </Button>
            </div>

            {/* Item 4 - Sam Daw */}
            <div className="group flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-[#E6EBEC] last:border-0">
               <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">Sam Daw</span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="text-teal-600 inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />Sharing Chief Chat with you:</span> <span className="font-medium text-gray-900">Q3 Sales Strategy Review</span>
                </p>
              </div>
              <Button variant="outline" className="h-8 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900">
                View Chief Chat
              </Button>
            </div>
            
            {/* Inbox Insights */}
            {insights.map((insight) => (
              <div 
                key={insight.id}
                className="group flex items-center gap-4 bg-gray-50/50 p-4 hover:bg-gray-50 border-b border-[#E6EBEC] last:border-0 cursor-pointer"
                onClick={() => setSelectedInsight(`insight-${insight.id}`)}
              >
                <Image src="/chief-logo.png" alt="Chief Intelligence" width={40} height={40} className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">Chief Intelligence</span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    New Insight: <span className="font-medium text-gray-900">{insight.type}</span> • 
                    <span className="inline-flex items-center gap-1 font-medium text-gray-900">
                      {insight.company}
                      <Image 
                        src={`https://logo.clearbit.com/${insight.companyDomain}`} 
                        alt={insight.company} 
                        width={14} 
                        height={14} 
                        className="rounded-sm" 
                      />
                    </span>
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="h-8 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedInsight(`insight-${insight.id}`);
                  }}
                >
                  View Insight
                </Button>
              </div>
            ))}

          </div>
        </section>

        {/* Upcoming Meetings Section */}
        <section className="overflow-hidden rounded-xl border border-[#E6EBEC] bg-white shadow-[0px_0px_6px_rgba(0,0,0,0.02),0px_2px_4px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between border-b border-[#E6EBEC] px-6 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Meetings</h2>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-100 px-1.5 text-xs font-medium text-gray-600">2</span>
            </div>
            <Button variant="ghost" className="h-8 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border hover:border-gray-200">
              View All Meetings
            </Button>
          </div>

          <div className="space-y-0">
            {/* Meeting 1 */}
            <div className="group flex flex-row items-center gap-6 p-4 hover:bg-gray-50 border-b border-[#E6EBEC] last:border-0">
              <div className="flex flex-col items-center justify-center rounded-lg bg-purple-100 p-2 text-purple-700 w-16 h-16 shrink-0">
                <span className="text-xs font-bold uppercase">JUL</span>
                <span className="text-xl font-bold">17</span>
              </div>
              
              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-6">
                    <h3 className="font-semibold text-lg text-gray-900">Int Chief Daily: Standup Prod & Eng</h3>
                    <div className="flex -space-x-3">
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/nextjs.png" />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/react.png" />
                        <AvatarFallback>D</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>Today 9:00 – 9:30pm</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 font-normal border-0 px-2 py-0.5 rounded">
                      In 1 Minute
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-8 ml-auto">
                  <Button variant="outline" className="gap-2 h-10 px-4">
                    <Video className="h-5 w-5 text-[#ea4335]" />
                    <span className="font-medium">Join</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Meeting 2 */}
            <div className="group flex flex-row items-center gap-6 p-4 hover:bg-gray-50 border-b border-[#E6EBEC] last:border-0">
              <div className="flex flex-col items-center justify-center rounded-lg bg-purple-100 p-2 text-purple-700 w-16 h-16 shrink-0">
                <span className="text-xs font-bold uppercase">JUL</span>
                <span className="text-xl font-bold">17</span>
              </div>
              
              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-6">
                    <h3 className="font-semibold text-lg text-gray-900">Int Chief Daily: Standup Prod & Eng</h3>
                    <div className="flex -space-x-3">
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white ring-0">
                        <AvatarImage src="https://github.com/nextjs.png" />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>Today 9:00 – 9:30pm</span>
                  </div>
                </div>

                <div className="flex items-center gap-8 ml-auto">
                  <Button variant="outline" className="gap-2 h-10 px-4">
                    <Pencil className="h-4 w-4" />
                    <span className="font-medium">Add Notes</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F2F6F7]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}