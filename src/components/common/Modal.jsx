import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children, primaryButtonText, secondaryButtonText, onPrimaryAction, onSecondaryAction, isDanger = false }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                ref={modalRef}
                className="w-full max-w-md bg-white dark:bg-[#3b4a54] rounded-lg shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="px-6 pt-6 pb-2">
                    <h3 className="text-xl font-medium text-[#3b4a54] dark:text-[#e9edef]">
                        {title}
                    </h3>
                </div>

                <div className="px-6 py-4">
                    <div className="text-[#3b4a54] dark:text-[#d1d7db] text-sm leading-6">
                        {children}
                    </div>
                </div>

                <div className="flex items-center justify-end px-6 py-4 gap-3 bg-white dark:bg-[#3b4a54] pb-6">
                    {secondaryButtonText && (
                        <button
                            onClick={onSecondaryAction || onClose}
                            className="px-6 py-2 rounded-full text-[#008069] dark:text-[#00a884] bg-transparent hover:bg-black/5 dark:hover:bg-white/5 font-medium text-sm transition-colors border border-[#e9edef] dark:border-[#8696a0]/30 hover:cursor-pointer"
                        >
                            {secondaryButtonText}
                        </button>
                    )}

                    {primaryButtonText && (
                        <button
                            onClick={onPrimaryAction}
                            className={`px-6 py-2 rounded-full text-[#111b21] dark:text-[#111b21] font-medium text-sm transition-colors shadow-sm hover:cursor-pointer ${isDanger
                                ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white dark:text-white'
                                : 'bg-[#00a884] hover:bg-[#008f70] text-white dark:text-[#111b21]'
                                }`}
                        >
                            {primaryButtonText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
