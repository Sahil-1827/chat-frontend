import { MessageSquare, CircleDashed, Users, Settings, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const NavigationRail = ({ activeTab, setActiveTab }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const NavIcon = ({ icon: Icon, active, badge, onClick, title }) => (
        <div
            className={`relative group flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors ${active ? 'bg-[#374248] dark:bg-[#374248]' : 'hover:bg-[#f0f2f5] dark:hover:bg-[#202c33]'}`}
            onClick={onClick}
            title={title}
        >
            <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-[#54656f] dark:text-[#aebac1]'}`} strokeWidth={1.5} />
            {badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00a884] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white dark:border-[#111b21]">
                    {badge}
                </span>
            )}
        </div>
    );

    return (
        <div className="w-[60px] h-full flex flex-col items-center py-3 bg-[#f0f2f5] dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] justify-between z-30">
            <div className="flex flex-col gap-3">
                <NavIcon
                    icon={MessageSquare}
                    active={activeTab === 'chats'}
                    onClick={() => setActiveTab('chats')}
                    badge={2}
                    title="Chats"
                />
                <NavIcon
                    icon={CircleDashed}
                    title="Status"
                    onClick={() => setActiveTab('status')}
                    active={activeTab === 'status'}
                />
                <NavIcon
                    icon={Users}
                    title="Communities"
                    onClick={() => setActiveTab('communities')}
                    active={activeTab === 'communities'}
                />
            </div>

            <div className="flex flex-col gap-4 items-center">
                <div className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-[#202c33]" title="Meta AI">
                    <div className="w-6 h-6 rounded-full border-2 border-blue-400 bg-gradient-to-tr from-blue-400 to-purple-500 opacity-80"></div>
                </div>

                <NavIcon
                    icon={Settings}
                    onClick={() => setActiveTab('settings')}
                    active={activeTab === 'settings'}
                    title="Settings"
                />

                <div
                    className={`w-10 h-10 rounded-full overflow-hidden cursor-pointer transition-opacity ${activeTab === 'profile' ? 'ring-2 ring-[#00a884] ring-offset-2 ring-offset-[#f0f2f5] dark:ring-offset-[#111b21]' : 'hover:opacity-80'}`}
                    onClick={() => setActiveTab('profile')}
                    title="Profile"
                >
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationRail;
