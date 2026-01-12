import React, { useState } from 'react';
import { X, Search, Send } from 'lucide-react';

const ForwardModal = ({ isOpen, onClose, users, onForward }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    if (!isOpen) return null;

    const filteredUsers = users?.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.phone?.includes(searchTerm)
    ) || [];

    const toggleUser = (phone) => {
        if (selectedUsers.includes(phone)) {
            setSelectedUsers(prev => prev.filter(p => p !== phone));
        } else {
            setSelectedUsers(prev => [...prev, phone]);
        }
    };

    const handleSend = () => {
        onForward(selectedUsers);
        onClose();
        setSelectedUsers([]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#222e35] w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="bg-[#008069] p-4 flex items-center gap-3 text-white">
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                    <h2 className="text-lg font-medium">Forward message to</h2>
                </div>

                {/* Search */}
                <div className="p-2 bg-white dark:bg-[#111b21] border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center bg-[#f0f2f5] dark:bg-[#202c33] px-4 py-2 rounded-lg">
                        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm w-full text-[#111b21] dark:text-[#e9edef] placeholder-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                    {filteredUsers.map(user => (
                        <div
                            key={user.phone}
                            onClick={() => toggleUser(user.phone)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedUsers.includes(user.phone) ? 'bg-[#d9fdd3] dark:bg-[#005c4b]' : 'hover:bg-[#f5f6f6] dark:hover:bg-[#202c33]'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                                    <img
                                        src={user.profilePic && user.profilePic.startsWith('http') ? user.profilePic : user.profilePic ? `http://localhost:5000/${user.profilePic}` : `https://res.cloudinary.com/dp1klmpjv/image/upload/v1768204540/default_avatar_bdqff0.png`}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#111b21] dark:text-[#e9edef] font-medium text-sm">{user.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.about || 'Hey there! I am using WhatsApp.'}</span>
                                </div>
                            </div>
                            {selectedUsers.includes(user.phone) && (
                                <div className="w-5 h-5 bg-[#008069] rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            )}
                        </div>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-10 text-sm">
                            No contacts found
                        </div>
                    )}
                </div>

                {/* Footer */}
                {selectedUsers.length > 0 && (
                    <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] flex justify-end">
                        <button
                            onClick={handleSend}
                            className="w-12 h-12 bg-[#00a884] hover:bg-[#008f6f] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            <Send className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForwardModal;
