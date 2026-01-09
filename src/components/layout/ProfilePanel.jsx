import { Camera, Edit2 } from 'lucide-react';

const ProfilePanel = () => {
    return (
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] relative z-10 h-full">
            <div className="h-16 px-6 py-3 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center shrink-0">
                <h1 className="text-xl font-medium text-[#41525d] dark:text-[#d1d7db]">Profile</h1>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f0f2f5] dark:bg-[#111b21]">
                <div className="flex flex-col items-center py-8">
                    <div className="relative group cursor-pointer">
                        <div className="w-[200px] h-[200px] rounded-full overflow-hidden bg-gray-300">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                            <Camera className="w-6 h-6 mb-1" />
                            <span className="text-xs uppercase font-medium">Change <br /> Profile Photo</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 px-8 mb-4 bg-white dark:bg-[#111b21] shadow-sm">
                    <label className="text-[#008069] dark:text-[#00a884] text-sm block mb-4">Your name</label>
                    <div className="flex items-center justify-between group">
                        <span className="text-[#41525d] dark:text-[#d1d7db] text-[17px]">Abubakar</span>
                        <button className="text-[#8696a0]">
                            <Edit2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="px-8 mb-8">
                    <p className="text-[#667781] dark:text-[#8696a0] text-sm leading-5">
                        This is not your username or PIN. This name will be visible to your WhatsApp contacts.
                    </p>
                </div>

                <div className="p-4 px-8 bg-white dark:bg-[#111b21] shadow-sm">
                    <label className="text-[#008069] dark:text-[#00a884] text-sm block mb-4">About</label>
                    <div className="flex items-center justify-between group">
                        <span className="text-[#41525d] dark:text-[#d1d7db] text-[17px]">Hey there! I am using WhatsApp.</span>
                        <button className="text-[#8696a0]">
                            <Edit2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePanel;
