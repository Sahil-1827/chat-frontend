import { Plus, MoreVertical, Lock } from 'lucide-react';

const StatusPanel = () => {
    return (
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] relative z-10 h-full">
            <div className="h-16 px-6 py-4 bg-white dark:bg-[#111b21] flex items-center justify-between shrink-0">
                <h1 className="text-xl font-bold text-[#41525d] dark:text-[#d1d7db]">Status</h1>
                <div className="flex items-center gap-4 text-[#54656f] dark:text-[#aebac1]">
                    <button className="hover:bg-gray-100 dark:hover:bg-[#202c33] p-1.5 rounded-full transition-colors" title="Add status">
                        <Plus className="w-5 h-5" />
                    </button>
                    <button className="hover:bg-gray-100 dark:hover:bg-[#202c33] p-1.5 rounded-full transition-colors" title="Menu">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#111b21]">
                <div className="flex items-center gap-4 p-4 hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] cursor-pointer transition-colors relative group">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
                            <svg className="w-full h-full text-gray-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#00a884] rounded-full p-0.5 border-2 border-white dark:border-[#111b21]">
                            <Plus className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[#111b21] dark:text-[#e9edef] font-medium text-[17px]">My status</h3>
                        <p className="text-sm text-[#667781] dark:text-[#8696a0]">Click to add status update</p>
                    </div>
                </div>

                <div className="border-t border-[#f0f2f5] dark:border-[#202c33] mx-4 my-2"></div>

                <div className="mt-4 p-4 text-center">
                    <p className="text-xs text-[#8696a0] flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> Your status updates are end-to-end encrypted
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatusPanel;
