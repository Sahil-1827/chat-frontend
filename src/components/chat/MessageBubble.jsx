import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IoCheckmarkDone } from "react-icons/io5";

const MessageBubble = ({ message, isOwn, time, status, isSelectionMode, isSelected, onSelect }) => {
    return (
        <div
            className={clsx(
                'flex mb-1 relative user-select-none',
                isOwn ? 'justify-end' : 'justify-start',
                isSelectionMode && 'cursor-pointer bg-transparent hover:bg-black/5 dark:hover:bg-white/5 -mx-4 px-4 py-1'
            )}
            onClick={isSelectionMode ? onSelect : undefined}
        >
            {isSelectionMode && (
                <div className={clsx("flex items-center justify-center mr-4", isOwn ? "order-1 ml-4 mr-0" : "")}>
                    <div className={clsx(
                        "w-5 h-5 border-2 rounded flex items-center justify-center transition-colors",
                        isSelected ? "bg-[#00a884] border-[#00a884]" : "border-gray-400 dark:border-gray-500"
                    )}>
                        {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                </div>
            )}

            <div className={clsx("flex max-w-[65%]", isOwn ? "flex-row-reverse" : "flex-row")}>
                {/* Tail SVG */}
                {!isSelectionMode && ( // Hide tail in selection mode? Or keep? Whatsapp keeps it but shifts. Keeping for now.
                    <div className={clsx(
                        "overflow-hidden relative w-2 h-3",
                        isOwn ? "-mr-1" : "-ml-1"
                    )}>
                        {isOwn ? (
                            <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="none" className="block fill-[#d9fdd3] dark:fill-[#005c4b]">
                                <path fill="inherit" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="none" className="block fill-white dark:fill-[#202c33]">
                                <path fill="inherit" d="M1.5 0H8v12L1.5 0z"></path>
                            </svg>
                        )}
                    </div>
                )}

                <div
                    className={twMerge(
                        clsx(
                            'relative px-2 py-1 shadow-sm text-[14.2px] leading-[19px] break-words rounded-lg',
                            isOwn
                                ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none'
                                : 'bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none',
                            isSelectionMode && 'rounded-md shadow-none' // Simplify shape in selection mode maybe?
                        )
                    )}
                    style={{ boxShadow: isSelectionMode ? 'none' : '0 1px 0.5px rgba(11,20,26,.13)' }}
                >
                    <div className="pr-1">{message}</div>
                    <div className="flex justify-end items-end gap-1 mt-0">
                        <span className={clsx("text-[11px] min-w-fit h-4", isOwn ? "text-[rgba(17,27,33,0.5)] dark:text-[rgba(233,237,239,0.6)]" : "text-[rgba(17,27,33,0.5)] dark:text-[rgba(233,237,239,0.6)]")}>
                            {time}
                        </span>
                        {isOwn && (
                            <span className={clsx("text-[16px] flex items-center", status === 'read' ? "text-[#53bdeb]" : "text-[#8696a0]")}>
                                <IoCheckmarkDone />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
