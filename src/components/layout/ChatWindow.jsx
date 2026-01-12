import { MoreVertical, Search, Paperclip, CheckSquare, BellOff, Clock, XCircle, Flag, Ban, Trash2, Info, ArrowRight, X } from 'lucide-react';
import MessageBubble from '../chat/MessageBubble';
import MessageInput from '../chat/MessageInput';
import ContactInfo from '../chat/ContactInfo';
import ForwardModal from '../chat/ForwardModal';
import Modal from '../common/Modal';
import { useState, useRef, useEffect } from 'react';
import socketService from '../../services/socketService';
import authService from '../../services/authService';

const ChatWindow = ({ chatUser, myPhone, setUsers, onClose, users }) => {
    const chatId = chatUser?.phone || chatUser; // Handle both object and legacy string ID
    const [isTyping, setIsTyping] = useState(false);

    // Initial data from the screenshots
    const lilBrotherMessages = [
        { id: 1, text: "Hey! Have you seen Whatsapp Web feature?", time: "02:00", sender: "me", status: 'read', date: "2015-01-22" },
        { id: 2, text: "Yeah...Awsummmmmm 😃😃😍", time: "02:01", sender: "other", date: "2015-01-22" },
        { id: 3, text: "Find more details on http://thehackernews.com/ , I have just published an article about it.", time: "02:01", sender: "me", status: 'read', date: "2015-01-22" },

        // Second conversation block (Lil Brother)
        { id: 4, text: "Kaha hoo bhai", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 5, text: "new ghar the", time: "7:53 pm", sender: "other", date: "2023-10-25" },
        { id: 6, text: "bhaar se deka", time: "7:53 pm", sender: "other", date: "2023-10-25" },
        { id: 7, text: "abh otw to rangoon", time: "7:53 pm", sender: "other", date: "2023-10-25" },
        { id: 8, text: "Abbey lool.", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 9, text: "Chaabi hee le lete.", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 10, text: "cool.", time: "7:53 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 11, text: "No fries. Laana hei toh falafel works only if it's good :)", time: "7:54 pm", sender: "me", status: 'read', date: "2023-10-25" },
        { id: 12, text: "brining falafel", time: "7:54 pm", sender: "other", date: "2023-10-25" },
    ];

    const [messages, setMessages] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState(chatUser);
    const [showContactInfo, setShowContactInfo] = useState(false);

    // Selection Mode State
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [isForwardModalOpen, setIsForwardModalOpen] = useState(false);

    useEffect(() => {
        setCurrentChatUser(chatUser);
        setShowContactInfo(false);
        setIsSelectionMode(false);
        setSelectedMessages([]);
    }, [chatUser]);

    // Fetch fresh details on chat open using getAllUsers
    useEffect(() => {
        if (chatId && chatId !== 'LilBrother') {
            const fetchUsers = async () => {
                try {
                    const allUsers = await authService.getAllUsers();
                    if (setUsers) setUsers(allUsers); // Update global list

                    // Find the current user from the list
                    const updatedUser = allUsers.find(u => u.phone === chatId || u._id === chatId);
                    if (updatedUser) {
                        setCurrentChatUser(prev => ({ ...prev, ...updatedUser }));
                    }
                } catch (error) {
                    console.error("Failed to refresh user details", error);
                }
            };
            fetchUsers();
        }
    }, [chatId, setUsers]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId && chatId !== 'LilBrother' && myPhone) {
                try {
                    const history = await authService.getMessages(chatId);
                    const formattedMessages = history.map(msg => ({
                        id: msg._id,
                        text: msg.message,
                        time: msg.time,
                        sender: msg.sender === myPhone ? 'me' : 'other',
                        status: msg.status,
                        date: new Date(msg.createdAt).toISOString().split('T')[0]
                    }));
                    setMessages(formattedMessages);
                } catch (error) {
                    console.error("Failed to fetch messages:", error);
                }
            } else if (chatId === 'LilBrother') {
                setMessages(lilBrotherMessages);
            } else {
                setMessages([]);
            }
        };

        fetchMessages();

        // Mark as read when opening chat
        if (myPhone && chatId) {
            socketService.markMessagesAsRead(chatId, myPhone);
        }
    }, [chatId, myPhone]);

    // Socket Listener for incoming messages and read receipts
    useEffect(() => {
        const handleNewMessage = (data) => {
            console.log("New message received:", data);
            if (data.from === chatId) {
                const newMessage = {
                    id: Date.now(),
                    text: data.message,
                    time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
                    sender: "other",
                    status: 'read', // Assuming read if open
                    date: new Date().toISOString().split('T')[0]
                };
                setMessages((prev) => [...prev, newMessage]);

                if (myPhone) {
                    socketService.markMessagesAsRead(chatId, myPhone);
                }
            }
        };

        const handleMessagesRead = (data) => {
            console.log("Messages read receipt:", data);
            if (data.from === chatId) {
                setMessages((prevMessages) =>
                    prevMessages.map(msg =>
                        msg.sender === 'me' ? { ...msg, status: 'read' } : msg
                    )
                );
            }
        };

        const handleUserStatusChange = (data) => {
            if (String(data.phone) === String(chatId)) {
                setCurrentChatUser(prev => ({
                    ...prev,
                    isOnline: data.isOnline,
                    lastSeen: data.lastSeen
                }));
            }
        };

        const handleTyping = (data) => {
            if (String(data.from) === String(chatId)) {
                setIsTyping(true);
            }
        };

        const handleStopTyping = (data) => {
            if (String(data.from) === String(chatId)) {
                setIsTyping(false);
            }
        };

        socketService.onMessageReceived(handleNewMessage);
        socketService.onMessagesRead(handleMessagesRead);
        socketService.onUserStatusChange(handleUserStatusChange);
        socketService.onTyping(handleTyping);
        socketService.onStopTyping(handleStopTyping);

        return () => {
            socketService.offMessageReceived(handleNewMessage);
            socketService.offMessagesRead(handleMessagesRead);
            socketService.offUserStatusChange(handleUserStatusChange);
            socketService.offTyping(handleTyping);
            socketService.offStopTyping(handleStopTyping);
        };
    }, [chatId, myPhone]);

    const [requestStatus, setRequestStatus] = useState('none');
    const [blockedBy, setBlockedBy] = useState(null);
    const [isRequester, setIsRequester] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to bottom on load
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch Connection Status
    useEffect(() => {
        if (chatId && myPhone && chatId !== 'LilBrother') {
            authService.getConnectionStatus(chatId).then(data => {
                setRequestStatus(data.status);
                setIsRequester(data.isRequester);
                setBlockedBy(data.blockedBy);
            }).catch(err => console.error("Failed to fetch connection status", err));
        }
    }, [chatId, myPhone]);

    // Socket Listeners for connection events
    useEffect(() => {
        const handleConnectionRequest = (data) => {
            if (String(data.from) === String(chatId)) {
                setRequestStatus('pending');
                setIsRequester(false);
                const newMessage = {
                    id: data._id || Date.now(),
                    text: data.message,
                    time: data.time,
                    sender: "other",
                    status: 'sent',
                    date: new Date().toISOString().split('T')[0]
                };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const handleRequestSent = (data) => {
            if (String(data.to) === String(chatId)) {
                setRequestStatus('pending');
                setIsRequester(true);
            }
        };

        const handleRequestResponse = (data) => {
            if (String(data.from) === String(chatId)) {
                setRequestStatus(data.status);
                setBlockedBy(data.blockedBy);
            }
        };

        socketService.onConnectionRequest(handleConnectionRequest);
        socketService.onRequestSent(handleRequestSent);
        socketService.onRequestResponse(handleRequestResponse);

        return () => {
            socketService.offConnectionRequest(handleConnectionRequest);
            socketService.offRequestSent(handleRequestSent);
            socketService.offRequestResponse(handleRequestResponse);
        };
    }, [chatId, myPhone]);

    const handleTyping = (isTypingStatus) => {
        if (myPhone && chatId) {
            if (isTypingStatus) {
                socketService.sendTyping(chatId, myPhone);
            } else {
                socketService.sendStopTyping(chatId, myPhone);
            }
        }
    };

    const handleSend = (text) => {
        if (!text.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
            sender: "me",
            status: 'sent',
            date: new Date().toISOString().split('T')[0]
        };
        setMessages((prev) => [...prev, newMessage]);

        if (myPhone && chatId) {
            socketService.sendMessage(chatId, text, myPhone);
        } else {
            console.warn("Cannot send message: Missing myPhone or chatId");
        }
    };

    const handleAccept = () => {
        socketService.respondToRequest(chatId, 'accepted', myPhone);
        setRequestStatus('accepted');
        setBlockedBy(null);
    };

    const handleBlock = () => {
        socketService.respondToRequest(chatId, 'rejected', myPhone);
        setRequestStatus('rejected');
        setBlockedBy(myPhone);
    };

    const handleUnblock = () => {
        socketService.respondToRequest(chatId, 'accepted', myPhone);
        setRequestStatus('accepted');
        setBlockedBy(null);
    };

    // Confirm Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        action: null,
        isDanger: false,
        confirmText: ''
    });

    const handleClearChat = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Clear this chat?',
            message: 'Messages on the server will be deleted.',
            isDanger: false,
            confirmText: 'Clear chat',
            action: async () => {
                await authService.clearChat(chatId);
                setMessages([]);
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleDeleteChat = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete this chat?',
            message: 'Also delete the media received in this chat from your device gallery.',
            isDanger: true,
            confirmText: 'Delete chat',
            action: async () => {
                await authService.deleteChat(chatId);
                if (onClose) onClose();
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const toggleSelection = (msgId) => {
        if (selectedMessages.includes(msgId)) {
            setSelectedMessages(prev => prev.filter(id => id !== msgId));
        } else {
            setSelectedMessages(prev => [...prev, msgId]);
        }
    };

    const handleForwardMessages = (targetUserPhones) => {
        targetUserPhones.forEach(phone => {
            selectedMessages.forEach(msgId => {
                const msg = messages.find(m => m.id === msgId);
                if (msg) {
                    socketService.sendMessage(phone, msg.text, myPhone);
                }
            });
        });
        setIsSelectionMode(false);
        setSelectedMessages([]);
    };

    const MenuItem = ({ icon: Icon, text, danger = false, onClick }) => (
        <button onClick={onClick} className={`w-full px-4 py-2.5 text-left hover:bg-[#f5f6f6] dark:hover:bg-[#182229] flex items-center gap-3 text-[14.5px] ${danger ? 'text-[#f15c6d]' : 'text-[#3b4a54] dark:text-[#d1d7db]'}`}>
            {Icon && <Icon className={`w-5 h-5 ${danger ? 'text-[#f15c6d]' : 'text-[#54656f]'}`} strokeWidth={1.5} />}
            {text}
        </button>
    );

    // Search related state
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [messageSearchTerm, setMessageSearchTerm] = useState('');

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setMessageSearchTerm(''); // Clear on close
        }
    };

    // Filter messages logic
    const filteredMessages = messages.filter(msg =>
        msg.text?.toLowerCase().includes(messageSearchTerm.toLowerCase())
    );

    // Group messages by date
    const groupMessagesByDate = (msgs) => {
        const groups = {};
        msgs.forEach(msg => {
            const date = msg.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(msg);
        });
        return groups;
    };

    const groupedMessages = groupMessagesByDate(filteredMessages);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options).toUpperCase();
    };

    const renderFooter = () => {
        if (isSelectionMode) return null; // Hide footer in selection mode

        if (requestStatus === 'pending') {
            if (isRequester) {
                return (
                    <div className="p-4 bg-[#f0f2f5] dark:bg-[#202c33] text-center text-[#54656f] dark:text-[#aebac1] text-sm shadow-inner">
                        Waiting for this user to accept your request.
                    </div>
                );
            } else {
                return (
                    <div className="p-3 bg-[#f0f2f5] dark:bg-[#202c33] flex flex-col items-center gap-2 shadow-inner border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-[#54656f] dark:text-[#aebac1]">
                            "{currentChatUser?.name || chatId}" is not in your contacts.
                        </p>
                        <div className="flex gap-4 w-full justify-center">
                            <button onClick={handleBlock} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
                                Block
                            </button>
                            <button onClick={handleAccept} className="px-6 py-2 bg-[#00a884] text-white rounded-full text-sm font-medium hover:bg-[#008f6f]">
                                Add to contacts
                            </button>
                        </div>
                    </div>
                );
            }
        }

        if (requestStatus === 'rejected') {
            const iAmBlocked = blockedBy && blockedBy !== myPhone;

            return (
                <div className="p-4 bg-[#f0f2f5] dark:bg-[#202c33] flex flex-col items-center gap-2 text-[#54656f] dark:text-[#aebac1] text-sm shadow-inner">
                    <p>{iAmBlocked ? "You have been blocked by this contact." : "You have blocked this contact."}</p>
                    {!iAmBlocked && (
                        <button onClick={handleUnblock} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600">
                            Unblock
                        </button>
                    )}
                </div>
            );
        }

        return <MessageInput onSend={handleSend} onTyping={handleTyping} />;
    };

    return (
        <div className="flex h-full w-full bg-[#efeae2] dark:bg-[#0b141a]">
            {/* Main Chat Area */}
            <div className="flex flex-col flex-grow relative h-full">
                <div className="absolute inset-0 z-0 opacity-[0.4] bg-repeat pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }}></div>

                {/* Header */}
                <div className="h-16 px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center justify-between shadow-sm relative z-20 border-l border-gray-300 dark:border-gray-700">
                    {isSelectionMode ? (
                        <div className="flex items-center gap-4 w-full">
                            <button onClick={() => setIsSelectionMode(false)} className="text-[#54656f] dark:text-[#aebac1]">
                                <X className="w-5 h-5" />
                            </button>
                            <div className="flex-1 font-medium text-[#111b21] dark:text-[#e9edef]">
                                {selectedMessages.length} selected
                            </div>
                            <button
                                onClick={() => setIsForwardModalOpen(true)}
                                disabled={selectedMessages.length === 0}
                                className={`p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${selectedMessages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    ) : isSearchOpen ? (
                        <div className="flex items-center gap-2 w-full bg-white dark:bg-[#202c33] rounded-lg px-2">
                            <button onClick={toggleSearch} className="text-[#54656f] dark:text-[#aebac1] p-2">
                                <ArrowRight className="w-5 h-5 rotate-180" />
                            </button>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search..."
                                value={messageSearchTerm}
                                onChange={(e) => setMessageSearchTerm(e.target.value)}
                                className="w-full bg-transparent py-2 px-1 text-sm text-[#3b4a54] dark:text-[#d1d7db] placeholder-[#54656f] dark:placeholder-[#aebac1] focus:outline-none"
                            />
                            {messageSearchTerm && (
                                <button onClick={() => setMessageSearchTerm('')} className="text-[#54656f] dark:text-[#aebac1] p-2">
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowContactInfo(true)}>
                                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={currentChatUser?.profilePic && currentChatUser.profilePic.startsWith('http') ? currentChatUser.profilePic : currentChatUser?.profilePic ? `http://localhost:5000/${currentChatUser.profilePic}` : `https://res.cloudinary.com/dp1klmpjv/image/upload/v1768204540/default_avatar_bdqff0.png`}
                                        alt="User"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-[#111b21] dark:text-[#e9edef] font-medium text-base">
                                        {currentChatUser?.name || (chatId === 'LilBrother' ? 'Lil Brother' : `User ${chatId}`)}
                                    </h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {isTyping ? (
                                            <span className="text-green-500 font-medium">typing...</span>
                                        ) : currentChatUser?.isOnline ? (
                                            <span className="text-green-500">online</span>
                                        ) : (
                                            currentChatUser?.lastSeen ? `last seen ${new Date(currentChatUser.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'offline'
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 relative">
                                <button onClick={toggleSearch}><Search className="w-5 h-5" /></button>
                                <button
                                    className={`p-1.5 rounded-full transition-colors ${isMenuOpen ? 'bg-gray-200 dark:bg-[#374248]' : ''}`}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </button>

                                {isMenuOpen && (
                                    <div ref={menuRef} className="absolute top-10 right-0 w-64 bg-white dark:bg-[#233138] rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 border border-gray-100 dark:border-[#202c33] origin-top-right">
                                        <MenuItem onClick={() => { setShowContactInfo(true); setIsMenuOpen(false); }} icon={Info} text="Contact info" />
                                        <MenuItem onClick={() => { setIsSelectionMode(true); setIsMenuOpen(false); }} icon={CheckSquare} text="Select messages" />
                                        <MenuItem icon={BellOff} text="Mute notifications" />
                                        <MenuItem icon={Clock} text="Disappearing messages" />
                                        <MenuItem onClick={() => { if (onClose) onClose(); setIsMenuOpen(false); }} icon={XCircle} text="Close chat" />
                                        <div className="my-1 border-b border-gray-100 dark:border-[#37404a]"></div>
                                        <MenuItem icon={Flag} text="Report" />
                                        <MenuItem
                                            icon={Ban}
                                            text={requestStatus === 'rejected' ? (blockedBy === myPhone ? "Unblock" : "Block") : "Block"} // Text logic
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                if (requestStatus === 'rejected') {
                                                    if (blockedBy === myPhone) handleUnblock();
                                                    else handleBlock(); // Or disable? Usually you can block a blocker too in some apps, but for simplicity...
                                                }
                                                else handleBlock();
                                            }}
                                        />
                                        <MenuItem onClick={() => { handleClearChat(); setIsMenuOpen(false); }} icon={Trash2} text="Clear chat" />
                                        <MenuItem onClick={() => { handleDeleteChat(); setIsMenuOpen(false); }} icon={Trash2} text="Delete chat" danger={true} />
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:px-[5%] custom-scrollbar z-10 flex flex-col gap-1">
                    {Object.entries(groupedMessages).map(([date, msgs]) => (
                        <div key={date} className="flex flex-col">
                            <div className="flex justify-center mb-2 mt-2 sticky top-2 z-20">
                                <span className="bg-[#fff] dark:bg-[#182229] px-3 py-1.5 rounded-lg text-xs font-medium text-[#54656f] dark:text-[#8696a0] shadow-sm uppercase tracking-wide">
                                    {formatDate(date)}
                                </span>
                            </div>
                            {msgs.map((msg) => (
                                <MessageBubble
                                    key={msg.id}
                                    message={msg.text}
                                    isOwn={msg.sender === 'me'}
                                    time={msg.time}
                                    status={msg.status}
                                    isSelectionMode={isSelectionMode}
                                    isSelected={selectedMessages.includes(msg.id)}
                                    onSelect={() => toggleSelection(msg.id)}
                                />
                            ))}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                <div className="z-10 bg-[#f0f2f5] dark:bg-[#202c33]">
                    {renderFooter()}
                </div>
            </div>

            {/* Right Sidebar (Contact Info) */}
            {showContactInfo && (
                <ContactInfo
                    user={currentChatUser}
                    onClose={() => setShowContactInfo(false)}
                    onBlock={() => {
                        if (requestStatus === 'rejected') handleUnblock();
                        else handleBlock();
                    }}
                    onDeleteChat={handleDeleteChat}
                    isBlocked={requestStatus === 'rejected'}
                />
            )}

            {/* Modals */}
            <ForwardModal
                isOpen={isForwardModalOpen}
                onClose={() => setIsForwardModalOpen(false)}
                users={users}
                onForward={handleForwardMessages}
            />

            <Modal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                title={confirmModal.title}
                primaryButtonText={confirmModal.confirmText}
                secondaryButtonText="Cancel"
                onPrimaryAction={confirmModal.action}
                onSecondaryAction={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                isDanger={confirmModal.isDanger}
            >
                {confirmModal.message}
            </Modal>
        </div>
    );
};

export default ChatWindow;
