import React from 'react';
import { X, Phone, Info as InfoIcon, Ban, Trash2 } from 'lucide-react';

const ContactInfo = ({ user, onClose, onBlock, onDeleteChat, isBlocked }) => {
    if (!user) return null;

    return (
        <div className="w-[300px] md:w-[350px] bg-white dark:bg-[#111b21] border-l border-gray-200 dark:border-gray-700 h-full flex flex-col z-20 transition-all duration-300">
            {/* Header */}
            <div className="h-16 px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center gap-4 border-b border-gray-200 dark:border-gray-700">
                <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-[#111b21] dark:text-[#e9edef] font-medium text-base">Contact Info</h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Profile Pic */}
                <div className="flex flex-col items-center py-8 bg-white dark:bg-[#111b21] pb-6 border-b border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border border-gray-100 dark:border-gray-700">
                        <img
                            src={user.profilePic && user.profilePic.startsWith('http') ? user.profilePic : user.profilePic ? `http://localhost:5000/${user.profilePic}` : `https://res.cloudinary.com/dp1klmpjv/image/upload/v1768204540/default_avatar_bdqff0.png`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-1">{user.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{user.phone}</p>
                </div>

                {/* About Section */}
                <div className="p-4 bg-white dark:bg-[#111b21] mb-2 shadow-sm">
                    <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">About</h4>
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{user.about || "Hey there! I am using WhatsApp."}</p>
                </div>

                {/* Media, Links, Docs (Placeholder) */}
                <div className="p-4 bg-white dark:bg-[#111b21] mb-2 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#202c33]">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Media, links, and docs</span>
                    <span className="text-xs text-gray-500">0 &gt;</span>
                </div>

                {/* Actions */}
                <div className="mt-4 p-4 bg-white dark:bg-[#111b21] shadow-sm flex flex-col gap-2">
                    <button onClick={onBlock} className="w-full flex items-center gap-4 py-3 text-[#f15c6d] hover:bg-[#ffebee] dark:hover:bg-[#2a1f22] rounded px-2 transition-colors">
                        <Ban className="w-5 h-5" />
                        <span className="text-sm font-medium">{isBlocked ? 'Unblock' : 'Block'} {user.name}</span>
                    </button>
                    <button onClick={onDeleteChat} className="w-full flex items-center gap-4 py-3 text-[#f15c6d] hover:bg-[#ffebee] dark:hover:bg-[#2a1f22] rounded px-2 transition-colors">
                        <Trash2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Delete chat</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
