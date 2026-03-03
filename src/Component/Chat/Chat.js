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

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatScreen.css";

const socket = io("http://localhost:3008");

const currentUser = {
  _id: "66f0f941ce634e1306aa7690",
  name: "Deepak Verma",
};

const ChatScreen = () => {
  const [users, setUsers] = useState([]);
  const [groupChat, setGroupChat] = useState(null); // ✅ real group
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // ================================
  // FETCH USERS + GROUP
  // ================================
  useEffect(() => {
    const initData = async () => {
      try {
        // Fetch active users
        const userRes = await fetch(
          "http://localhost:3008/api/v1/getActiveUsers"
        );
        const userData = await userRes.json();
        setUsers(userData.filter((u) => u._id !== currentUser._id));

        // Fetch group conversation
        const groupRes = await fetch(
          "http://localhost:3008/api/v1/conversations/group"
        );
        const groupData = await groupRes.json();

        console.log("Fetched group:", groupData);

        if (groupData && groupData._id) {
          setGroupChat(groupData);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initData();
  }, []);

  // ================================
  // AUTO SCROLL
  // ================================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================================
  // SOCKET LISTENER
  // ================================
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversationId]);

  // ================================
  // OPEN CHAT
  // ================================
  const openChat = async (chat) => {
    try {
      setSelectedChat(chat);
      setMessages([]);

      if (chat.type === "group") {
        setConversationId(chat._id);
        socket.emit("joinConversation", chat._id);

        const res = await fetch(
          `http://localhost:3008/api/v1/conversations/${chat._id}/messages`
        );
        const data = await res.json();
        setMessages(data);
      } else {
        // Create or fetch individual conversation
        const res = await fetch(
          "http://localhost:3008/api/v1/conversations",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              senderId: currentUser._id,
              receiverId: chat._id,
            }),
          }
        );

        const convo = await res.json();

        setConversationId(convo._id);
        socket.emit("joinConversation", convo._id);

        const msgRes = await fetch(
          `http://localhost:3008/api/v1/conversations/${convo._id}/messages`
        );
        const msgData = await msgRes.json();
        setMessages(msgData);
      }
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  };

  // ================================
  // SEND MESSAGE
  // ================================
  const sendMessage = () => {
    if (!newMessage.trim() || !conversationId) return;

    console.log("Sending conversationId:", conversationId);

    socket.emit("sendMessage", {
      conversationId,
      senderId: currentUser._id,
      text: newMessage,
    });

    setNewMessage("");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      {/* SIDEBAR */}
      <div className="chat-sidebar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* GROUP CHAT */}
        {groupChat && (
          <div
            className={`chat-item ${
              selectedChat?._id === groupChat._id ? "active" : ""
            }`}
            onClick={() =>
              openChat({
                type: "group",
                _id: groupChat._id,
                name: groupChat.name || "Team Group",
              })
            }
          >
            👥 {groupChat.name || "Team Group"}
          </div>
        )}

        <div className="personal-title">Personal Chats</div>

        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className={`chat-item ${
              selectedChat?._id === user._id ? "active" : ""
            }`}
            onClick={() =>
              openChat({
                type: "individual",
                _id: user._id,
                name: user.name,
              })
            }
          >
            👤 {user.name}
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">{selectedChat.name}</div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat-message ${
                    msg.sender?._id === currentUser._id ? "me" : "other"
                  }`}
                >
                  <div className="chat-bubble">
                    {selectedChat.type === "group" &&
                      msg.sender?._id !== currentUser._id && (
                        <div className="sender-name">
                          {msg.sender?.name}
                        </div>
                      )}

                    <div>{msg.text}</div>

                    <div className="chat-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a chat</div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;