import { useRoute, Link } from "wouter";
import { 
  useGetTask, 
  getGetTaskQueryKey,
  useUpdateTask,
  useListTaskComments,
  getListTaskCommentsQueryKey,
  useCreateTaskComment,
  useGetBusiness,
  getGetBusinessQueryKey,
  TaskStatus,
  CreateTaskCommentBodyAuthor
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentBadge } from "@/components/agent-badge";
import { ArrowLeft, Send, AlertCircle, Loader2, Bot, User, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TaskDetail() {
  const [, params] = useRoute("/businesses/:id/tasks/:taskId");
  const businessId = params?.id ? parseInt(params.id) : 0;
  const taskId = params?.taskId ? parseInt(params.taskId) : 0;
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: business } = useGetBusiness(businessId, {
    query: { enabled: !!businessId, queryKey: getGetBusinessQueryKey(businessId) }
  });

  const { data: task, isLoading: isLoadingTask } = useGetTask(taskId, {
    query: { enabled: !!taskId, queryKey: getGetTaskQueryKey(taskId) }
  });

  const { data: comments, isLoading: isLoadingComments } = useListTaskComments(taskId, {
    query: { enabled: !!taskId, queryKey: getListTaskCommentsQueryKey(taskId), refetchInterval: 5000 }
  });

  const updateTask = useUpdateTask();
  const createComment = useCreateTaskComment();
  
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTask.mutate({ id: taskId, data: { status: newStatus } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTaskQueryKey(taskId) });
        toast({ title: "Task Updated", description: `Status changed to ${newStatus}` });
      }
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    createComment.mutate({ 
      id: taskId, 
      data: { 
        author: 'user' as CreateTaskCommentBodyAuthor, 
        content: newComment 
      } 
    }, {
      onSuccess: () => {
        setNewComment("");
        setIsSubmitting(false);
        queryClient.invalidateQueries({ queryKey: getListTaskCommentsQueryKey(taskId) });
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to post comment.", variant: "destructive" });
        setIsSubmitting(false);
      }
    });
  };

  if (isLoadingTask) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-bold">Task Not Found</h2>
        <Link href={`/businesses/${businessId}`}>
          <Button variant="outline">Return to Business</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 max-w-5xl mx-auto h-full flex flex-col">
      <div className="flex items-center gap-4">
        <Link href={`/businesses/${businessId}`}>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="text-xs text-primary font-mono uppercase mb-1">
            {business?.name} / TASK-{task.id}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase" data-testid="heading-task-title">{task.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2 pb-8">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-mono uppercase">Briefing</CardTitle>
                <div className="flex gap-2">
                  <AgentBadge type={task.agentType} />
                  <Badge variant={task.priority === 'critical' ? 'destructive' : task.priority === 'high' ? 'default' : 'secondary'} className="uppercase font-mono">
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-xs text-muted-foreground font-mono uppercase mb-2">Description</h4>
                <div className="bg-muted/20 p-4 rounded-md border border-border/30 text-sm whitespace-pre-wrap text-foreground leading-relaxed">
                  {task.description}
                </div>
              </div>
              
              {task.deliverables && (
                <div>
                  <h4 className="text-xs text-muted-foreground font-mono uppercase mb-2 text-primary">Required Deliverables</h4>
                  <div className="bg-primary/5 p-4 rounded-md border border-primary/20 text-sm whitespace-pre-wrap text-primary-foreground leading-relaxed">
                    {task.deliverables}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 flex flex-col min-h-[400px]">
            <CardHeader className="border-b border-border/30 pb-4">
              <CardTitle className="text-lg font-mono uppercase">Comm Link</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-y-auto bg-background/50">
              {isLoadingComments ? (
                <div className="p-8 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary/50" /></div>
              ) : comments && comments.length > 0 ? (
                <div className="p-4 space-y-4" data-testid="comment-thread">
                  {comments.map((comment) => (
                    <div key={comment.id} className={`flex gap-3 ${comment.author === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        comment.author === 'user' ? 'bg-primary/20 text-primary border border-primary/30' : 
                        comment.author === 'orchestrator' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {comment.author === 'user' ? <User className="h-4 w-4" /> : 
                         comment.author === 'orchestrator' ? <Cpu className="h-4 w-4" /> :
                         <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`flex flex-col max-w-[80%] ${comment.author === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-mono font-medium text-muted-foreground capitalize">
                            {comment.author === 'agent' ? (comment.agentType || 'Agent') : comment.author}
                          </span>
                          <span className="text-[10px] text-muted-foreground/50 font-mono">
                            {new Date(comment.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${
                          comment.author === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 
                          'bg-muted/50 border border-border/50 text-foreground rounded-tl-none'
                        }`}>
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-muted-foreground font-mono text-sm uppercase">
                  No comms established yet.
                </div>
              )}
            </CardContent>
            <CardFooter className="p-4 border-t border-border/30 bg-card">
              <div className="flex w-full gap-2">
                <Textarea 
                  placeholder="Direct input to agent..." 
                  className="min-h-[40px] h-[40px] py-2 resize-none border-primary/20 focus-visible:ring-primary/50 font-mono text-sm"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  data-testid="input-comment"
                />
                <Button 
                  size="icon" 
                  onClick={handleAddComment} 
                  disabled={isSubmitting || !newComment.trim()}
                  className="h-10 w-10 shrink-0"
                  data-testid="button-submit-comment"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Task Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant={task.status === 'open' ? 'default' : 'outline'} 
                  className={`w-full justify-start font-mono uppercase ${task.status === 'open' ? 'bg-primary/20 text-primary border-primary hover:bg-primary/30' : ''}`}
                  onClick={() => handleStatusChange('open')}
                >
                  <div className="w-2 h-2 rounded-full bg-current mr-2" />
                  Open
                </Button>
                <Button 
                  variant={task.status === 'in_progress' ? 'default' : 'outline'} 
                  className={`w-full justify-start font-mono uppercase ${task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500 hover:bg-blue-500/30' : ''}`}
                  onClick={() => handleStatusChange('in_progress')}
                >
                  <div className="w-2 h-2 rounded-full bg-current mr-2" />
                  In Progress
                </Button>
                <Button 
                  variant={task.status === 'closed' ? 'default' : 'outline'} 
                  className={`w-full justify-start font-mono uppercase ${task.status === 'closed' ? 'bg-green-500/20 text-green-400 border-green-500 hover:bg-green-500/30' : ''}`}
                  onClick={() => handleStatusChange('closed')}
                >
                  <div className="w-2 h-2 rounded-full bg-current mr-2" />
                  Closed
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Meta Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-mono mb-1">Assigned Identity</p>
                <p className="text-sm font-semibold">{task.assignedAgent || 'Awaiting Assignment'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-mono mb-1">Est. Cycle Time</p>
                <p className="text-sm font-semibold">{task.estimatedHours ? `${task.estimatedHours} Hours` : 'TBD'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-mono mb-1">Target Deadline</p>
                <p className="text-sm font-semibold">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None Set'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
