import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const MessageBubble = ({ message, isOwn, time, status }) => {
    return (
        <div className={clsx('flex flex-col mb-2', isOwn ? 'items-end' : 'items-start')}>
            <div
                className={twMerge(
                    clsx(
                        'relative max-w-[65%] px-3 py-1.5 rounded-lg shadow-sm text-sm break-words',
                        isOwn
                            ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-gray-900 dark:text-gray-100 rounded-tr-none'
                            : 'bg-white dark:bg-[#202c33] text-gray-900 dark:text-gray-100 rounded-tl-none'
                    )
                )}
            >
                <div className="pr-1">{message}</div>
                <div className="flex justify-end items-center gap-1 mt-1 -mb-1">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 min-w-fit">{time}</span>
                    {isOwn && (
                        <span className="text-[#53bdeb] font-bold text-[10px]">✓✓</span> // Blue ticks placeholder
                    )}
                </div>

                {/* Tail (CSS triangle hack or SVG) - keeping simple for now, relying on border radius */}
            </div>
        </div>
    );
};

export default MessageBubble;
