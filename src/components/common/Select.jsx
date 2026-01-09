import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

const Select = ({
    className,
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    error,
    ...props
}) => {
    return (
        <div className="relative w-full">
            <select
                className={twMerge(
                    clsx(
                        'w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-900 focus:border-[#00a884] focus:outline-none focus:ring-1 focus:ring-[#00a884] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-[#202c33] dark:text-gray-100',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        className
                    )
                )}
                value={value}
                onChange={onChange}
                {...props}
            >
                <option value="" disabled className="text-gray-500">
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDown className="h-4 w-4" />
            </div>
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Select;
