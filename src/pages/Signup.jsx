import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../components/layout/AuthLayout';
import { ChevronDown } from 'lucide-react';
import authService from '../services/authService';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', phone: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await authService.signup(formData);

            toast.success('Account created successfully!');
            localStorage.setItem('authToken', data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <AuthLayout title="Create account" subtitle="Enter your name and phone number.">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
                <div className="space-y-4">

                    <div className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-5 py-3 bg-white dark:bg-[#202c33]">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* <div className="relative">
                        <div className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 bg-white dark:bg-[#202c33] flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a3942] transition-colors">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">🇮🇳</span>
                                <span className="text-gray-800 dark:text-gray-200">India</span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-[#008069]" />
                        </div>
                    </div> */}

                    <div className="flex gap-3">
                        <div className="w-24 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 bg-white dark:bg-[#202c33] flex items-center text-gray-800 dark:text-gray-200">
                            <span className="text-gray-500 mr-1">+</span>
                            <input
                                type="text"
                                value="91"
                                readOnly
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                        <div className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-3 bg-white dark:bg-[#202c33]">
                            <input
                                type="tel"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input for Signup */}
                    <div className="border border-gray-300 dark:border-gray-600 rounded-full px-5 py-3 bg-white dark:bg-[#202c33]">
                        <input
                            type="password"
                            placeholder="Create Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4 flex flex-col items-center gap-4">
                    <button
                        type="submit"
                        className="bg-[#008069] hover:bg-[#00715c] text-white rounded-full px-8 py-2.5 font-medium transition-colors shadow-sm hover:cursor-pointer"
                    >
                        Next
                    </button>
                    <div className="flex gap-4 text-xs">
                        <Link to="/login" className="text-[#008069] font-medium hover:underline">
                            Already have an account? Log in
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;
