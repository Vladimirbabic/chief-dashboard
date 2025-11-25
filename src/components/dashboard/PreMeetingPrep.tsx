import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MeetingSummary } from "./MeetingSummary";
import { 
  ChevronLeft, 
  Video, 
  Calendar, 
  Building2, 
  FileText,
  X,
  MoreHorizontal,
  Sparkles
} from "lucide-react";
import Image from "next/image";

interface PreMeetingPrepProps {
  onBack: () => void;
}

export function PreMeetingPrep({ onBack }: PreMeetingPrepProps) {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#F2F6F7] p-3 relative">
      <div className={`flex flex-col h-full bg-white rounded-xl border border-[#E6EBEC] shadow-sm overflow-y-auto transition-all duration-500 ease-in-out ${showSummary ? 'w-[35%] mr-3' : 'w-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6EBEC] px-8 py-6 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full hover:bg-gray-100">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-gray-900">Proposal Review</h1>
              </div>
              <div className="flex items-center gap-3 text-sm mt-1">
                <span className="text-gray-500">Today 9:00 – 9:30pm</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 font-normal border-0 px-2 py-0.5 rounded">
                  In 8 Minute
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" className="gap-2 h-10 px-4 bg-white hover:bg-gray-50">
            <Image src="/google-meet.png" alt="Meet" width={20} height={20} className="h-5 w-auto object-contain" />
            <span className="font-medium text-gray-700">Join Meeting</span>
          </Button>
        </div>

        <div className="p-8 max-w-3xl mx-auto w-full space-y-6">
          
          {/* Attendees */}
          <div className="flex items-center gap-4 py-2">
            <span className="text-sm text-gray-500">People who attended this meeting:</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={`https://github.com/shadcn.png`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
              <div className="h-10 w-10 rounded-full bg-teal-900 border-2 border-white flex items-center justify-center">
                <Image src="/chief-logo.png" alt="Chief" width={20} height={20} className="h-5 w-5 brightness-0 invert" />
              </div>
            </div>
          </div>

          {/* Recording Notice */}
          <div className="rounded-xl border border-[#E6EBEC] p-4 flex gap-4 relative">
            <div className="h-2 w-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <div className="flex-1 pr-8">
              <h3 className="font-medium text-gray-900 mb-1">This Meeting is recorded</h3>
              <p className="text-sm text-gray-600">
                Chief is on the attendee list for this meeting. Once it's finished, we'll merge your notes with the transcript summary.
              </p>
            </div>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Meeting History Timeline */}
          <Card className="shadow-none border border-[#E6EBEC]">
            <div className="flex items-center gap-2 border-b border-[#E6EBEC] px-4 py-3 bg-white rounded-t-xl">
              <Calendar className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">Meeting History Timeline</h3>
            </div>
            <div className="p-4 space-y-4">
              {/* Item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center rounded bg-purple-50 p-1 text-purple-700 w-12 h-12 shrink-0 border border-purple-100">
                    <span className="text-[10px] font-bold uppercase">JUL</span>
                    <span className="text-sm font-bold">24</span>
                  </div>
                  <span className="font-medium text-gray-900">Proposal Review</span>
                </div>
                <Button variant="outline" className="gap-2 h-9">
                  <Image src="/google-meet.png" alt="Meet" width={16} height={16} className="h-4 w-auto object-contain" />
                  <span className="text-sm">Join Call</span>
                </Button>
              </div>
              
              {/* Item 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center rounded bg-gray-50 p-1 text-gray-600 w-12 h-12 shrink-0 border border-gray-100">
                    <span className="text-[10px] font-bold uppercase">JUL</span>
                    <span className="text-sm font-bold">16</span>
                  </div>
                  <span className="font-medium text-gray-900">Solution Demo / Deep Dive</span>
                </div>
                <Button variant="outline" className="h-9 text-gray-600" onClick={() => setShowSummary(true)}>
                  View Summary
                </Button>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center rounded bg-gray-50 p-1 text-gray-600 w-12 h-12 shrink-0 border border-gray-100">
                    <span className="text-[10px] font-bold uppercase">JUN</span>
                    <span className="text-sm font-bold">8</span>
                  </div>
                  <span className="font-medium text-gray-900">Discovery Call</span>
                </div>
                <Button variant="outline" className="h-9 text-gray-600" onClick={() => setShowSummary(true)}>
                  View Summary
                </Button>
              </div>
            </div>
          </Card>

          {/* Company Snapshot */}
          <Card className="shadow-none border border-[#E6EBEC]">
            <div className="flex items-center gap-2 border-b border-[#E6EBEC] px-4 py-3 bg-white rounded-t-xl">
              <Building2 className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">Company Snapshot</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-[140px_1fr] gap-y-4 text-sm">
                <span className="text-gray-500">Value</span>
                <span className="font-semibold text-gray-900">$235K ARR</span>

                <span className="text-gray-500 self-center">Stage</span>
                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium text-blue-600 border border-blue-100">
                    Proposal
                  </span>
                </div>

                <span className="text-gray-500">Target Close</span>
                <span className="font-medium text-gray-900">August 15</span>

                <span className="text-gray-500">Employees</span>
                <span className="font-medium text-gray-900">1,200</span>

                <span className="text-gray-500">Industry</span>
                <span className="font-medium text-gray-900">B2B SaaS company</span>

                <span className="text-gray-500">Location:</span>
                <span className="font-medium text-gray-900">Austin, TX</span>
              </div>
            </div>
          </Card>

          {/* MEDDIC */}
          <Card className="shadow-none border border-[#E6EBEC]">
            <div className="flex items-center gap-2 border-b border-[#E6EBEC] px-4 py-3 bg-white rounded-t-xl">
              <FileText className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium text-gray-900">MEDDIC</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-[140px_1fr] gap-y-6 text-sm">
                <span className="text-gray-500">Metrics</span>
                <span className="text-gray-900">25% reduction in reporting time (~$250K/year cost savings)</span>

                <span className="text-gray-500">Economic Buyer</span>
                <span className="text-gray-900">Jane Smith, CFO</span>

                <span className="text-gray-500">Decision Criteria</span>
                <div className="text-gray-900 space-y-1">
                  <p>Financial: &lt;$300K TCV</p>
                  <p>Technical: Must integrate with Salesforce</p>
                  <p>Vendor: Needs EMEA support references</p>
                </div>

                <span className="text-gray-500">Decision Process</span>
                <span className="text-gray-900">Internal demo → CFO approval → Procurement sign-off</span>

                <span className="text-gray-500">Identify Pain</span>
                <span className="text-gray-900">Current reporting takes 3 full days, delaying board updates</span>

                <span className="text-gray-500">Champion</span>
                <span className="text-gray-900">Champion → VP of Operations (Michael Chen)</span>
              </div>
            </div>
          </Card>

          {/* Spacer for bottom input */}
          <div className="h-[200px]"></div>

        </div>

        {/* Bottom Input - Sticky */}
        <div className={`absolute bottom-0 left-0 px-8 py-4 bg-gradient-to-t from-white via-white to-transparent z-10 ${showSummary ? 'w-[35%]' : 'w-full'}`}>
          <div className="max-w-3xl mx-auto">
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
                  placeholder="Ask Chief about this meeting" 
                  className="w-full bg-transparent outline-none placeholder:text-gray-400 text-sm"
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
      
      {/* Summary Panel - Slides in from right */}
      <div className={`absolute top-3 right-3 bottom-3 w-[64%] shadow-xl transform transition-transform duration-500 ease-in-out z-20 ${showSummary ? 'translate-x-0' : 'translate-x-[110%]'}`}>
        <div className="h-full w-full bg-white rounded-xl overflow-hidden border border-[#E6EBEC]">
          <MeetingSummary onBack={() => setShowSummary(false)} isPanel={true} />
        </div>
      </div>
    </div>
  );
}
