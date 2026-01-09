import { Search, User, Key, Lock, MessageSquare, Bell, Keyboard, HelpCircle, LogOut, Laptop } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import Modal from '../common/Modal';

const SettingsPanel = () => {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    const SettingsItem = ({ icon: Icon, title, subtitle, onClick, isDanger }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] transition-colors text-left border-b border-[#f0f2f5] dark:border-[#202c33] ${isDanger ? 'text-[#f15c6d]' : ''}`}
        >
            <div className={`text-[#54656f] dark:text-[#aebac1] ${isDanger ? 'text-[#f15c6d]' : ''}`}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
                <h3 className={`text-[17px] font-normal ${isDanger ? 'text-[#f15c6d]' : 'text-[#3b4a54] dark:text-[#e9edef]'}`}>{title}</h3>
                {subtitle && <p className="text-sm text-[#667781] dark:text-[#8696a0] mt-0.5">{subtitle}</p>}
            </div>
        </button>
    );

    return (
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] relative z-10 h-full text-left">
            <div className="h-16 px-6 py-4 bg-white dark:bg-[#111b21] flex items-center shrink-0">
                <h1 className="text-xl font-bold text-[#41525d] dark:text-[#d1d7db]">Settings</h1>
            </div>

            <div className="px-3 pb-4 bg-white dark:bg-[#111b21] shrink-0 border-b border-[#f0f2f5] dark:border-[#202c33]">
                <div className="relative">
                    <Search className="absolute left-3 top-2 w-4 h-4 text-[#54656f] dark:text-[#aebac1]" />
                    <input
                        type="text"
                        placeholder="Search settings"
                        className="w-full bg-[#f0f2f5] dark:bg-[#202c33] rounded-lg py-1.5 pl-10 pr-4 text-sm text-[#3b4a54] dark:text-[#d1d7db] placeholder-[#54656f] dark:placeholder-[#aebac1] focus:outline-none"
                    />
                </div>
            </div>

            <div className="px-4 py-3 hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] cursor-pointer flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-[19px] text-[#3b4a54] dark:text-[#e9edef] font-normal">Abubakar</h2>
                    <p className="text-[#667781] dark:text-[#8696a0] text-sm">Hey there! I am using WhatsApp.</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#111b21]">
                <SettingsItem icon={Laptop} title="General" subtitle="Theme, keyboard shortcuts" />
                <SettingsItem icon={Key} title="Account" subtitle="Security notifications, request account info" />
                <SettingsItem icon={Lock} title="Privacy" subtitle="Block contacts, disappearing messages" />
                <SettingsItem icon={MessageSquare} title="Chats" subtitle="Theme, wallpapers, chat history" />
                <SettingsItem icon={Bell} title="Notifications" subtitle="Message, group & call tones" />
                <SettingsItem icon={Keyboard} title="Keyboard shortcuts" />
                <SettingsItem icon={HelpCircle} title="Help" subtitle="Help center, contact us, privacy policy" />
                <div className="my-2 border-t border-[#f0f2f5] dark:border-[#202c33]"></div>
                <SettingsItem icon={LogOut} title="Log out" isDanger={true} onClick={() => setIsLogoutModalOpen(true)} />
            </div>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="Log out?"
                primaryButtonText="Log out"
                secondaryButtonText="Cancel"
                isDanger={true}
                onPrimaryAction={handleLogout}
            >
                Are you sure you want to log out? <br />
                You can turn on <span className="text-[#008069] cursor-pointer">app lock</span> instead.
            </Modal>
        </div>
    );
};

export default SettingsPanel;
