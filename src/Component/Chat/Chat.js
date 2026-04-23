import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatScreen.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faUser, faComment } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import '../Navbar/Sidebar.css'; // Optional: For styling

const reactbaseurl = process.env.REACT_APP_API_BASE_URL;
// const socket = io("http://localhost:3009");
const socket = io("http://82.180.147.224:3007");

const ChatScreen = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
const [unreadCounts, setUnreadCounts] = useState({});
  const messagesEndRef = useRef(null);
  const userId = localStorage.getItem('userId');

  /* ==============================
     LOAD CURRENT USER
  ============================== */

  console.log("Current User:", currentUser);
  useEffect(() => {

    const loadUser = async () => {

      const storedUserId = localStorage.getItem("userId");

      if (!storedUserId) return;

      const res = await fetch(`${reactbaseurl}/getUserById/${storedUserId}`);
      const data = await res.json();

      if (data.success) {
        setCurrentUser(data.data);
      }

    };

    loadUser();

  }, []);

const fetchUnreadCount = async () => {
  try {

    const response = await axios.get(
      `${reactbaseurl}/messages/unread-by-conversation/${userId}`
    );

    const list = response.data?.data || [];

    const counts = {};

    list.forEach(item => {
      counts[String(item.conversationId)] = item.count;
    });

    console.log("Mapped unreadCounts:", counts);

    setUnreadCounts(counts);

  } catch (err) {
    console.error("Unread count error:", err);
  }
};
  

useEffect(() => {
  if (!currentUser?._id) return;

  fetchUnreadCount(); // initial load

  const interval = setInterval(fetchUnreadCount, 10000);

  return () => clearInterval(interval);

}, [currentUser]);

  /* ==============================
     LOAD USERS + CONVERSATIONS
  ============================== */

  useEffect(() => {

    if (!currentUser) return;

    const loadData = async () => {

      const userRes = await fetch(`${reactbaseurl}/getActiveUsers`);
      const userData = await userRes.json();

      setUsers(userData.filter(u => u._id !== currentUser._id));

      const convoRes = await fetch(
        `${reactbaseurl}/conversations/user/${currentUser._id}`
      );

      const response = await convoRes.json();
      const conversations = response.data || [];

      setGroups(
        conversations.filter(c => c.type === "group")
      );

      const personalChats = conversations.filter(
        c => c.type === "individual"
      );

      const contactUsers = personalChats.map(convo => {

        const otherUser = convo.participants.find(
          p => p._id !== currentUser._id
        );

        if (!otherUser) return null;

        return {
          _id: otherUser._id,
          name: otherUser.name,
          conversationId: convo._id
        };

      }).filter(Boolean);

      setContacts(contactUsers);

    };

    loadData();

  }, [currentUser]);


  /* ==============================
     AUTO SCROLL
  ============================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  useEffect(() => {

  /* ==============================
     MESSAGE INSIDE OPEN CHAT
  ============================== */
  socket.on("receiveMessage", (message) => {

    if (message.conversationId === conversationId) {
      setMessages(prev => [...prev, message]);
      markMessagesAsRead(conversationId);
    }

  });

  /* ==============================
     NEW MESSAGE (SIDEBAR UPDATE)
  ============================== */
   socket.on("newMessageNotification", ({ message, conversation }) => {

    const otherUser = conversation.participants.find(
      p => p._id !== currentUser._id
    );

    if (!otherUser) return;

    setContacts(prev => {

      const exists = prev.find(
        c => c.conversationId === conversation._id
      );

      // 🔥 If already exists → move to top
      if (exists) {
        const updated = prev.filter(
          c => c.conversationId !== conversation._id
        );

        return [
          {
            _id: otherUser._id,
            name: otherUser.name,
            conversationId: conversation._id
          },
          ...updated
        ];
      }

      return [
        {
          _id: otherUser._id,
          name: otherUser.name,
          conversationId: conversation._id
        },
        ...prev
      ];

    });

  });

 
  return () => {
    socket.off("receiveMessage");
    socket.off("newMessageNotification");
  };

}, [conversationId, currentUser]);

  /* ==============================
     MARK MESSAGES AS READ API
  ============================== */

  const markMessagesAsRead = async (convoId) => {

    try {

      await fetch(`${reactbaseurl}/messages/mark-read`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          conversationId: convoId,
          userId: currentUser._id
        })

      });

    } catch (error) {

      console.log("Read update error", error);

    }

  };


  /* ==============================
     SOCKET RECEIVE MESSAGE
  ============================== */

  useEffect(() => {

    socket.on("receiveMessage", message => {

      if (message.conversationId === conversationId) {

        setMessages(prev => [...prev, message]);

        // mark as read immediately
        markMessagesAsRead(conversationId);

      }

    });

    return () => socket.off("receiveMessage");

  }, [conversationId]);


  /* ==============================
     OPEN CHAT
  ============================== */

  const openChat = async (chat) => {

    setSelectedChat(chat);
    setMessages([]);

    let convoId = chat.conversationId;

    if (!convoId) {

      const res = await fetch(
        `${reactbaseurl}/conversations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderId: currentUser._id,
            receiverId: chat._id
          })
        }
      );

      const convo = await res.json();
      convoId = convo._id;

      setContacts(prev => [
        ...prev,
        { _id: chat._id, name: chat.name, conversationId: convoId }
      ]);
setUnreadCounts(prev => ({
  ...prev,
  [String(convoId)]: 0
}));
    }

    setConversationId(convoId);

    socket.emit("joinConversation", convoId);

    const msgRes = await fetch(
      `${reactbaseurl}/conversations/${convoId}/messages`
    );

    const msgData = await msgRes.json();

    setMessages(msgData);

    // ⭐ MARK MESSAGES AS READ
    await markMessagesAsRead(convoId);

  };


  /* ==============================
     SEND MESSAGE
  ============================== */

  const sendMessage = () => {

    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {

      conversationId,
      senderId: currentUser._id,
      senderName: currentUser.name,
      text: newMessage

    });

    setNewMessage("");

  };


  /* ==============================
     CREATE GROUP
  ============================== */

  const toggleMember = (id) => {

    setSelectedMembers(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );

  };

  const createGroup = async () => {

    if (!groupName || selectedMembers.length === 0) {
      alert("Enter group name and select members");
      return;
    }

    const res = await fetch(
      `${reactbaseurl}/conversations/createGroup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: groupName,
          participants: [...selectedMembers, currentUser._id],
          createdBy: currentUser._id
        })
      }
    );

    const data = await res.json();

    if (data._id) {
      setGroups(prev => [...prev, data]);
    }

    setShowGroupModal(false);
    setGroupName("");
    setSelectedMembers([]);

  };


  /* ==============================
     SEARCH USERS
  ============================== */

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (!currentUser) return <div>Loading...</div>;


  return (

    <div className="chat-container">

      <div className="chat-sidebar">

        <input
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {currentUser?.role === "admin" && (
          <button
            className="create-group-btn"
            onClick={() => setShowGroupModal(true)}
          >
            ➕ Create Group
          </button>
        )}

        <div className="group-title">Groups</div>

        {groups.map(group => (

          <div
            key={group._id}
            className="chat-item"
            onClick={() => openChat({
              type: "group",
              _id: group._id,
              name: group.name,
              conversationId: group._id
            })}
          >
            👥 {group.name}
          </div>

        ))}

        {!searchTerm && (

          <>
            <div className="personal-title">Chats</div>

            {/* {contacts.map(user => (

              <div
                key={user._id}
                className="chat-item"
                onClick={() => openChat({
                  type: "individual",
                  _id: user._id,
                  name: user.name,
                  conversationId: user.conversationId
                })}
              >
                👤 {user.name}
              </div>

            ))} */}
{contacts.map(user => {

  const convoId = String(user.conversationId);
  const count = unreadCounts[convoId] || 0;

  return (
    <div
      key={user._id}
      className="chat-item"
      onClick={() => openChat({
        type: "individual",
        _id: user._id,
        name: user.name,
        conversationId: user.conversationId
      })}
    >
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        
        <span>👤 {user.name}</span>

        {count > 0 && (
          <span className="chat-badge">{count}</span>
        )}

      </div>
    </div>
  );
})}
          </>

        )}

        {searchTerm && (

          <>
            <div className="personal-title">Search</div>

            {filteredUsers.map(user => (

              <div
                key={user._id}
                className="chat-item"
                onClick={() => openChat({
                  type: "individual",
                  _id: user._id,
                  name: user.name
                })}
              >
                👤 {user.name}
              </div>

            ))}

          </>

        )}

      </div>


      {/* CHAT AREA */}

      <div className="chat-main">

        {selectedChat ? (

          <>

            <div className="chat-header">{selectedChat.name}</div>

            <div className="chat-messages">

              {messages.map(msg => {

                const senderId = msg.sender?._id || msg.senderId;
                const senderName = msg.sender?.name || msg.senderName;

                const isMe = senderId === currentUser._id;

                return (

                  <div
                    key={msg._id}
                    className={`chat-message ${isMe ? "me" : "other"}`}
                  >

                    <div className="chat-bubble">

                      {selectedChat.type === "group" && !isMe && (
                        <div className="sender-name">
                          {senderName}
                        </div>
                      )}

                      <div>{msg.text}</div>

                      <div className="chat-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>

                    </div>

                  </div>

                );

              })}

              <div ref={messagesEndRef}></div>

            </div>

            <div className="chat-input">

              <input
                placeholder="Type message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />

              <button onClick={sendMessage}>Send</button>

            </div>

          </>

        ) : (

          <div className="no-chat">
            Select a chat
          </div>

        )}

      </div>


      {/* GROUP MODAL */}

      {currentUser?.role === "admin" && showGroupModal && (

        <div className="group-modal">

          <div className="modal-content">

            <h3>Create Group</h3>

            <input
              placeholder="Group name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />

            <div className="member-list">

              {users.map(user => (

                <label key={user._id}>

                  <input
                    type="checkbox"
                    onChange={() => toggleMember(user._id)}
                  />

                  {user.name}

                </label>

              ))}

            </div>

            <button onClick={createGroup}>Create</button>
            <button onClick={() => setShowGroupModal(false)}>Cancel</button>

          </div>

        </div>

      )}

    </div>

  );

};

export default ChatScreen;

// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import "./ChatScreen.css";

// const reactbaseurl = process.env.REACT_APP_API_BASE_URL;
// const socket = io("http://localhost:3009");

// const ChatScreen = () => {

//   const [currentUser, setCurrentUser] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [selectedChat, setSelectedChat] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const [unreadCounts, setUnreadCounts] = useState({});

//   const messagesEndRef = useRef(null);

//   /* ==============================
//      LOAD USER
//   ============================== */
//   useEffect(() => {
//     const loadUser = async () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       const res = await fetch(`${reactbaseurl}/getUserById/${userId}`);
//       const data = await res.json();

//       if (data.success) {
//         setCurrentUser(data.data);
//       }
//     };

//     loadUser();
//   }, []);

//   /* ==============================
//      REGISTER SOCKET USER
//   ============================== */
//   useEffect(() => {
//     if (currentUser?._id) {
//       socket.emit("registerUser", currentUser._id);
//     }
//   }, [currentUser]);

//   /* ==============================
//      LOAD CONTACTS + UNREAD
//   ============================== */
//   useEffect(() => {

//     if (!currentUser) return;

//     const loadData = async () => {

//       // USERS
//       const userRes = await fetch(`${reactbaseurl}/getActiveUsers`);
//       const userData = await userRes.json();
//       setUsers(userData.filter(u => u._id !== currentUser._id));

//       // CONVERSATIONS
//       const convoRes = await fetch(
//         `${reactbaseurl}/conversations/user/${currentUser._id}`
//       );

//       const convoJson = await convoRes.json();
//       const conversations = convoJson.data || [];

//       const contactUsers = conversations.map(convo => {

//         const otherUser = convo.participants.find(
//           p => p._id !== currentUser._id
//         );

//         return {
//           _id: otherUser._id,
//           name: otherUser.name,
//           conversationId: convo._id
//         };
//       });

//       setContacts(contactUsers);

//       // ✅ UNREAD COUNT (SAFE)
//       const unreadRes = await fetch(
//         `${reactbaseurl}/messages/unread-count/${currentUser._id}`
//       );

//       const unreadJson = await unreadRes.json();

//       console.log("Unread API:", unreadJson);

//       const list = Array.isArray(unreadJson)
//         ? unreadJson
//         : unreadJson.data || [];

//       const counts = {};

//       list.forEach(item => {
//         counts[item.conversationId] = item.count;
//       });

//       setUnreadCounts(counts);

//     };

//     loadData();

//   }, [currentUser]);

//   /* ==============================
//      SOCKET EVENTS
//   ============================== */
//   useEffect(() => {

//     socket.on("receiveMessage", (message) => {

//       if (message.conversationId === conversationId) {
//         setMessages(prev => [...prev, message]);

//         socket.emit("markAsRead", {
//           conversationId,
//           userId: currentUser._id
//         });
//       }

//     });

//     socket.on("newMessageNotification", ({ message, conversation }) => {

//       const convoId = conversation._id;

//       const otherUser = conversation.participants.find(
//         p => p._id !== currentUser._id
//       );

//       if (!otherUser) return;

//       // update contacts
//       setContacts(prev => {
//         const filtered = prev.filter(c => c.conversationId !== convoId);

//         return [
//           {
//             _id: otherUser._id,
//             name: otherUser.name,
//             conversationId: convoId
//           },
//           ...filtered
//         ];
//       });

//       // update unread
//       if (convoId !== conversationId) {
//         setUnreadCounts(prev => ({
//           ...prev,
//           [convoId]: (prev[convoId] || 0) + 1
//         }));
//       }

//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("newMessageNotification");
//     };

//   }, [conversationId, currentUser]);

//   /* ==============================
//      OPEN CHAT
//   ============================== */
//   const openChat = async (chat) => {

//     setSelectedChat(chat);
//     let convoId = chat.conversationId;

//     setConversationId(convoId);

//     socket.emit("joinConversation", convoId);

//     const msgRes = await fetch(
//       `${reactbaseurl}/conversations/${convoId}/messages`
//     );

//     const msgData = await msgRes.json();
//     setMessages(msgData);

//     // reset unread
//     setUnreadCounts(prev => ({
//       ...prev,
//       [convoId]: 0
//     }));

//     socket.emit("markAsRead", {
//       conversationId: convoId,
//       userId: currentUser._id
//     });

//   };

//   /* ==============================
//      SEND MESSAGE
//   ============================== */
//   const sendMessage = () => {

//     if (!newMessage.trim()) return;

//     socket.emit("sendMessage", {
//       conversationId,
//       senderId: currentUser._id,
//       text: newMessage
//     });

//     setNewMessage("");
//   };

//   /* ==============================
//      AUTO SCROLL
//   ============================== */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!currentUser) return <div>Loading...</div>;

//   return (
//     <div className="chat-container">

//       <div className="chat-sidebar">

//         {contacts.map(user => (

//           <div
//             key={user._id}
//             className="chat-item"
//             onClick={() => openChat(user)}
//           >
//             👤 {user.name}

//             {unreadCounts[user.conversationId] > 0 && (
//               <span className="chat-badge">
//                 {unreadCounts[user.conversationId]}
//               </span>
//             )}

//           </div>

//         ))}

//       </div>

//       <div className="chat-main">

//         {selectedChat ? (
//           <>
//             <div className="chat-header">{selectedChat.name}</div>

//             <div className="chat-messages">

//               {messages.map(msg => {
//                 const isMe =
//                   (msg.sender?._id || msg.senderId) === currentUser._id;

//                 return (
//                   <div
//                     key={msg._id}
//                     className={`chat-message ${isMe ? "me" : "other"}`}
//                   >
//                     <div className="chat-bubble">{msg.text}</div>
//                   </div>
//                 );
//               })}

//               <div ref={messagesEndRef}></div>

//             </div>

//             <div className="chat-input">
//               <input
//                 value={newMessage}
//                 onChange={e => setNewMessage(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && sendMessage()}
//               />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           </>
//         ) : (
//           <div>Select a chat</div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default ChatScreen;