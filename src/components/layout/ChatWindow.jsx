import { MoreVertical, Search, Paperclip, CheckSquare, BellOff, Clock, XCircle, Flag, Ban, Trash2, Info } from 'lucide-react';
import MessageBubble from '../chat/MessageBubble';
import MessageInput from '../chat/MessageInput';
import { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ chatId }) => {
    // Initial data from the screenshots
    const lilBrotherMessages = [
        { id: 1, text: "Hey! Have you seen Whatsapp Web feature?", time: "02:00", sender: "me", status: 'read', date: "2015-01-22" },
        { id: 2, text: "Yeah...Awsummmmmm 😃😃😍", time: "02:01", sender: "other", date: "2015-01-22" },
        { id: 3, text: "Find more details on http://thehackernews.com/ , I have just published an article about it.", time: "02:01", sender: "me", status: 'read', date: "2015-01-22" },

        // Second conversation block (Lil Brother)
        { id: 4, text: "Kaha hoo bhai", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 5, text: "new ghar the", time: "7:53 pm", sender: "other", date: "2023-10-25" },
        { id: 6, text: "bhaar se deka", time: "7:53 pm", sender: "other", date: "2023-10-25" },
        { id: 7, text: "abh otw to rangoon", time: "7:53 pm", sender: "other", date: "2023-10-25" },
        { id: 8, text: "Abbey lool.", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 9, text: "Chaabi hee le lete.", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 10, text: "cool.", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 11, text: "No fries. Laana hei toh falafel works only if it's good :)", time: "7:54 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 12, text: "brining falafel", time: "7:54 pm", sender: "other", date: "2023-10-25" },
    ];

    const genericMessages = [
        { id: 1, text: "Hey there! I am using WhatsApp.", time: "10:00 am", sender: "other", date: "2025-01-12" },
        { id: 2, text: "Hello! How are you?", time: "10:05 am", sender: "me", status: 'read', date: "2025-01-12" }
    ];

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId === 'LilBrother') {
            setMessages(lilBrotherMessages);
        } else {
            setMessages(genericMessages);
        }
    }, [chatId]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom on load
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSend = (text) => {
        const newMessage = {
            id: messages.length + 1,
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
            sender: "me",
            status: 'sent',
            date: new Date().toISOString().split('T')[0]
        };
        setMessages([...messages, newMessage]);
    };

    const MenuItem = ({ icon: Icon, text, danger = false }) => (
        <button className={`w-full px-4 py-2.5 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[14.5px] ${danger ? 'text-[#f15c6d]' : 'text-[#3b4a54] dark:text-[#d1d7db]'}`}>
            {Icon && <Icon className={`w-5 h-5 ${danger ? 'text-[#f15c6d]' : 'text-[#54656f]'}`} strokeWidth={1.5} />}
            {text}
        </button>
    );

    // Group messages by date
    const groupMessagesByDate = (msgs) => {
        const groups = {};
        msgs.forEach(msg => {
            const date = msg.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(msg);
        });
        return groups;
    };

    const groupedMessages = groupMessagesByDate(messages);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options).toUpperCase();
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#efeae2] dark:bg-[#0b141a] relative">
            <div className="absolute inset-0 z-0 opacity-[0.4] bg-repeat pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}></div>

            <div className="h-16 px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center justify-between shadow-sm relative z-10 border-l border-gray-300 dark:border-gray-700">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chatId}`} alt="User" />
                    </div>
                    <div>
                        <h2 className="text-[#111b21] dark:text-[#e9edef] font-medium text-base">
                            {chatId === 'LilBrother' ? 'Lil Brother' : `User ${chatId}`}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">online</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 relative">
                    <button><Search className="w-5 h-5" /></button>
                    <button
                        className={`p-1.5 rounded-full transition-colors ${isMenuOpen ? 'bg-gray-200 dark:bg-[#374248]' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                        <div ref={menuRef} className="absolute top-10 right-0 w-64 bg-white dark:bg-[#233138] rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 border border-gray-100 dark:border-[#202c33] origin-top-right">
                            <MenuItem icon={Info} text="Contact info" />
                            <MenuItem icon={CheckSquare} text="Select messages" />
                            <MenuItem icon={BellOff} text="Mute notifications" />
                            <MenuItem icon={Clock} text="Disappearing messages" />
                            <MenuItem icon={XCircle} text="Close chat" />
                            <div className="my-1 border-b border-gray-100 dark:border-[#37404a]"></div>
                            <MenuItem icon={Flag} text="Report" />
                            <MenuItem icon={Ban} text="Block" />
                            <MenuItem icon={Trash2} text="Clear chat" />
                            <MenuItem icon={Trash2} text="Delete chat" danger={true} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:px-[5%] custom-scrollbar z-10 flex flex-col gap-1">
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                    <div key={date} className="flex flex-col">
                        <div className="flex justify-center mb-2 mt-2 sticky top-2 z-20">
                            <span className="bg-[#fff] dark:bg-[#182229] px-3 py-1.5 rounded-lg text-xs font-medium text-[#54656f] dark:text-[#8696a0] shadow-sm uppercase tracking-wide">
                                {formatDate(date)}
                            </span>
                        </div>
                        {msgs.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg.text}
                                isOwn={msg.sender === 'me'}
                                time={msg.time}
                                status={msg.status}
                            />
                        ))}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="z-10 bg-[#f0f2f5] dark:bg-[#202c33]">
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );
};

export default ChatWindow;
