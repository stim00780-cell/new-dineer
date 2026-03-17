'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Bot, Send, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { aiChatbot } from '@/ai/ai-chatbot';

type Message = {
    role: 'user' | 'bot';
    text: string;
};

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const { response } = await aiChatbot({ query: input });
            const botMessage: Message = { role: 'bot', text: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('AI Chatbot Error:', error);
            const errorMessage: Message = {
                role: 'bot',
                text: 'Sorry, I am having trouble connecting. Please try again later.',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    size="icon"
                    className="rounded-full w-14 h-14"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Bot className="h-6 w-6" />
                    <span className="sr-only">Toggle Chatbot</span>
                </Button>
            </div>
            {isOpen && (
                <div className="fixed bottom-20 right-4 z-50">
                    <Card className="w-80 md:w-96 shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot /> AI Assistant
                            </CardTitle>
                            <CardDescription>
                                Ask me about the menu or our services!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'flex items-start gap-2',
                                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    {msg.role === 'bot' && (
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                                            <Bot size={20} />
                                        </div>
                                    )}
                                    <div
                                        className={cn(
                                            'p-3 rounded-lg max-w-[80%]',
                                            msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                        )}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                         <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                                            <UserIcon size={20} />
                                        </div>
                                    )}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-start gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                                        <Bot size={20} />
                                    </div>
                                    <div className="p-3 rounded-lg bg-muted flex items-center">
                                       <div className="flex space-x-1">
                                            <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </CardContent>
                        <CardFooter>
                            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                                <Input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
