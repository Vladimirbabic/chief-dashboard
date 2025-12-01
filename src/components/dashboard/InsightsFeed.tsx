"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronRight,
  ChevronLeft,
  Sun,
  CornerDownLeft,
  Zap,
  Send,
  Copy,
  Calendar,
  User,
  AlertCircle,
  TrendingDown,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { ChiefChatPopup } from "./ChiefChatPopup";
import { ProposalReviewSummary } from "./ProposalReviewSummary";

interface InsightsFeedProps {
  onBack?: () => void;
  insightId?: string;
}

export interface InsightVisualData {
  type: 'timeline' | 'comparison' | 'stakeholders' | 'activity' | 'missing-fields';
  data: any;
}

export interface InsightData {
  id: string;
  type: string;
  typeColor: string;
  company: string;
  companyDomain: string;
  value: string;
  date: string;
  insight: {
    main: string;
    stat: string;
  };
  direction: {
    main: string;
    secondary?: string;
  };
  action: {
    description: string;
    type: 'hubspot-task' | 'email-draft' | 'suggested-contacts' | 'hubspot-update' | 'hubspot-tags' | 'calendar-invite';
    content: any;
  };
  visual?: InsightVisualData;
}

export const insights: InsightData[] = [
  {
    id: '1',
    type: 'Stuck Deal',
    typeColor: 'text-gray-500',
    company: 'MiroCloud',
    companyDomain: 'miro.com',
    value: '$31,880',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'MiroCloud has been in Proposal for 15 days — 23% longer than average for this stage.',
      stat: 'Deals that stay stalled past 17 days are 42% less likely to close.'
    },
    direction: {
      main: 'Reconnect with Jason Lee to confirm next steps and get things back on track.'
    },
    action: {
      description: 'Chief created a reminder task titled "Follow up on next steps with Jason Lee" and added it to your deal workspace.',
      type: 'hubspot-task',
      content: {
        task: 'Follow up on next steps with Jason Lee'
      }
    },
    visual: {
      type: 'timeline',
      data: { current: 15, average: 12, label: 'Days in Proposal' }
    }
  },
  {
    id: '2',
    type: 'Momentum Slowing',
    typeColor: 'text-gray-500',
    company: 'Canopy Systems',
    companyDomain: 'canopy.com',
    value: '$28,100',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'Engagement on Canopy Systems is down 47% in the past two weeks — just 3 interactions vs. an average of 6 for this stage.',
      stat: 'Deals that lose half their touch frequency see a 39% drop in win rate and often push out a full quarter.'
    },
    direction: {
      main: 'Re-energize the conversation. Send your champion a quick note recapping what\'s already been achieved and ask for a short re-sync to confirm priorities.'
    },
    action: {
      description: 'Chief drafted a short "progress recap" email for your review and scheduled it as a suggested next step.',
      type: 'email-draft',
      content: {
        greeting: 'Hi Sarah,',
        body: 'I wanted to check in and recap the progress we\'ve made so far. We\'ve covered your key requirements around reporting automation and your team seemed aligned on the timeline.',
        cta: 'Would you have 15 minutes this week for a quick sync to confirm priorities and next steps?'
      }
    },
    visual: {
      type: 'comparison',
      data: { current: 3, previous: 6, label: 'Interactions' }
    }
  },
  {
    id: '3',
    type: 'Single-Threaded Deal',
    typeColor: 'text-gray-500',
    company: 'DriftIQ',
    companyDomain: 'drift.com',
    value: '$42,700',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'Only one contact is linked to DriftIQ so far.',
      stat: 'Won deals in this stage average 3+ stakeholders, and single-threaded deals are 44% less likely to close.'
    },
    direction: {
      main: 'Expand the circle. Ask your champion who else will be part of the final decision — especially anyone in procurement, finance, or the end-user team.'
    },
    action: {
      description: 'Chief identified three additional decision-makers in procurement and finance and surfaced them under "Suggested Contacts."',
      type: 'suggested-contacts',
      content: {
        contacts: [
          { name: 'Naomi Wildes', email: 'Naomi.Wildes@driftiq.com', avatar: 'https://github.com/shadcn.png' },
          { name: 'Jared Hoffmeyer', email: 'Jared.Hoffmeyer@driftiq.com', avatar: 'https://github.com/vercel.png' },
          { name: 'Darlene Robertson', email: 'darlene.robertson@driftiq.com', avatar: 'https://github.com/nextjs.png' }
        ]
      }
    },
    visual: {
      type: 'stakeholders',
      data: { 
        current: 1, 
        target: 3,
        contacts: [
          { name: 'Sarah Chen', role: 'VP of Sales', avatar: 'https://github.com/shadcn.png' }
        ]
      }
    }
  },
  {
    id: '4',
    type: 'Close Date Off',
    typeColor: 'text-gray-500',
    company: 'ZenOps',
    companyDomain: 'zendesk.com',
    value: '$19,250',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'The close date for ZenOps is Nov 5, which is 3 days past due.',
      stat: 'Deals that miss their expected close date by a week are 48% less likely to close in-quarter.'
    },
    direction: {
      main: 'Update the close date to a realistic target or move this deal to next quarter to keep your forecast accurate and momentum clean.'
    },
    action: {
      description: 'Chief updated the close date recommendation to next Tuesday and flagged it for your confirmation.',
      type: 'hubspot-update',
      content: {
        field: 'Suggested Close Date Updated',
        value: 'Updated to November 14 (next Tuesday)'
      }
    },
    visual: {
      type: 'timeline',
      data: { current: 3, average: 0, label: 'Days Past Due', isOverdue: true }
    }
  },
  {
    id: '5',
    type: 'Missing Info',
    typeColor: 'text-gray-500',
    company: 'Lunaris Labs',
    companyDomain: 'linear.app',
    value: '$22,640',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'This deal is missing a champion and next step — two key fields required for Commit readiness.',
      stat: 'Deals missing these details are 40% less likely to close and often get excluded from forecast accuracy.'
    },
    direction: {
      main: 'Add the missing champion and next step so Chief can keep Lunaris Labs in your active forecast.'
    },
    action: {
      description: 'Chief added placeholders for Champion and Next Step and highlighted them for your input in the deal record.',
      type: 'hubspot-tags',
      content: {
        tags: ['Champion', 'Next Step']
      }
    },
    visual: {
      type: 'missing-fields',
      data: { missing: ['Champion', 'Next Step'] }
    }
  },
  {
    id: '6',
    type: 'Activity Risk',
    typeColor: 'text-gray-500',
    company: 'Notion AI',
    companyDomain: 'notion.so',
    value: '$25,432',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'Notion AI has been inactive for 10 days — 20% longer than average for this stage.',
      stat: 'Deals with inactivity past 12 days are 36% less likely to close.'
    },
    direction: {
      main: 'Reconnect with Sarah Chen today to regain momentum and protect your $25K close.'
    },
    action: {
      description: 'Chief drafted a re-engagement message to Sarah Chen and queued it for your review.',
      type: 'email-draft',
      content: {
        greeting: 'Hi Sarah,',
        body: 'I wanted to circle back on our conversation about Notion AI. I know things can get busy, but I wanted to make sure we\'re still aligned on the timeline we discussed.',
        cta: 'Do you have 10 minutes this week to reconnect? I\'d love to answer any questions and keep things moving forward.'
      }
    },
    visual: {
      type: 'activity',
      data: { days: 10, threshold: 12 }
    }
  },
  {
    id: '7',
    type: 'Next Step Overdue',
    typeColor: 'text-gray-500',
    company: 'Flowbit',
    companyDomain: 'webflow.com',
    value: '$36,950',
    date: 'Thu, Dec 26, 2024',
    insight: {
      main: 'The last scheduled next step for Flowbit was 4 days ago and hasn\'t been updated.',
      stat: 'Deals without an active next meeting or task are 58% more likely to stall before close, especially late in the quarter.'
    },
    direction: {
      main: 'Add a new next step or meeting to keep this deal active and moving forward.'
    },
    action: {
      description: 'Chief proposed a "30-minute sync" meeting with Alex Rivera and added it to your calendar draft queue.',
      type: 'calendar-invite',
      content: {
        title: '30-minute sync',
        date: 'JUL 17',
        time: 'Today 9:00 – 9:30pm',
        attendee: {
          name: 'Alex Rivera',
          email: 'alex.rivera@flowbit.com',
          avatar: 'https://github.com/shadcn.png'
        }
      }
    },
    visual: {
      type: 'timeline',
      data: { current: 4, average: 0, label: 'Days Overdue', isOverdue: true }
    }
  }
];

function InsightVisual({ type, data, onMeetingClick }: InsightVisualData & { onMeetingClick?: () => void }) {
  switch (type) {
    case 'comparison':
      // Touch Timeline with circles representing intensity
      // Simulating touch data over time - size represents intensity, position on timeline
      const touchData = [
        { week: 1, touches: [{ intensity: 0.3, type: 'email' }, { intensity: 0.4, type: 'call' }] },
        { week: 2, touches: [{ intensity: 0.5, type: 'email' }] },
        { week: 3, touches: [] },
        { week: 4, touches: [{ intensity: 0.7, type: 'call' }, { intensity: 0.8, type: 'meeting' }] },
        { week: 5, touches: [{ intensity: 0.6, type: 'email' }, { intensity: 0.9, type: 'meeting' }] },
      ];
      
      return (
        <div className="mt-4 w-full bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Touch Timeline</span>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span> Emails/Calls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9B82]"></span> Meetings
              </span>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="relative h-20">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -translate-y-1/2"></div>
            
            {/* Touch points */}
            <div className="absolute inset-0 flex justify-between items-center px-2">
              {touchData.map((week, weekIdx) => (
                <div key={weekIdx} className="relative flex items-center justify-center" style={{ width: '18%' }}>
                  {week.touches.length === 0 ? (
                    <div className="w-2 h-2 rounded-full bg-gray-200 border border-gray-300"></div>
                  ) : (
                    week.touches.map((touch, touchIdx) => {
                      const size = Math.max(16, touch.intensity * 48);
                      const color = touch.type === 'meeting' ? 'bg-[#FF9B82]' : 'bg-[#8B5CF6]';
                      const offset = touchIdx * 8 - (week.touches.length - 1) * 4;
                      const isMeeting = touch.type === 'meeting';
                      return (
                        <div
                          key={touchIdx}
                          className={`absolute rounded-full ${color} opacity-70 hover:opacity-100 transition-all cursor-pointer ${isMeeting ? 'hover:ring-2 hover:ring-[#FF9B82]/50 hover:scale-110' : ''}`}
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `translateX(${offset}px)`,
                          }}
                          title={isMeeting ? 'Click to view meeting summary' : `${touch.type}: ${Math.round(touch.intensity * 100)}% intensity`}
                          onClick={isMeeting && onMeetingClick ? onMeetingClick : undefined}
                        />
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Week labels */}
          <div className="flex justify-between px-2 mt-2">
            {touchData.map((_, idx) => (
              <span key={idx} className="text-xs text-gray-400" style={{ width: '18%', textAlign: 'center' }}>
                {idx === 0 ? '4w ago' : idx === touchData.length - 1 ? 'Now' : ''}
              </span>
            ))}
          </div>
          
          {/* Summary */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">{data.current}</span> touches this period
            </div>
            <div className="text-sm text-[#FF9B82] font-medium flex items-center gap-1">
              <TrendingDown className="h-4 w-4" /> 47% vs avg of {data.previous}
            </div>
          </div>
        </div>
      );

    case 'timeline':
      // Timeline with due date marker and overdue indicator
      const totalDays = data.average > 0 ? Math.max(data.current, data.average * 1.5) : data.current * 1.5;
      const duePosition = data.average > 0 ? (data.average / totalDays) * 100 : 50;
      const currentPosition = (data.current / totalDays) * 100;
      const overdueAmount = data.current - (data.average || 0);
      
      return (
        <div className="mt-4 w-full bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-500">{data.label}</span>
            <span className="font-mono font-medium text-gray-900">{data.current} days</span>
          </div>
          
          {/* Timeline visualization */}
          <div className="relative h-14 mb-2">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-100 rounded-full -translate-y-1/2"></div>
            
            {/* On-time portion (green) */}
            {data.average > 0 && (
              <div 
                className="absolute top-1/2 left-0 h-3 bg-[#00C29F]/30 rounded-l-full -translate-y-1/2"
                style={{ width: `${duePosition}%` }}
              ></div>
            )}
            
            {/* Overdue portion (salmon/red) */}
            <div 
              className="absolute top-1/2 h-3 bg-[#FF9B82] -translate-y-1/2 flex items-center justify-end pr-2"
              style={{ 
                left: data.average > 0 ? `${duePosition}%` : '0%',
                width: data.average > 0 ? `${currentPosition - duePosition}%` : `${currentPosition}%`,
                borderRadius: data.average > 0 ? '0 9999px 9999px 0' : '9999px'
              }}
            >
              {overdueAmount > 0 && (
                <span className="text-xs font-bold text-white whitespace-nowrap">
                  +{overdueAmount}d
                </span>
              )}
            </div>
            
            {/* Due date marker */}
            {data.average > 0 && (
              <div 
                className="absolute top-0 bottom-0 flex flex-col items-center"
                style={{ left: `${duePosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="text-xs text-gray-500 font-medium whitespace-nowrap mb-1">
                  Due
                </div>
                <div className="w-0.5 flex-1 bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400 border-2 border-white shadow-sm"></div>
              </div>
            )}
            
            {/* Current position marker */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${currentPosition}%`, transform: 'translateX(-50%) translateY(-50%)' }}
            >
              <div className="w-5 h-5 rounded-full bg-[#FF9B82] border-2 border-white shadow-md"></div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Start</span>
            {data.average > 0 && (
              <span style={{ marginLeft: `${duePosition - 10}%` }}>Avg {data.average}d</span>
            )}
            <span className="text-[#FF9B82] font-medium">Today</span>
          </div>
        </div>
      );

    case 'activity':
      // Touch Timeline with circles representing intensity (same as comparison)
      // For activity risk - shows activity dropping off to nothing
      const activityTouchData = [
        { week: 1, touches: [{ intensity: 0.8, type: 'meeting' }, { intensity: 0.5, type: 'email' }] },
        { week: 2, touches: [{ intensity: 0.6, type: 'call' }] },
        { week: 3, touches: [{ intensity: 0.3, type: 'email' }] },
        { week: 4, touches: [] },
        { week: 5, touches: [] },
      ];
      
      return (
        <div className="mt-4 w-full bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Activity Timeline</span>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span> Emails/Calls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9B82]"></span> Meetings
              </span>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="relative h-20">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 -translate-y-1/2"></div>
            
            {/* Inactive zone highlight */}
            <div 
              className="absolute top-0 bottom-0 right-0 bg-[#FF9B82]/10 rounded-r-lg"
              style={{ width: '40%' }}
            >
              <div className="absolute top-1 right-2 text-xs text-[#FF9B82] font-medium">
                10 days inactive
              </div>
            </div>
            
            {/* Touch points */}
            <div className="absolute inset-0 flex justify-between items-center px-2">
              {activityTouchData.map((week, weekIdx) => (
                <div key={weekIdx} className="relative flex items-center justify-center" style={{ width: '18%' }}>
                  {week.touches.length === 0 ? (
                    <div className="w-2 h-2 rounded-full bg-gray-200 border border-gray-300"></div>
                  ) : (
                    week.touches.map((touch, touchIdx) => {
                      const size = Math.max(16, touch.intensity * 48);
                      const color = touch.type === 'meeting' ? 'bg-[#FF9B82]' : 'bg-[#8B5CF6]';
                      const offset = touchIdx * 8 - (week.touches.length - 1) * 4;
                      const isMeeting = touch.type === 'meeting';
                      return (
                        <div
                          key={touchIdx}
                          className={`absolute rounded-full ${color} opacity-70 hover:opacity-100 transition-all cursor-pointer ${isMeeting ? 'hover:ring-2 hover:ring-[#FF9B82]/50 hover:scale-110' : ''}`}
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: `translateX(${offset}px)`,
                          }}
                          title={isMeeting ? 'Click to view meeting summary' : `${touch.type}: ${Math.round(touch.intensity * 100)}% intensity`}
                          onClick={isMeeting && onMeetingClick ? onMeetingClick : undefined}
                        />
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Week labels */}
          <div className="flex justify-between px-2 mt-2">
            {activityTouchData.map((_, idx) => (
              <span key={idx} className="text-xs text-gray-400" style={{ width: '18%', textAlign: 'center' }}>
                {idx === 0 ? '4w ago' : idx === activityTouchData.length - 1 ? 'Now' : ''}
              </span>
            ))}
          </div>
          
          {/* Summary */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Last activity: <span className="font-medium text-gray-900">10 days ago</span>
            </div>
            <div className="text-sm text-[#FF9B82] font-medium">
              Risk threshold: 12 days
            </div>
          </div>
        </div>
      );

    case 'stakeholders':
      const existingContacts = data.contacts || [];
      const missingCount = data.target - existingContacts.length;
      
      return (
        <div className="mt-4 w-full bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Stakeholder Coverage</span>
            <span className="text-sm font-medium text-gray-900">{data.current}/{data.target}</span>
          </div>
          <div className="flex gap-3">
            {/* Existing contacts */}
            {existingContacts.map((contact: { name: string; role: string; avatar: string }, i: number) => (
              <div 
                key={i} 
                className="flex-1 rounded-lg border border-[#E6EBEC] bg-white p-3 flex flex-col items-center gap-2"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[100px]">{contact.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[100px]">{contact.role}</p>
                </div>
              </div>
            ))}
            
            {/* Missing stakeholder slots */}
            {Array.from({ length: missingCount }).map((_, i) => (
              <div 
                key={`missing-${i}`} 
                className="flex-1 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-3 flex flex-col items-center justify-center gap-2 min-h-[100px]"
              >
                <div className="h-12 w-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-300" />
                </div>
                <p className="text-xs text-gray-400">Add contact</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'missing-fields':
        // Close likelihood line chart comparison
        const withInfoData = [45, 52, 58, 65, 72, 78];
        const withoutInfoData = [45, 48, 46, 42, 40, 38];
        const maxValue = 100;
        const chartHeight = 80;
        
        const getPath = (dataPoints: number[]) => {
          const width = 100 / (dataPoints.length - 1);
          return dataPoints.map((val, i) => {
            const x = i * width;
            const y = 100 - (val / maxValue) * 100;
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }).join(' ');
        };
        
        return (
            <div className="mt-4 w-full bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Close Likelihood Over Time</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#00C29F] rounded"></span> With info
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#FF9B82] rounded"></span> Missing info
                  </span>
                </div>
              </div>
              
              {/* Line Chart */}
              <div className="relative" style={{ height: chartHeight }}>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-gray-400 pr-2">
                  <span>100%</span>
                  <span>50%</span>
                  <span>0%</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-10 h-full relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-dashed border-gray-200"></div>
                    <div className="border-t border-dashed border-gray-200"></div>
                    <div className="border-t border-gray-200"></div>
                  </div>
                  
                  {/* SVG Lines */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {/* With info line (green) */}
                    <path
                      d={getPath(withInfoData)}
                      fill="none"
                      stroke="#00C29F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* With info area fill */}
                    <path
                      d={`${getPath(withInfoData)} L 100 100 L 0 100 Z`}
                      fill="url(#greenGradient)"
                      opacity="0.1"
                    />
                    
                    {/* Without info line (salmon) */}
                    <path
                      d={getPath(withoutInfoData)}
                      fill="none"
                      stroke="#FF9B82"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Without info area fill */}
                    <path
                      d={`${getPath(withoutInfoData)} L 100 100 L 0 100 Z`}
                      fill="url(#redGradient)"
                      opacity="0.1"
                    />
                    
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00C29F" />
                        <stop offset="100%" stopColor="#00C29F" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF9B82" />
                        <stop offset="100%" stopColor="#FF9B82" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* End point markers with labels - rendered as divs to avoid SVG stretching */}
                  {/* Green dot with label */}
                  <div 
                    className="absolute flex items-center gap-1"
                    style={{ 
                      right: 0, 
                      top: `${(100 - withInfoData[withInfoData.length - 1]) * (chartHeight / 100)}px`,
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <span className="text-xs font-bold text-[#00C29F]">
                      {withInfoData[withInfoData.length - 1]}%
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#00C29F]" />
                  </div>
                  {/* Salmon dot */}
                  <div 
                    className="absolute w-2 h-2 rounded-full bg-[#FF9B82]"
                    style={{ 
                      right: 0, 
                      top: `${(100 - withoutInfoData[withoutInfoData.length - 1]) * (chartHeight / 100)}px`,
                      transform: 'translateY(-50%)'
                    }}
                  />
                </div>
              </div>
              
              {/* X-axis labels */}
              <div className="ml-10 flex justify-between text-[10px] text-gray-400 mt-2">
                <span>Week 1</span>
                <span>Week 6</span>
              </div>
              
              {/* Impact callout */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FF9B82]/10 flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-[#FF9B82]" />
                  </div>
                  <span className="text-sm text-gray-600">Gap at close</span>
                </div>
                <span className="text-lg font-bold text-[#FF9B82]">-40% likelihood</span>
              </div>
              
              {/* Missing fields tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {data.missing.map((field: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFEBE6] border border-[#FFCAC9] text-xs font-medium text-[#D4816C]">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {field}
                    </span>
                ))}
              </div>
            </div>
        );

    default:
      return null;
  }
}

function InsightCard({ insight, onMeetingClick }: { insight: InsightData; onMeetingClick?: () => void }) {
  const renderActionContent = () => {
    switch (insight.action.type) {
      case 'hubspot-task':
        return (
          <div className="bg-[#F8FAFB] rounded-xl border border-[#E6EBEC] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E6EBEC]">
              <div className="w-5 h-5 rounded bg-[#FF7A59] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">H</span>
              </div>
              <span className="text-sm font-medium text-gray-700">HubSpot</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-teal-700 font-medium mb-1">To-do Task Added:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>{insight.action.content.task}</li>
              </ul>
            </div>
            <div className="px-4 pb-4">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Open in Hubspot
              </Button>
            </div>
          </div>
        );
      
      case 'email-draft':
        return (
          <div className="bg-[#F8FAFB] rounded-xl border border-[#E6EBEC] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E6EBEC]">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-600">Suggested reply</span>
              </div>
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                Reasoning <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-900">{insight.action.content.greeting}</p>
              <p className="text-sm text-gray-700">{insight.action.content.body}</p>
              <p className="text-sm text-gray-700">{insight.action.content.cta}</p>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Save as draft in Gmail
              </Button>
              <Button size="sm" className="h-8 text-xs bg-teal-800 hover:bg-teal-900 text-white gap-1">
                <Send className="h-3 w-3" />
                Send Email
              </Button>
            </div>
          </div>
        );
      
      case 'suggested-contacts':
        return (
          <div className="bg-purple-50/50 rounded-xl border border-purple-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-purple-100">
              <span className="text-sm font-medium text-gray-900">Suggested Contacts</span>
            </div>
            <div className="divide-y divide-purple-100">
              {insight.action.content.contacts.map((contact: any, i: number) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-teal-600">{contact.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                    <Copy className="h-3 w-3" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'hubspot-update':
        return (
          <div className="bg-[#F8FAFB] rounded-xl border border-[#E6EBEC] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E6EBEC]">
              <div className="w-5 h-5 rounded bg-[#FF7A59] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">H</span>
              </div>
              <span className="text-sm font-medium text-gray-700">HubSpot</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-teal-700 font-medium mb-1">{insight.action.content.field}</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>{insight.action.content.value}</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 px-4 pb-4">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Review
              </Button>
              <Button size="sm" className="h-8 text-xs bg-teal-800 hover:bg-teal-900 text-white">
                Approve
              </Button>
            </div>
          </div>
        );
      
      case 'hubspot-tags':
        return (
          <div className="bg-[#F8FAFB] rounded-xl border border-[#E6EBEC] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E6EBEC]">
              <div className="w-5 h-5 rounded bg-[#FF7A59] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">H</span>
              </div>
              <span className="text-sm font-medium text-gray-700">HubSpot</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">Added two Tags:</p>
              <ul className="list-disc list-inside text-sm text-teal-700">
                {insight.action.content.tags.map((tag: string, i: number) => (
                  <li key={i}>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="px-4 pb-4">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Open in Hubspot
              </Button>
            </div>
          </div>
        );
      
      case 'calendar-invite':
        return (
          <div className="bg-[#F8FAFB] rounded-xl border border-[#E6EBEC] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E6EBEC]">
              <div className="w-5 h-5 rounded bg-white border flex items-center justify-center">
                <Calendar className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Google Calendar</span>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center justify-center rounded bg-purple-100 px-2 py-1.5 text-purple-700 shrink-0">
                  <span className="text-[10px] font-bold uppercase">JUL</span>
                  <span className="text-sm font-bold">17</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{insight.action.content.title}</p>
                  <p className="text-xs text-gray-500">{insight.action.content.time}</p>
                </div>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={insight.action.content.attendee.avatar} />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{insight.action.content.attendee.name}</p>
                  <p className="text-xs text-gray-500">{insight.action.content.attendee.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 pb-4">
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Cancel
              </Button>
              <Button size="sm" className="h-8 text-xs bg-teal-800 hover:bg-teal-900 text-white">
                Approve and send invite
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Chief Message Block */}
      <div className="flex items-start gap-4">
        <Image src="/chief-logo.png" alt="Chief" width={40} height={40} className="h-10 w-10 rounded-full shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          {/* Name & Date */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900">Chief</span>
            <span className="text-sm text-gray-500">{insight.date}</span>
          </div>
          
          {/* Message Text */}
          <div className="text-gray-900 space-y-2 mb-6">
            <p>Hi Jon,</p>
            <p>{insight.insight.main}</p>
          </div>

          {/* Insight Stats Card */}
          <div className="bg-white rounded-xl border border-[#E6EBEC] p-5 space-y-4 mb-4">
            {/* Key Stat */}
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 p-1 bg-[#00C29F]/10 rounded-md shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-[#00C29F]" />
              </div>
              <p className="text-sm text-[#008774] font-medium leading-relaxed">
                {insight.insight.stat}
              </p>
            </div>

            {/* Visual Chart */}
            {insight.visual && (
              <div className="w-full">
                 <InsightVisual type={insight.visual.type} data={insight.visual.data} onMeetingClick={onMeetingClick} />
              </div>
            )}
          </div>

          {/* Direction Card */}
          <div className="bg-white rounded-xl border border-[#E6EBEC] p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <CornerDownLeft className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Direction</span>
            </div>
            <p className="text-sm text-gray-900 leading-relaxed">
              {insight.direction.main}
            </p>
          </div>

          {/* Recommended Action Card */}
          <div className="bg-white rounded-xl border border-[#E6EBEC] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-[#00C29F]" />
              <span className="text-xs font-semibold text-[#00C29F] uppercase tracking-wide">Recommended Action</span>
            </div>
            <p className="text-sm text-gray-900 font-medium mb-3">
              {insight.action.description}
            </p>
            {renderActionContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InsightsFeed({ onBack, insightId }: InsightsFeedProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");
  const [showMeetingPanel, setShowMeetingPanel] = useState(false);

  // Filter insights if insightId is provided
  const displayInsights = insightId 
    ? insights.filter(i => i.id === insightId)
    : insights;

  const activeInsight = displayInsights[0];
  const isSingleView = !!insightId && activeInsight;

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setInitialChatMessage(chatMessage);
    setIsChatOpen(true);
    setChatMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[#F2F6F7] flex flex-col relative p-2">
      {/* Main Container - White background with rounded corners */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isSingleView ? 'bg-white rounded-xl border border-[#E6EBEC]' : ''}`}>
        {/* Header */}
        <div className={`${isSingleView ? '' : 'bg-white'} border-b border-[#E6EBEC] px-6 py-4 flex items-center gap-4 shrink-0 ${isSingleView ? 'rounded-t-xl' : ''}`}>
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full hover:bg-gray-100 border border-gray-200">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </Button>
          )}
          <div className="flex-1">
            {isSingleView ? (
              <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className={activeInsight.typeColor}>{activeInsight.type}</span>
                <span className="text-gray-300">•</span>
                <span>{activeInsight.company} ({activeInsight.value})</span>
              </h1>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-gray-900">Insights Inbox</h1>
                <p className="text-sm text-gray-500">7 insights requiring your attention</p>
              </>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className={`flex-1 overflow-y-auto ${isSingleView ? 'p-6 pb-28 bg-white' : 'p-6 pb-24'}`}>
          <div className="max-w-3xl mx-auto space-y-4">
            {displayInsights.map(insight => (
              <div key={insight.id} className={isSingleView ? "" : "bg-white rounded-2xl border border-[#E6EBEC] shadow-sm overflow-hidden p-6"}>
                 <InsightCard insight={insight} onMeetingClick={() => setShowMeetingPanel(true)} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Input - Sticky */}
        {isSingleView && !isChatOpen && (
          <div className="absolute bottom-2 left-2 right-2 px-6 py-4 bg-gradient-to-t from-white via-white to-transparent z-10 rounded-b-xl">
            <div className="max-w-3xl mx-auto">
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
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Popup */}
        {isSingleView && (
          <ChiefChatPopup
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
            onViewFullChat={() => {
              setIsChatOpen(false);
              // Could navigate to full chat view here if needed
            }}
            initialMessage={initialChatMessage}
            contextTitle={activeInsight ? `${activeInsight.type} - ${activeInsight.company}` : "this insight"}
          />
        )}
      </div>

      {/* Meeting Summary Slide-in Panel */}
      <div 
        className={`absolute top-0 right-0 h-full w-[500px] bg-white border-l border-[#E6EBEC] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          showMeetingPanel ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {showMeetingPanel && (
          <ProposalReviewSummary 
            onBack={() => setShowMeetingPanel(false)} 
            isPanel={true}
          />
        )}
      </div>

      {/* Backdrop overlay when panel is open */}
      {showMeetingPanel && (
        <div 
          className="absolute inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setShowMeetingPanel(false)}
        />
      )}
    </div>
  );
}
