import { MoreVertical, Search, Paperclip, CheckSquare, BellOff, Clock, XCircle, Flag, Ban, Trash2, Info } from 'lucide-react';
import MessageBubble from '../chat/MessageBubble';
import MessageInput from '../chat/MessageInput';
import { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ chatId }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "BICEPS Exercises (Brutal Stretch!)", time: "10:25 pm", sender: "other", isLink: true },
        { id: 2, text: "https://youtube.com/shorts/JsF_0...", time: "10:25 pm", sender: "other", isLink: true },
        { id: 3, text: "https://www.youtube.com/shorts/Chg...", time: "6:35 pm", sender: "me", isLink: true, status: 'read' },
        { id: 4, text: "NiagaraLauncherBackup-2025...", time: "8:45 am", sender: "me", isFile: true, size: "2 MB", status: 'read' },
    ]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

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
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: "me",
            status: 'sent'
        };
        setMessages([...messages, newMessage]);
    };

    const MenuItem = ({ icon: Icon, text, danger = false }) => (
        <button className={`w-full px-4 py-2.5 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[14.5px] ${danger ? 'text-[#f15c6d]' : 'text-[#3b4a54] dark:text-[#d1d7db]'}`}>
            {Icon && <Icon className={`w-5 h-5 ${danger ? 'text-[#f15c6d]' : 'text-[#54656f]'}`} strokeWidth={1.5} />}
            {text}
        </button>
    );

    return (
        <div className="flex flex-col h-full w-full bg-[#efeae2] dark:bg-[#0b141a] relative">
            <div className="absolute inset-0 z-0 opacity-[0.4] bg-repeat pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}></div>

            <div className="h-16 px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center justify-between shadow-sm relative z-10">
                <div className="flex items-center gap-4 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chatId}`} alt="User" />
                    </div>
                    <div>
                        <h2 className="text-[#111b21] dark:text-[#e9edef] font-medium text-base">User {chatId}</h2>
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

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar z-10 flex flex-col gap-1">
                <div className="flex justify-center mb-4 sticky top-2 z-20">
                    <span className="bg-[#fff] dark:bg-[#182229] px-3 py-1 rounded-lg text-xs text-gray-500 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-800">Today</span>
                </div>

                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg.text} isOwn={msg.isOwn} time={msg.time} />
                ))}
            </div>

            <div className="z-10">
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );
};

export default ChatWindow;
