import { Badge } from "@/components/ui/badge";
import { Brain, Briefcase, FileText, Code, CheckCircle, PenTool, TrendingUp, Bot } from "lucide-react";

type AgentType = "researcher" | "pm" | "marketer" | "developer" | "qa" | "copywriter" | "sales" | string;

interface AgentBadgeProps {
  type: AgentType | null | undefined;
  className?: string;
}

export function AgentBadge({ type, className = "" }: AgentBadgeProps) {
  if (!type) return <Badge variant="outline" className={`text-xs ${className}`}>Unassigned</Badge>;

  const t = type.toLowerCase();
  
  let Icon = Bot;
  let colorClass = "bg-gray-500/10 text-gray-500 border-gray-500/20";

  switch (t) {
    case "researcher":
      Icon = Brain;
      colorClass = "bg-purple-500/10 text-purple-400 border-purple-500/20";
      break;
    case "pm":
      Icon = Briefcase;
      colorClass = "bg-blue-500/10 text-blue-400 border-blue-500/20";
      break;
    case "marketer":
      Icon = TrendingUp;
      colorClass = "bg-orange-500/10 text-orange-400 border-orange-500/20";
      break;
    case "developer":
      Icon = Code;
      colorClass = "bg-green-500/10 text-green-400 border-green-500/20";
      break;
    case "qa":
      Icon = CheckCircle;
      colorClass = "bg-red-500/10 text-red-400 border-red-500/20";
      break;
    case "copywriter":
      Icon = PenTool;
      colorClass = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      break;
    case "sales":
      Icon = FileText;
      colorClass = "bg-teal-500/10 text-teal-400 border-teal-500/20";
      break;
    default:
      Icon = Bot;
      colorClass = "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }

  return (
    <Badge variant="outline" className={`flex items-center gap-1 font-medium capitalize text-xs ${colorClass} ${className}`} data-testid={`badge-agent-${t}`}>
      <Icon className="w-3 h-3" />
      {type}
    </Badge>
  );
}
