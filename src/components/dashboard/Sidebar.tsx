import { 
  MessageSquare, 
  Inbox, 
  Calendar, 
  Target, 
  FileText, 
  User,
  Sparkles,
  Command
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Sidebar() {
  return (
    <div className="flex h-screen w-16 flex-col items-center justify-between bg-[#022c22] py-6 text-white">
      <div className="flex flex-col items-center gap-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300">
          <Command className="h-6 w-6" />
        </div>
        
        <nav className="flex flex-col gap-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <MessageSquare className="h-6 w-6" />
          </button>
          <button className="relative text-white">
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-teal-400"></div>
            <Inbox className="h-6 w-6" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Calendar className="h-6 w-6" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Target className="h-6 w-6" />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FileText className="h-6 w-6" />
          </button>
        </nav>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}





