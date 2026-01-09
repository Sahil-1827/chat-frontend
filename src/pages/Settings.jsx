import { ArrowLeft, Moon, Sun, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';

const Settings = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#f0f2f5] dark:bg-[#111b21] overflow-hidden">
            {/* Main Content Area - mimic the left sidebar width + main area */}
            <div className="flex-1 flex flex-col items-center pt-10">
                <div className="w-full max-w-2xl bg-white dark:bg-[#202c33] rounded-lg shadow-sm overflow-hidden animate-in fade-in duration-300">

                    {/* Header */}
                    <div className="bg-[#00a884] h-28 relative">
                        <button
                            onClick={() => navigate('/')}
                            className="absolute top-4 left-4 text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white dark:border-[#202c33] flex items-center justify-center overflow-hidden">
                                <User className="w-12 h-12 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Name</h2>
                        <p className="text-gray-500 dark:text-gray-400">Hey there! I am using WhatsApp.</p>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800">
                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#2a3942] cursor-pointer flex items-center justify-between transition-colors" onClick={toggleTheme}>
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                                    {theme === 'dark' ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-orange-500" />}
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">Theme</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{theme === 'dark' ? 'Dark' : 'Light'}</p>
                                </div>
                            </div>
                            {/* Toggle Switch Visual */}
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-[#00a884]' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`}></div>
                            </div>
                        </div>

                        <div className="p-4 hover:bg-gray-50 dark:hover:bg-[#2a3942] cursor-pointer flex items-center gap-4 transition-colors text-red-500" onClick={handleLogout}>
                            <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-medium">Logout</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
