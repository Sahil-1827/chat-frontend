import { Users, Plus } from 'lucide-react';

const CommunitiesPanel = () => {
    return (
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] relative z-10 h-full">
            <div className="h-16 px-6 py-4 bg-white dark:bg-[#111b21] flex items-center shrink-0">
                <h1 className="text-xl font-bold text-[#41525d] dark:text-[#d1d7db]">Communities</h1>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#111b21]">
                <div className="flex items-center gap-4 p-4 hover:bg-[#f5f6f6] dark:hover:bg-[#202c33] cursor-pointer transition-colors border-b border-[#f0f2f5] dark:border-[#202c33]">
                    <div className="w-12 h-12 rounded-lg bg-[#00a884] flex items-center justify-center text-white">
                        <Users className="w-6 h-6" fill="currentColor" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[#111b21] dark:text-[#e9edef] font-medium text-[17px]">New community</h3>
                    </div>
                    <Plus className="w-5 h-5 text-[#00a884]" />
                </div>

                <div className="p-8 text-center opacity-60">
                    <p className="text-sm text-[#54656f] dark:text-[#aebac1]">
                        Communities bring members together in topic-based groups, and make it easy to get admin announcements. Any community you're added to will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommunitiesPanel;
