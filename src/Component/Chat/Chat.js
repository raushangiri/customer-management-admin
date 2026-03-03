// import React, { useState, useRef, useEffect } from "react";
// import "./ChatScreen.css";

// const initialMessages = [
//   { id: 1, senderId: "me", senderName: "You", text: "Hey team!", timestamp: Date.now() - 60000 },
//   { id: 2, senderId: "2", senderName: "Agent 2", text: "Hello! How can we help?", timestamp: Date.now() - 30000 },
// //   { id: 3, senderId: "3", senderName: "Agent 3", text: "CDR Team here, ready for updates.", timestamp: Date.now() - 10000 },
// ];

// const ChatScreen = () => {
//   const [messages, setMessages] = useState(initialMessages);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (newMessage.trim() === "") return;
//     const newMsg = {
//       id: Date.now(),
//       senderId: "me",
//       senderName: "You",
//       text: newMessage,
//       timestamp: Date.now(),
//     };
//     setMessages((prev) => [...prev, newMsg]);
//     setNewMessage("");
//   };

//   return (
//     <div className="full-chat-container">
//       <div className="chat-screen">
//         <div className="chat-header">Team Chat</div>
//         <div className="chat-messages">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`chat-message ${msg.senderId === "me" ? "me" : "other"}`}
//             >
//               <div className="chat-bubble">
//                 <div className="chat-text">{msg.text}</div>
//                 <div className="chat-meta">
//   <strong>{msg.senderName} · </strong>
//   {new Date(msg.timestamp).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   })}
// </div>

//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef}></div>
//         </div>

//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatScreen;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_API_BASE_URL;
let socket, selectedChatCompare;

const ChatScreen = ({ currentUser }) => {
  // currentUser should be the object from your User collection: { _id, name, role, etc }
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  const messagesEndRef = useRef(null);

  // Initialize Socket
  useEffect(() => {
    if (!currentUser) return;
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // Handle notification logic here
      } else {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    });
    return () => socket.disconnect();
  }, [currentUser]);

  // Fetch Contacts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${ENDPOINT}/getusers`);
        // Filter out current user from contact list
        setContacts(data.filter(u => u._id !== currentUser?._id));
      } catch (err) {
        console.error("Error fetching users");
      }
    };
    fetchUsers();
  }, [currentUser]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${ENDPOINT}/api/chat`, { 
        userId, 
        currentUserId: currentUser._id 
      });
      setSelectedChat(data);
      selectedChatCompare = data;
      
      const res = await axios.get(`${ENDPOINT}/api/messages/${data._id}`);
      setMessages(res.data);
      socket.emit("join chat", data._id);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    try {
      const { data } = await axios.post(`${ENDPOINT}/api/messages`, {
        content: newMessage,
        chatId: selectedChat._id,
        currentUserId: currentUser._id
      });
      socket.emit("new message", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message");
    }
  };

  const createGroup = async () => {
    if (!groupName || selectedUsers.length < 2) return;
    try {
      const { data } = await axios.post(`${ENDPOINT}/api/chat/group`, {
        name: groupName,
        users: JSON.stringify(selectedUsers.map(u => u._id)),
        currentUserId: currentUser._id
      });
      setSelectedChat(data);
      setIsGroupModalOpen(false);
    } catch (err) {
      console.error("Error creating group");
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col shadow-sm">
        <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
          <h2 className="font-bold text-lg">Contacts</h2>
          <button 
            onClick={() => setIsGroupModalOpen(true)}
            className="p-1 hover:bg-indigo-500 rounded transition-colors text-xs border border-indigo-300"
          >
            + Group
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {contacts.map((user) => (
            <div 
              key={user._id} 
              onClick={() => accessChat(user._id)}
              className="p-4 border-b hover:bg-slate-50 cursor-pointer transition-all flex flex-col"
            >
              <span className="font-semibold text-slate-800">{user.name}</span>
              <span className="text-xs text-slate-500 uppercase tracking-tight">{user.role} • {user.department?.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
              <div>
                <h3 className="font-bold text-slate-800">
                  {selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users.find(u => u._id !== currentUser._id).name}
                </h3>
                <p className="text-xs text-green-500 font-medium">Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-100">
              {loading ? (
                <div className="flex justify-center items-center h-full text-slate-400">Loading messages...</div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg._id} 
                    className={`flex ${msg.sender._id === currentUser._id ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                      msg.sender._id === currentUser._id 
                      ? "bg-indigo-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
                    }`}>
                      {selectedChat.isGroupChat && msg.sender._id !== currentUser._id && (
                        <div className="text-[10px] font-bold opacity-75 mb-1 uppercase tracking-wider">
                          {msg.sender.name} ({msg.sender.role})
                        </div>
                      )}
                      <div className="text-sm leading-relaxed">{msg.content}</div>
                      <div className={`text-[10px] mt-1 text-right ${msg.sender._id === currentUser._id ? "text-indigo-200" : "text-slate-400"}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t flex items-center gap-3">
              <input
                className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                placeholder="Write something..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
            <div className="text-5xl mb-4">💬</div>
            <p className="text-lg">Select a colleague to start chatting</p>
          </div>
        )}
      </div>

      {/* Group Chat Modal */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b bg-slate-50">
              <h2 className="text-xl font-bold">Create Group Chat</h2>
            </div>
            <div className="p-5 space-y-4">
              <input 
                placeholder="Group Name" 
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <div className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-1">
                <p className="text-xs font-bold text-slate-400 px-2 mb-2">SELECT MEMBERS</p>
                {contacts.map(user => (
                  <label key={user._id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-indigo-600"
                      onChange={(e) => {
                        if (e.target.checked) setSelectedUsers([...selectedUsers, user]);
                        else setSelectedUsers(selectedUsers.filter(u => u._id !== user._id));
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{user.role}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-5 border-t bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsGroupModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors font-medium">Cancel</button>
              <button onClick={createGroup} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold shadow-sm">Create Group</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatScreen;