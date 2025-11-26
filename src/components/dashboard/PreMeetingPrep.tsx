import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProposalReviewSummary } from "./ProposalReviewSummary";
import { ChiefChatPopup } from "./ChiefChatPopup";
import { 
  ChevronLeft, 
  Video, 
  Calendar, 
  Building2, 
  FileText,
  X,
  MoreHorizontal,
  Sparkles,
  Linkedin,
  UserPlus,
  UserMinus,
  Newspaper,
  TrendingUp,
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Repeat2
} from "lucide-react";
import Image from "next/image";

interface PreMeetingPrepProps {
  onBack: () => void;
  onChatStart?: (message: string) => void;
}

export function PreMeetingPrep({ onBack, onChatStart }: PreMeetingPrepProps) {
  const [showSummary, setShowSummary] = useState(false);
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
      <div className={`flex flex-col h-full bg-white rounded-xl border border-[#E6EBEC] shadow-sm overflow-y-auto transition-all duration-500 ease-in-out ${showSummary ? 'w-[64%] mr-3' : 'w-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E6EBEC] px-8 py-6 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-8 w-8 rounded-full hover:bg-gray-100 border border-gray-200">
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
          <Card className="shadow-none border border-[#E6EBEC] p-0">
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
          <Card className="shadow-none border border-[#E6EBEC] p-0">
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
          <Card className="shadow-none border border-[#E6EBEC] p-0">
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

          {/* LinkedIn Latest Posts */}
          <Card className="shadow-none border border-[#E6EBEC] p-0">
            <div className="flex items-center justify-between border-b border-[#E6EBEC] px-4 py-3 bg-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                <h3 className="font-medium text-gray-900">LinkedIn Latest Posts</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-500 hover:text-gray-900">
                View all <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {/* Post 1 */}
              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                    <Image 
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=200&auto=format&fit=crop" 
                      alt="Post preview" 
                      width={64} 
                      height={64} 
                      className="h-full w-full object-cover opacity-80"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900 text-sm">Jane Smith</span>
                      <span className="text-xs text-gray-500">• CFO at Acme Corp</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Excited to share that we've just closed our Series C! 🎉 Looking forward to scaling our operations and bringing more value to our customers...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> 234</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> 45</span>
                      <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3" /> 12</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Post 2 */}
              <div className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                    <Image 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop" 
                      alt="Post preview" 
                      width={64} 
                      height={64} 
                      className="h-full w-full object-cover opacity-80"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/vercel.png" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900 text-sm">Michael Chen</span>
                      <span className="text-xs text-gray-500">• VP Operations at Acme Corp</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      Great insights from our Q3 planning session. The team is aligned on reducing operational overhead by 25% through better tooling...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> 89</span>
                      <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> 18</span>
                      <span className="flex items-center gap-1"><Repeat2 className="h-3 w-3" /> 5</span>
                      <span>5 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* LinkedIn Team Changes */}
          <Card className="shadow-none border border-[#E6EBEC] p-0">
            <div className="flex items-center justify-between border-b border-[#E6EBEC] px-4 py-3 bg-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                <h3 className="font-medium text-gray-900">Team Changes</h3>
              </div>
              <span className="text-xs text-gray-500">Last 30 days</span>
            </div>
            <div className="p-4 space-y-3">
              {/* Joined */}
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="relative h-8 w-8 shrink-0">
                  <Avatar className="h-8 w-8 border-2 border-white ring-1 ring-green-100">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-100 border border-white flex items-center justify-center">
                    <UserPlus className="h-2.5 w-2.5 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">Sarah Williams</span>
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Joined</span>
                  </div>
                  <p className="text-xs text-gray-600">Head of Engineering • Previously at Stripe</p>
                </div>
                <span className="text-xs text-gray-500">2 weeks ago</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="relative h-8 w-8 shrink-0">
                  <Avatar className="h-8 w-8 border-2 border-white ring-1 ring-green-100">
                    <AvatarImage src="https://github.com/vercel.png" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-100 border border-white flex items-center justify-center">
                    <UserPlus className="h-2.5 w-2.5 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">David Park</span>
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded">Joined</span>
                  </div>
                  <p className="text-xs text-gray-600">Senior Product Manager • Previously at Notion</p>
                </div>
                <span className="text-xs text-gray-500">3 weeks ago</span>
              </div>

              {/* Left */}
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="relative h-8 w-8 shrink-0">
                  <Avatar className="h-8 w-8 border-2 border-white ring-1 ring-red-100">
                    <AvatarImage src="https://github.com/nextjs.png" />
                    <AvatarFallback>TA</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-red-100 border border-white flex items-center justify-center">
                    <UserMinus className="h-2.5 w-2.5 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">Tom Anderson</span>
                    <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 rounded">Left</span>
                  </div>
                  <p className="text-xs text-gray-600">Director of Sales • Now at Figma</p>
                </div>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </div>
          </Card>

          {/* Company News & Updates */}
          <Card className="shadow-none border border-[#E6EBEC] p-0">
            <div className="flex items-center justify-between border-b border-[#E6EBEC] px-4 py-3 bg-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Company News & Updates</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-500 hover:text-gray-900">
                View all <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="p-4 space-y-3">
              {/* Funding News */}
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">Series C Funding</span>
                    <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">Funding</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Acme Corp raises $85M Series C led by Andreessen Horowitz</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>TechCrunch</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>

              {/* Product Launch */}
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">Product Launch</span>
                    <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">Product</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Acme Corp launches AI-powered analytics dashboard for enterprise customers</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Business Wire</span>
                    <span>•</span>
                    <span>1 week ago</span>
                  </div>
                </div>
              </div>

              {/* Partnership */}
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">Strategic Partnership</span>
                    <span className="text-xs px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded">Partnership</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Acme Corp partners with Salesforce to expand CRM integrations</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>PR Newswire</span>
                    <span>•</span>
                    <span>2 weeks ago</span>
                  </div>
                </div>
              </div>

              {/* Award */}
              <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center shrink-0">
                  <span className="text-lg">🏆</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 text-sm">Industry Recognition</span>
                    <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">Award</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Named to Forbes Cloud 100 list for second consecutive year</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Forbes</span>
                    <span>•</span>
                    <span>3 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Spacer for bottom input */}
          <div className="h-[200px]"></div>

        </div>

        {/* Bottom Input - Sticky */}
        {!showChatPopup && (
          <div className={`absolute bottom-0 left-0 px-8 py-4 bg-gradient-to-t from-white via-white to-transparent z-10 ${showSummary ? 'w-[64%]' : 'w-full'}`}>
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
        )}

        {/* Chat Popup */}
        <ChiefChatPopup 
          isOpen={showChatPopup}
          onClose={() => setShowChatPopup(false)}
          onViewFullChat={handleViewFullChat}
          initialMessage={initialChatMessage}
          contextTitle="this meeting prep"
        />
      </div>
      
      {/* Summary Panel - Slides in from right */}
      <div className={`absolute top-3 right-3 bottom-3 w-[35%] shadow-xl transform transition-transform duration-500 ease-in-out z-20 ${showSummary ? 'translate-x-0' : 'translate-x-[110%]'}`}>
        <div className="h-full w-full bg-white rounded-xl overflow-hidden border border-[#E6EBEC]">
          <ProposalReviewSummary onBack={() => setShowSummary(false)} isPanel={true} />
        </div>
      </div>
    </div>
  );
}
