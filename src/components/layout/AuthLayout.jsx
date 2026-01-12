import { BsWhatsapp } from "react-icons/bs";
import { Lock } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcf5eb] dark:bg-[#111b21] relative p-4 transition-colors duration-200 " style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}>

            <div className="absolute top-8 left-8 flex items-center gap-2">
                <div className="flex items-center gap-2 text-[#25d366]">
                    <BsWhatsapp size={38}/>
                    <span className="text-3xl font-bold tracking-tight">
                        WhatsApp
                    </span>
                </div>
            </div>

            <div className="z-10 w-full max-w-[480px] bg-white dark:bg-[#202c33] rounded-[24px] shadow-sm overflow-hidden transition-colors duration-200 border border-gray-100 dark:border-gray-800">
                <div className="p-12 pb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-[28px] font-medium text-[#41525d] dark:text-gray-100 mb-3">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-[#3b4a54] dark:text-gray-400 text-[15px]">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}
                </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[#8696a0] text-xs">
                <Lock size={14} strokeWidth={2} />
                <span>
                    Your personal messages are end-to-end encrypted
                </span>
            </div>
        </div>
    );
};

export default AuthLayout;
