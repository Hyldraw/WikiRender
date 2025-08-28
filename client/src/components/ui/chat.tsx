
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MessageCircle, Heart, Reply } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
  replies?: ChatMessage[];
}

interface ChatProps {
  contentId: string;
  contentTitle: string;
}

export function Chat({ contentId, contentTitle }: ChatProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages and user name from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${contentId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const savedUserName = localStorage.getItem('chat_username');
    if (savedUserName) {
      setUserName(savedUserName);
      setIsNameSet(true);
    }
  }, [contentId]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveMessages = (updatedMessages: ChatMessage[]) => {
    localStorage.setItem(`chat_${contentId}`, JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const handleSetName = () => {
    if (userName.trim()) {
      localStorage.setItem('chat_username', userName.trim());
      setIsNameSet(true);
      toast({ title: "Nome definido! Agora você pode participar do chat." });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: newMessage.trim(),
      timestamp: new Date(),
      likes: 0,
      liked: false,
      replies: []
    };

    const updatedMessages = [...messages, message];
    saveMessages(updatedMessages);
    setNewMessage("");
    toast({ title: "Mensagem enviada!" });
  };

  const handleSendReply = (parentId: string) => {
    if (!replyMessage.trim()) return;

    const reply: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: replyMessage.trim(),
      timestamp: new Date(),
      likes: 0,
      liked: false
    };

    const updatedMessages = messages.map(msg => {
      if (msg.id === parentId) {
        return {
          ...msg,
          replies: [...(msg.replies || []), reply]
        };
      }
      return msg;
    });

    saveMessages(updatedMessages);
    setReplyMessage("");
    setReplyingTo(null);
    toast({ title: "Resposta enviada!" });
  };

  const handleLike = (messageId: string, isReply: boolean = false, parentId?: string) => {
    const updatedMessages = messages.map(msg => {
      if (isReply && msg.id === parentId) {
        return {
          ...msg,
          replies: msg.replies?.map(reply => {
            if (reply.id === messageId) {
              return {
                ...reply,
                liked: !reply.liked,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      } else if (msg.id === messageId) {
        return {
          ...msg,
          liked: !msg.liked,
          likes: msg.liked ? msg.likes - 1 : msg.likes + 1
        };
      }
      return msg;
    });

    saveMessages(updatedMessages);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!isNameSet) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Chat sobre {contentTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Para participar do chat, primeiro defina seu nome:
          </p>
          <div className="flex space-x-2">
            <Input
              placeholder="Seu nome..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSetName()}
            />
            <Button onClick={handleSetName} disabled={!userName.trim()}>
              Definir Nome
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>Chat sobre {contentTitle}</span>
          <span className="text-sm text-muted-foreground">({messages.length} mensagens)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto space-y-4 p-4 bg-muted/30 rounded-lg">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Seja o primeiro a comentar sobre {contentTitle}!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {/* Main Message */}
                <div className="bg-background rounded-lg p-3 border">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(message.user)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm">{message.user}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLike(message.id)}
                          className="h-6 px-2"
                        >
                          <Heart className={`h-3 w-3 mr-1 ${message.liked ? 'fill-current text-red-500' : ''}`} />
                          {message.likes}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setReplyingTo(message.id)}
                          className="h-6 px-2"
                        >
                          <Reply className="h-3 w-3 mr-1" />
                          Responder
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {message.replies && message.replies.length > 0 && (
                  <div className="ml-8 space-y-2">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="bg-muted rounded-lg p-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {getInitials(reply.user)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-xs">{reply.user}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs">{reply.message}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleLike(reply.id, true, message.id)}
                              className="h-5 px-1 mt-1"
                            >
                              <Heart className={`h-2 w-2 mr-1 ${reply.liked ? 'fill-current text-red-500' : ''}`} />
                              {reply.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input */}
                {replyingTo === message.id && (
                  <div className="ml-8">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Digite sua resposta..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply(message.id)}
                        className="text-sm"
                      />
                      <Button size="sm" onClick={() => handleSendReply(message.id)}>
                        <Send className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Logado como: <strong>{userName}</strong>
        </p>
      </CardContent>
    </Card>
  );
}
