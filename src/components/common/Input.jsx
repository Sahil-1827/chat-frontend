import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({
    className,
    type = 'text',
    placeholder,
    variant = 'default',
    icon: Icon,
    error,
    ...props
}) => {
    const baseStyles = 'w-full px-4 py-2 transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';

    const variants = {
        default: 'rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] dark:border-gray-700 dark:bg-[#202c33] dark:text-gray-100 dark:placeholder-gray-400',
        pill: 'rounded-full border-none bg-gray-200 text-gray-900 placeholder-gray-500 focus:ring-0 dark:bg-[#202c33] dark:text-gray-100',
        ghost: 'border-b border-gray-300 bg-transparent px-0 rounded-none focus:border-[#00a884] dark:border-gray-700 dark:text-gray-100',
    };

    return (
        <div className="relative w-full">
            {Icon && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                type={type}
                className={twMerge(
                    clsx(
                        baseStyles,
                        variants[variant],
                        Icon && 'pl-10',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )
                )}
                placeholder={placeholder}
                {...props}
            />
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
