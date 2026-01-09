import { Plus, Smile, Mic, Send, Paperclip, FileText, Image as ImageIcon, Camera, Headphones, User, BarChart2, Calendar, Sticker, Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const [showAttachments, setShowAttachments] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const attachmentRef = useRef(null);
    const emojiRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (attachmentRef.current && !attachmentRef.current.contains(event.target)) {
                setShowAttachments(false);
            }
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const AttachmentItem = ({ icon: Icon, text, colorClass, gradient }) => (
        <button className="flex items-center gap-3 w-full p-2.5 hover:bg-gray-100 dark:hover:bg-[#182229] rounded-lg transition-colors group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${gradient ? gradient : ''} ${colorClass}`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="text-[#3b4a54] dark:text-[#d1d7db] text-sm font-medium">{text}</span>
        </button>
    );

    return (
        <div className="px-4 py-3 bg-[#f0f2f5] dark:bg-[#202c33] flex items-end gap-2 relative z-20">
            {showAttachments && (
                <div
                    ref={attachmentRef}
                    className="absolute bottom-16 left-4 bg-white dark:bg-[#233138] rounded-2xl shadow-xl w-60 py-2 animate-in fade-in zoom-in-95 duration-200 z-50 bottom-origin"
                >
                    <div className="flex flex-col gap-1 p-2">
                        <AttachmentItem icon={FileText} text="Document" colorClass="bg-gradient-to-br from-indigo-500 to-purple-600" />
                        <AttachmentItem icon={ImageIcon} text="Photos & videos" colorClass="bg-gradient-to-br from-blue-500 to-blue-600" />
                        <AttachmentItem icon={Camera} text="Camera" colorClass="bg-gradient-to-br from-pink-500 to-rose-500" />
                        <AttachmentItem icon={Headphones} text="Audio" colorClass="bg-gradient-to-br from-orange-400 to-orange-600" />
                        <AttachmentItem icon={User} text="Contact" colorClass="bg-gradient-to-br from-blue-400 to-cyan-500" />
                        <AttachmentItem icon={BarChart2} text="Poll" colorClass="bg-gradient-to-br from-yellow-400 to-yellow-600" />
                        <AttachmentItem icon={Calendar} text="Event" colorClass="bg-gradient-to-br from-teal-400 to-teal-600" />
                        <AttachmentItem icon={Sticker} text="New sticker" colorClass="bg-gradient-to-br from-green-400 to-emerald-600" />
                    </div>
                </div>
            )}

            {showEmojiPicker && (
                <div
                    ref={emojiRef}
                    className="absolute bottom-16 left-0 bg-[#f0f2f5] dark:bg-[#233138] rounded-xl shadow-2xl w-[350px] h-[400px] flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200 z-50 border border-gray-200 dark:border-[#37404a]"
                >
                    <div className="flex items-start justify-between px-2 pt-2 pb-1 border-b border-gray-200 dark:border-[#37404a] bg-[#f0f2f5] dark:bg-[#111b21] rounded-t-xl">
                        <div className="flex gap-4 px-2">
                            <button className="p-2 border-b-2 border-[#00a884] text-[#41525d] dark:text-[#e9edef]"><Smile className="w-5 h-5" /></button>
                            <button className="p-2 text-[#8696a0] hover:text-[#41525d] dark:hover:text-[#e9edef]"><Sticker className="w-5 h-5" /></button>
                            <button className="p-2 text-[#8696a0] hover:text-[#41525d] dark:hover:text-[#e9edef]">GIF</button>
                        </div>
                    </div>

                    <div className="p-2 bg-[#f0f2f5] dark:bg-[#111b21]">
                        <div className="relative">
                            <Search className="absolute left-3 top-2 w-4 h-4 text-[#8696a0]" />
                            <input
                                type="text"
                                placeholder="Search emoji"
                                className="w-full bg-white dark:bg-[#202c33] rounded-lg py-1.5 pl-9 pr-4 text-sm text-[#3b4a54] dark:text-[#d1d7db] placeholder-[#8696a0] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f0f2f5] dark:bg-[#111b21] p-2">
                        <h4 className="text-xs font-medium text-[#8696a0] mb-2 px-2">Smileys & People</h4>
                        <div className="grid grid-cols-7 gap-1">
                            {['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '🫠', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🫢', '🫣', '🤫', '🤔', '🫡', '🤐', '🤨', '😐', '😑', '😶', '🫥', '😏', '😒', '🙄', '😬', '🤥', '🫨', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧'].map(emoji => (
                                <button key={emoji} onClick={() => setMessage(prev => prev + emoji)} className="text-2xl hover:bg-gray-200 dark:hover:bg-[#202c33] rounded p-1 transition-colors">
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <button
                className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${showAttachments ? 'rotate-45 bg-[#d1d7db] dark:bg-[#374248]' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setShowAttachments(!showAttachments)}
            >
                <Plus className={`w-6 h-6 transition-transform duration-200`} />
            </button>
            <button
                className={`p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${showEmojiPicker ? 'text-[#00a884]' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
                {showEmojiPicker ? <X className="w-6 h-6" /> : <Smile className="w-6 h-6" />}
            </button>

            <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg flex items-center px-4 py-2">
                <input
                    type="text"
                    placeholder="Type a message"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-[15px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {message.trim() ? (
                <button
                    onClick={handleSend}
                    className="p-2 rounded-full bg-[#00a884] hover:bg-[#008f70] text-white shadow-sm transition-transform transform hover:scale-105"
                >
                    <Send className="w-5 h-5" />
                </button>
            ) : (
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
                    <Mic className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default MessageInput;
