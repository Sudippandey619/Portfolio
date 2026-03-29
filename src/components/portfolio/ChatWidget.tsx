import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
}

interface QuickReply {
  id: string;
  label: string;
  response: string;
}

const quickReplies: QuickReply[] = [
  {
    id: "about",
    label: "Tell me about yourself",
    response: "Hi! I'm Sudip Pandey, a passionate Full-Stack Developer with 3+ years of experience. I specialize in building modern web applications using React, Next.js, Node.js, and MongoDB. I love turning ideas into reality through clean, efficient code!"
  },
  {
    id: "skills",
    label: "What are your skills?",
    response: "I'm proficient in React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, and various other technologies. I also have experience with cloud services like AWS and deployment platforms like Vercel and Railway."
  },
  {
    id: "experience",
    label: "Your work experience?",
    response: "I've worked on various projects ranging from e-commerce platforms to content management systems. Currently, I focus on building scalable full-stack applications and contributing to open-source projects."
  },
  {
    id: "contact",
    label: "How can I contact you?",
    response: "You can reach me via email at pandeysudip619@gmail.com or connect with me on LinkedIn. I'm always open to discussing new opportunities and interesting projects!"
  },
  {
    id: "availability",
    label: "Are you available for work?",
    response: "Yes! I'm currently open to new opportunities. Whether it's a full-time position, freelance project, or collaboration, I'd love to hear about it. Let's connect!"
  }
];

const initialMessage: Message = {
  id: 0,
  type: "bot",
  content: "Hey there! 👋 I'm Sudip's virtual assistant. How can I help you today? Feel free to ask me anything!"
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message
    const userMessage: Message = {
      id: messages.length,
      type: "user",
      content: reply.label
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: messages.length + 1,
        type: "bot",
        content: reply.response
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 500);
  };

  const resetChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <MessageCircle className="h-6 w-6" />
        <motion.span
          className="absolute -top-1 -right-1 w-4 h-4 bg-mint rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-card rounded-2xl shadow-card border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Chat with Sudip</h3>
                  <span className="text-xs text-primary-foreground/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetChat}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8"
                >
                  <Send className="h-4 w-4 rotate-180" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot' ? 'bg-primary/10 text-primary' : 'bg-mint/20 text-mint-foreground'
                    }`}>
                      {message.type === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      message.type === 'bot' 
                        ? 'bg-muted text-foreground rounded-tl-sm' 
                        : 'bg-primary text-primary-foreground rounded-tr-sm'
                    }`}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-tl-sm flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            <div className="p-3 border-t border-border bg-background/50">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <motion.button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isTyping}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reply.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
