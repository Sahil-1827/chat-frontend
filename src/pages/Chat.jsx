import { useState } from 'react';
import whatsappImg from '../assets/whatsApp.png';
import NavigationRail from '../components/layout/NavigationRail';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/layout/ChatWindow';
import ProfilePanel from '../components/layout/ProfilePanel';
import SettingsPanel from '../components/layout/SettingsPanel';
import StatusPanel from '../components/layout/StatusPanel';
import CommunitiesPanel from '../components/layout/CommunitiesPanel';
import authService from '../services/authService';
import { useEffect } from 'react';
import socketService from '../services/socketService';

const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [activeTab, setActiveTab] = useState('chats');

    // Profile State
    const [profileName, setProfileName] = useState('Abubakar'); // Default or fetch
    const [aboutText, setAboutText] = useState('Hey there! I am using WhatsApp.');
    const [profileImage, setProfileImage] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix');
    const [myPhone, setMyPhone] = useState(null);
    const [totalUnread, setTotalUnread] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await authService.getProfile();
                if (user.name) setProfileName(user.name);
                if (user.about) setAboutText(user.about);
                if (user.phone) {
                    setMyPhone(user.phone);
                    // Connect and register socket
                    socketService.connect();
                    socketService.register(user.phone);
                }
                if (user.profilePic) {
                    // Check if it's already an absolute URL (Cloudinary) or needs prepending
                    const imageUrl = user.profilePic.startsWith('http')
                        ? user.profilePic
                        : `http://localhost:5000/${user.profilePic}`;
                    setProfileImage(imageUrl);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();

        return () => {
            // Optional: disconnect on unmount if needed, but keeping it persistent is usually better for SPAs
            // socketService.disconnect();
        };
    }, []);

    const renderLeftPanel = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <ProfilePanel
                        name={profileName}
                        setName={setProfileName}
                        about={aboutText}
                        setAbout={setAboutText}
                        image={profileImage}
                        setImage={setProfileImage}
                    />
                );
            case 'settings':
                return (
                    <SettingsPanel
                        setActiveTab={setActiveTab}
                        name={profileName}
                        about={aboutText}
                        image={profileImage}
                    />
                );
            case 'status':
                return <StatusPanel myImage={profileImage} />;
            case 'communities':
                return <CommunitiesPanel />;
            default:
                return (
                    <Sidebar
                        onSelectChat={setSelectedChat}
                        userImage={profileImage}
                        onUnreadCountChange={setTotalUnread}
                        selectedChat={selectedChat}
                    />
                );
        }
    };


    return (
        <div className="flex h-screen bg-[#d1d7db] dark:bg-[#111b21] overflow-hidden">
            <div className="hidden md:block h-full flex-shrink-0">
                <NavigationRail
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    userImage={profileImage}
                    badgeCount={totalUnread}
                />
            </div>

            <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-[400px] flex-col relative z-20 h-full`}>
                {renderLeftPanel()}
            </div>

            <div className={`${!selectedChat ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-[#efeae2] dark:bg-[#0b141a] relative h-full`}>
                {selectedChat ? (
                    <>
                        <ChatWindow chatUser={selectedChat} myPhone={myPhone} />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-10 relative">
                        <div className="absolute inset-0 bg-repeat opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}></div>

                        <div className="z-10 flex flex-col items-center">
                            <div className="mb-8">
                                <div className="w-[300px] h-[200px] bg-gray-200/50 dark:bg-gray-800/40 rounded-full flex items-center justify-center">
                                    <img src={whatsappImg} alt="WhatsApp" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-light text-gray-600 dark:text-gray-200 mb-4">WhatsApp Web Clone</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                                Send and receive messages without keeping your phone online.
                                <br />
                                Use WhatsApp on up to 4 linked devices and 1 phone.
                            </p>
                            <div className="mt-10 flex items-center gap-2 text-xs text-gray-400">
                                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                                End-to-end encrypted
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
