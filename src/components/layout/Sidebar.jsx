import { Search, Plus, MoreVertical, Archive, Users, Star, CheckSquare, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import authService from '../../services/authService';

const Sidebar = ({ onSelectChat }) => {
    const navigate = useNavigate();
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

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] relative z-10 h-full">
            <div className="h-16 px-4 py-3 bg-white dark:bg-[#111b21] flex items-center justify-between flex-shrink-0 relative">
                <h1 className="text-xl font-bold text-[#41525d] dark:text-[#d1d7db]">WhatsApp</h1>
                <div className="flex items-center gap-4 text-[#54656f] dark:text-[#aebac1]">
                    <button className="hover:bg-gray-100 dark:hover:bg-[#202c33] p-1.5 rounded-full transition-colors" title="New chat">
                        <Plus className="w-6 h-6" />
                    </button>
                    <button
                        className={`hover:bg-gray-100 dark:hover:bg-[#202c33] p-1.5 rounded-full transition-colors ${isMenuOpen ? 'bg-gray-200 dark:bg-[#202c33]' : ''}`}
                        title="Menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <MoreVertical className="w-6 h-6" />
                    </button>
                </div>

                {isMenuOpen && (
                    <div ref={menuRef} className="absolute top-14 right-4 w-52 bg-white dark:bg-[#233138] rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 border border-gray-100 dark:border-[#202c33] origin-top-right">
                        <button className="w-full px-4 py-2 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-[15px]">
                            <Users className="w-5 h-5 text-[#54656f]" strokeWidth={1.5} /> New group
                        </button>
                        <button className="w-full px-4 py-2 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-[15px]">
                            <Star className="w-5 h-5 text-[#54656f]" strokeWidth={1.5} /> Starred messages
                        </button>
                        <button className="w-full px-4 py-2 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-[15px]">
                            <CheckSquare className="w-5 h-5 text-[#54656f]" strokeWidth={1.5} /> Select chats
                        </button>
                        <div className="my-1 border-b border-gray-100 dark:border-[#37404a]"></div>
                        <button
                            className="w-full px-4 py-2 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-[15px]"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-5 h-5 text-[#54656f]" strokeWidth={1.5} /> Log out
                        </button>
                    </div>
                )}
            </div>

            <div className="px-3 pb-2 bg-white dark:bg-[#111b21] flex-shrink-0">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[#54656f] dark:text-[#aebac1]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search or start a new chat"
                        className="w-full bg-[#f0f2f5] dark:bg-[#202c33] rounded-lg py-1.5 pl-10 pr-4 text-sm text-[#3b4a54] dark:text-[#d1d7db] placeholder-[#54656f] dark:placeholder-[#aebac1] focus:outline-none"
                    />
                </div>
            </div>

            <div className="px-3 pb-2 bg-white dark:bg-[#111b21] flex items-center gap-2 flex-shrink-0">
                <button className="px-3 py-1 bg-[#e7fce3] dark:bg-[#0a332c] text-[#008069] dark:text-[#00a884] text-sm rounded-full font-medium hover:bg-[#d9fdd3] dark:hover:bg-[#113b34] transition-colors">
                    All
                </button>
                <button className="px-3 py-1 bg-[#f0f2f5] dark:bg-[#202c33] text-[#54656f] dark:text-[#8696a0] text-sm rounded-full font-medium hover:bg-[#e9edef] dark:hover:bg-[#2a3942] transition-colors">
                    Unread
                </button>
                <button className="px-3 py-1 bg-[#f0f2f5] dark:bg-[#202c33] text-[#54656f] dark:text-[#8696a0] text-sm rounded-full font-medium hover:bg-[#e9edef] dark:hover:bg-[#2a3942] transition-colors">
                    Groups
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#111b21]">
                <div className="flex items-center gap-4 p-3 hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] cursor-pointer transition-colors mx-2 rounded-lg my-1">
                    <div className="w-8 ml-2 flex items-center justify-center text-[#008069] dark:text-[#00a884]">
                        <Archive className="w-5 h-5" />
                    </div>
                    <div className="flex-1 border-b-0">
                        <h3 className="text-[#111b21] dark:text-[#d1d7db] font-medium text-base">Archived</h3>
                    </div>
                    <span className="text-[#008069] dark:text-[#00a884] text-xs font-medium mr-2">1</span>
                </div>

                <div className="flex flex-col">
                    {[1, 2, 3, 4, 5].map((id) => (
                        <div
                            key={id}
                            onClick={() => onSelectChat(id)}
                            className="flex items-center gap-3 p-3 hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] cursor-pointer border-b border-[#f0f2f5] dark:border-[#202c33] transition-colors relative group"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} alt="User" />
                            </div>
                            <div className="flex-1 min-w-0 pr-1">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="text-[#111b21] dark:text-[#e9edef] font-medium truncate text-[17px]">User {id}</h3>
                                    <span className="text-xs text-[#667781] dark:text-[#8696a0]">10:25 pm</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-[#667781] dark:text-[#8696a0] truncate flex-1 leading-5">
                                        This is a preview of the last message...
                                    </p>
                                    {id === 1 && (
                                        <div className="ml-2 w-5 h-5 bg-[#00a884] rounded-full flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">2</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 p-4 text-center border-t border-[#f0f2f5] dark:border-[#202c33]">
                        <p className="text-xs text-[#8696a0] flex items-center justify-center gap-1">
                            <span className="text-[10px]">🔒</span> Your personal messages are end-to-end encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
