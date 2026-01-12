import { Camera, Edit2, Check, X, Trash2, User, Upload } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import authService from '../../services/authService';
import toast from 'react-hot-toast';
import Modal from '../common/Modal';

const ProfilePanel = ({ name, setName, about, setAbout, image, setImage }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [tempAbout, setTempAbout] = useState(about);
    const fileInputRef = useRef(null);
    const [showPhotoMenu, setShowPhotoMenu] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const photoMenuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (photoMenuRef.current && !photoMenuRef.current.contains(event.target)) {
                setShowPhotoMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRemovePhoto = async () => {
        try {
            const formData = new FormData();
            formData.append('removeProfilePic', 'true');

            await authService.updateProfile(formData);

            setImage('https://res.cloudinary.com/dp1klmpjv/image/upload/v1768204540/default_avatar_bdqff0.png');
            toast.success('Profile photo removed');
            setShowPhotoMenu(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to remove photo');
        }
    };

    const handleInitialSave = async (field, value) => {
        const formData = new FormData();
        if (field === 'name') formData.append('name', value);
        if (field === 'about') formData.append('about', value);

        try {
            await authService.updateProfile(formData);
            toast.success('Profile updated');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update profile');
        }
    };

    const saveName = () => {
        if (tempName.trim()) {
            setName(tempName);
            handleInitialSave('name', tempName);
            setIsEditingName(false);
        }
    };

    const saveAbout = () => {
        if (tempAbout.trim()) {
            setAbout(tempAbout);
            handleInitialSave('about', tempAbout);
            setIsEditingAbout(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImage(objectUrl);

            const formData = new FormData();
            formData.append('profilePic', file);

            try {
                const updatedUser = await authService.updateProfile(formData);
                if (updatedUser.profilePic) {
                    const imageUrl = updatedUser.profilePic.startsWith('http')
                        ? updatedUser.profilePic
                        : `http://localhost:5000/${updatedUser.profilePic}`;
                    setImage(imageUrl);
                }
                toast.success('Profile picture updated');
            } catch (error) {
                console.error(error);
                toast.error('Failed to update image');
            }
        }
    };

    return (
        <div className="w-full md:w-[400px] flex flex-col bg-white dark:bg-[#111b21] border-r border-[#d1d7db] dark:border-[#202c33] relative z-10 h-full">
            <div className="h-16 px-6 py-3 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center shrink-0">
                <h1 className="text-xl font-medium text-[#41525d] dark:text-[#d1d7db]">Profile</h1>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f0f2f5] dark:bg-[#111b21]">
                <div className="flex flex-col items-center py-8">
                    <div className="relative group cursor-pointer" ref={photoMenuRef} onClick={() => setShowPhotoMenu(!showPhotoMenu)}>
                        <div className="w-[200px] h-[200px] rounded-full overflow-hidden bg-gray-300">
                            <img src={image} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white">
                            <Camera className="w-6 h-6 mb-1" />
                            <span className="text-xs uppercase font-medium">Change <br /> Profile Photo</span>
                        </div>

                        {showPhotoMenu && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#233138] rounded-md shadow-xl py-2 w-48 z-50 overflow-hidden">
                                {image !== 'https://res.cloudinary.com/dp1klmpjv/image/upload/v1768204540/default_avatar_bdqff0.png' && (
                                    <button
                                        className="w-full text-left px-4 py-3 hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-sm hover:cursor-pointer"
                                        onClick={(e) => { e.stopPropagation(); setShowViewModal(true); setShowPhotoMenu(false); }}
                                    >
                                        <User className="w-5 h-5" /> View photo
                                    </button>
                                )}
                                <button
                                    className="w-full text-left px-4 py-3 hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-sm hover:cursor-pointer"
                                    onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); setShowPhotoMenu(false); }}
                                >
                                    <Upload className="w-5 h-5" /> Upload photo
                                </button>
                                {image !== 'https://res.cloudinary.com/dp1klmpjv/image/upload/v1768204540/default_avatar_bdqff0.png' && (
                                    <button
                                        className="w-full text-left px-4 py-3 hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[#3b4a54] dark:text-[#d1d7db] text-sm hover:cursor-pointer"
                                        onClick={(e) => { e.stopPropagation(); handleRemovePhoto(); }}
                                    >
                                        <Trash2 className="w-5 h-5" /> Remove photo
                                    </button>
                                )}
                            </div>
                        )}

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                <div className="p-4 px-8 mb-4 bg-white dark:bg-[#111b21] shadow-sm">
                    <label className="text-[#008069] dark:text-[#00a884] text-sm block mb-4">Your name</label>
                    {isEditingName ? (
                        <div className="flex items-center gap-2 border-b-2 border-[#00a884] pb-1">
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="flex-1 bg-transparent text-[#41525d] dark:text-[#d1d7db] focus:outline-none text-[17px]"
                                autoFocus
                            />
                            <button onClick={saveName} className="text-[#8696a0] hover:text-[#00a884]"><Check className="w-5 h-5" /></button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between group">
                            <span className="text-[#41525d] dark:text-[#d1d7db] text-[17px]">{name}</span>
                            <button onClick={() => setIsEditingName(true)} className="text-[#8696a0]">
                                <Edit2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="px-8 mb-8">
                    <p className="text-[#667781] dark:text-[#8696a0] text-sm leading-5">
                        This is not your username or PIN. This name will be visible to your WhatsApp contacts.
                    </p>
                </div>

                <div className="p-4 px-8 bg-white dark:bg-[#111b21] shadow-sm">
                    <label className="text-[#008069] dark:text-[#00a884] text-sm block mb-4">About</label>
                    {isEditingAbout ? (
                        <div className="flex items-center gap-2 border-b-2 border-[#00a884] pb-1">
                            <input
                                type="text"
                                value={tempAbout}
                                onChange={(e) => setTempAbout(e.target.value)}
                                className="flex-1 bg-transparent text-[#41525d] dark:text-[#d1d7db] focus:outline-none text-[17px]"
                                autoFocus
                            />
                            <button onClick={saveAbout} className="text-[#8696a0] hover:text-[#00a884]"><Check className="w-5 h-5" /></button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between group">
                            <span className="text-[#41525d] dark:text-[#d1d7db] text-[17px]">{about}</span>
                            <button onClick={() => setIsEditingAbout(true)} className="text-[#8696a0]">
                                <Edit2 className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* View Photo Modal */}
            <Modal
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                title="Profile Photo"
                secondaryButtonText="Close"
            >
                <div className="flex justify-center items-center rounded-lg overflow-hidden">
                    <img
                        src={image}
                        alt="Profile"
                        className="w-full h-auto max-h-[60vh] object-contain"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ProfilePanel;
