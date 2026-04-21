// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import "./ChatScreen.css";

// const reactbaseurl = process.env.REACT_APP_API_BASE_URL;
// const socket = io("http://localhost:3009"); // Connect to Socket.IO server

// const ChatScreen = () => {

//   const [currentUser, setCurrentUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [groupName, setGroupName] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const messagesEndRef = useRef(null);

//   // ==============================
//   // FETCH CURRENT USER
//   // ==============================
//   useEffect(() => {

//     const fetchCurrentUser = async () => {

//       const storedUserId = localStorage.getItem("userId");

//       if (!storedUserId) return;

//       const res = await fetch(
//         `http://localhost:3009/api/v1/getUserById/${storedUserId}`
//       );

//       const data = await res.json();

//       if (data.success) {
//         setCurrentUser(data.data);
//       }

//     };

//     fetchCurrentUser();

//   }, []);

//   // ==============================
//   // FETCH USERS + GROUPS
//   // ==============================
//   useEffect(() => {

//     if (!currentUser) return;

//     const initData = async () => {

//       const userRes = await fetch(`${reactbaseurl}/getActiveUsers`);
//       const userData = await userRes.json();

//       setUsers(userData.filter(u => u._id !== currentUser._id));
// console.log(currentUser,"currentUser  ");
//       const groupRes = await fetch(
//         `${reactbaseurl}/conversations/user/${currentUser._id}`
//       );

//       const groupData = await groupRes.json();

//       setGroups(groupData.filter(c => c.type === "group"));

//     };

//     initData();

//   }, [currentUser]);

//   // ==============================
//   // AUTO SCROLL
//   // ==============================
//   useEffect(() => {

//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

//   }, [messages]);

//   // ==============================
//   // SOCKET RECEIVE MESSAGE
//   // ==============================
//   useEffect(() => {

//     socket.on("receiveMessage", message => {

//       if (message.conversationId === conversationId) {

//         setMessages(prev => [...prev, message]);

//       }

//     });

//     return () => socket.off("receiveMessage");

//   }, [conversationId]);

//   // ==============================
//   // OPEN CHAT
//   // ==============================
//   const openChat = async (chat) => {

//     setSelectedChat(chat);
//     setMessages([]);

//     setConversationId(chat._id);

//     socket.emit("joinConversation", chat._id);

//     const res = await fetch(
//       `${reactbaseurl}/conversations/${chat._id}/messages`
//     );

//     const data = await res.json();

//     setMessages(data);

//   };

//   // ==============================
//   // SEND MESSAGE
//   // ==============================
//   const sendMessage = () => {

//     if (!newMessage.trim()) return;

//     socket.emit("sendMessage", {
//       conversationId,
//       senderId: currentUser._id,
//       senderName: currentUser.name,
//       text: newMessage
//     });

//     setNewMessage("");

//   };

//   // ==============================
//   // CREATE GROUP
//   // ==============================
// const createGroup = async () => {

//   const res = await fetch(
//     `${reactbaseurl}/conversations/createGroup`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         name: groupName,
//         members: selectedMembers,
//         createdBy: currentUser._id
//       })
//     }
//   );

//   const group = await res.json();

//   setGroups(prev => [...prev, group]);

//   setShowGroupModal(false);
//   setGroupName("");
//   setSelectedMembers([]);

// };

//   const toggleMember = (id) => {

//     setSelectedMembers(prev =>
//       prev.includes(id)
//         ? prev.filter(m => m !== id)
//         : [...prev, id]
//     );

//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (!currentUser) return <div>Loading user...</div>;

//   return (

//     <div className="chat-container">

//       {/* ================= SIDEBAR ================= */}

//       <div className="chat-sidebar">

//         <div className="search-container">

//           <input
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />

//         </div>

//         {/* CREATE GROUP BUTTON */}

//         <button
//           className="create-group-btn"
//           onClick={() => setShowGroupModal(true)}
//         >
//           ➕ Create Group
//         </button>

//         {/* GROUP LIST */}

//         <div className="group-title">Groups</div>

//         {groups.map(group => (

//           <div
//             key={group._id}
//             className={`chat-item ${
//               selectedChat?._id === group._id ? "active" : ""
//             }`}
//             onClick={() =>
//               openChat({
//                 type: "group",
//                 _id: group._id,
//                 name: group.name,
//                 createdBy: group.createdBy
//               })
//             }
//           >
//             👥 {group.name}
//           </div>

//         ))}

//         {/* CONTACT LIST ONLY FOR CREATOR */}

//         {selectedChat?.createdBy === currentUser._id && (

//           <>
//             <div className="personal-title">Contacts</div>

//             {filteredUsers.map(user => (

//               <div
//                 key={user._id}
//                 className="chat-item"
//                 onClick={() =>
//                   openChat({
//                     type: "individual",
//                     _id: user._id,
//                     name: user.name
//                   })
//                 }
//               >
//                 👤 {user.name}
//               </div>

//             ))}

//           </>

//         )}

//       </div>

//       {/* ================= CHAT AREA ================= */}

//       <div className="chat-main">

//         {selectedChat ? (

//           <>

//             <div className="chat-header">{selectedChat.name}</div>

//             <div className="chat-messages">

//               {messages.map(msg => {

//                 const senderId = msg.sender?._id || msg.senderId;
//                 const senderName = msg.sender?.name || msg.senderName;

//                 const isMe = senderId === currentUser._id;

//                 return (

//                   <div
//                     key={msg._id}
//                     className={`chat-message ${isMe ? "me" : "other"}`}
//                   >

//                     <div className="chat-bubble">

//                       {selectedChat.type === "group" && !isMe && (
//                         <div className="sender-name">
//                           {senderName}
//                         </div>
//                       )}

//                       <div>{msg.text}</div>

//                       <div className="chat-time">
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>

//                     </div>

//                   </div>

//                 );

//               })}

//               <div ref={messagesEndRef}></div>

//             </div>

//             <div className="chat-input">

//               <input
//                 placeholder="Type message..."
//                 value={newMessage}
//                 onChange={e => setNewMessage(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && sendMessage()}
//               />

//               <button onClick={sendMessage}>Send</button>

//             </div>

//           </>

//         ) : (

//           <div className="no-chat">Select a chat</div>

//         )}

//       </div>

//       {/* ================= CREATE GROUP MODAL ================= */}

//       {showGroupModal && (

//         <div className="group-modal">

//           <div className="modal-content">

//             <h3>Create Group</h3>

//             <input
//               placeholder="Group name"
//               value={groupName}
//               onChange={e => setGroupName(e.target.value)}
//             />

//             <div className="member-list">

//               {users.map(user => (

//                 <label key={user._id}>

//                   <input
//                     type="checkbox"
//                     onChange={() => toggleMember(user._id)}
//                   />

//                   {user.name}

//                 </label>

//               ))}

//             </div>

//             <button onClick={createGroup}>Create</button>

//             <button onClick={() => setShowGroupModal(false)}>
//               Cancel
//             </button>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// };

// export default ChatScreen;


// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import "./ChatScreen.css";

// const reactbaseurl = process.env.REACT_APP_API_BASE_URL;
// const socket = io("http://localhost:3009");

// const ChatScreen = () => {

// const [currentUser,setCurrentUser] = useState(null);
// const [users,setUsers] = useState([]);
// const [contacts,setContacts] = useState([]);
// const [groups,setGroups] = useState([]);

// const [searchTerm,setSearchTerm] = useState("");

// const [selectedChat,setSelectedChat] = useState(null);
// const [conversationId,setConversationId] = useState(null);
// const [messages,setMessages] = useState([]);
// const [newMessage,setNewMessage] = useState("");

// const messagesEndRef = useRef(null);


// // ==============================
// // LOAD CURRENT USER
// // ==============================

// useEffect(()=>{

// const loadUser = async ()=>{

// const storedUserId = localStorage.getItem("userId");

// if(!storedUserId) return;

// const res = await fetch(
// `http://localhost:3009/api/v1/getUserById/${storedUserId}`
// );

// const data = await res.json();

// if(data.success){
// setCurrentUser(data.data);
// }

// };

// loadUser();

// },[]);


// // ==============================
// // LOAD USERS + CONVERSATIONS
// // ==============================

// useEffect(()=>{

// if(!currentUser) return;

// const loadData = async()=>{

// const userRes = await fetch(`${reactbaseurl}/getActiveUsers`);
// const userData = await userRes.json();

// setUsers(userData.filter(u=>u._id !== currentUser._id));

// const convoRes = await fetch(
// `${reactbaseurl}/conversations/user/${currentUser._id}`
// );

// const response = await convoRes.json();

// const conversations = response.data || [];


// // GROUPS

// setGroups(
// conversations.filter(c=>c.type === "group")
// );


// // CONTACT LIST

// const personalChats = conversations.filter(
// c=>c.type === "individual"
// );

// const contactUsers = personalChats.map(convo=>{

// const otherUser = convo.participants.find(
// p=>p._id !== currentUser._id
// );

// if(!otherUser) return null;

// return{
// _id: otherUser._id,
// name: otherUser.name,
// conversationId: convo._id
// };

// }).filter(Boolean);

// setContacts(contactUsers);

// };

// loadData();

// },[currentUser]);


// // ==============================
// // AUTO SCROLL
// // ==============================

// useEffect(()=>{
// messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
// },[messages]);


// // ==============================
// // SOCKET RECEIVE MESSAGE
// // ==============================

// useEffect(()=>{

// socket.on("receiveMessage",message=>{

// if(message.conversationId === conversationId){
// setMessages(prev=>[...prev,message]);
// }

// });

// return ()=> socket.off("receiveMessage");

// },[conversationId]);


// // ==============================
// // OPEN CHAT
// // ==============================

// const openChat = async(chat)=>{

// setSelectedChat(chat);
// setMessages([]);

// let convoId = chat.conversationId;

// if(!convoId){

// const res = await fetch(
// `${reactbaseurl}/conversations`,
// {
// method:"POST",
// headers:{"Content-Type":"application/json"},
// body:JSON.stringify({
// senderId: currentUser._id,
// receiverId: chat._id
// })
// }
// );

// const convo = await res.json();

// convoId = convo._id;

// setContacts(prev=>[
// ...prev,
// {_id:chat._id,name:chat.name,conversationId:convoId}
// ]);

// }

// setConversationId(convoId);

// socket.emit("joinConversation",convoId);

// const msgRes = await fetch(
// `${reactbaseurl}/conversations/${convoId}/messages`
// );

// const msgData = await msgRes.json();

// setMessages(msgData);

// };


// // ==============================
// // SEND MESSAGE
// // ==============================

// const sendMessage = ()=>{

// if(!newMessage.trim()) return;

// socket.emit("sendMessage",{

// conversationId,
// senderId: currentUser._id,
// senderName: currentUser.name,
// text:newMessage

// });

// setNewMessage("");

// };


// // ==============================
// // SEARCH USERS
// // ==============================

// const filteredUsers = users.filter(user=>
// user.name.toLowerCase().includes(searchTerm.toLowerCase())
// );


// if(!currentUser) return <div>Loading...</div>;


// return(

// <div className="chat-container">

// <div className="chat-sidebar">

// <input
// placeholder="Search users..."
// value={searchTerm}
// onChange={e=>setSearchTerm(e.target.value)}
// />


// {/* GROUPS */}

// <div className="group-title">Groups</div>

// {groups.map(group=>(
// <div
// key={group._id}
// className="chat-item"
// onClick={()=>openChat({
// type:"group",
// _id:group._id,
// name:group.name,
// conversationId:group._id
// })}
// >
// 👥 {group.name}
// </div>
// ))}


// {/* CONTACT LIST */}

// {!searchTerm && (

// <>
// <div className="personal-title">Chats</div>

// {contacts.map(user=>(
// <div
// key={user._id}
// className="chat-item"
// onClick={()=>openChat({
// type:"individual",
// _id:user._id,
// name:user.name,
// conversationId:user.conversationId
// })}
// >
// 👤 {user.name}
// </div>
// ))}

// </>

// )}


// {/* SEARCH USERS */}

// {searchTerm && (

// <>
// <div className="personal-title">Search</div>

// {filteredUsers.map(user=>(
// <div
// key={user._id}
// className="chat-item"
// onClick={()=>openChat({
// type:"individual",
// _id:user._id,
// name:user.name
// })}
// >
// 👤 {user.name}
// </div>
// ))}

// </>

// )}

// </div>


// <div className="chat-main">

// {selectedChat ? (

// <>

// <div className="chat-header">{selectedChat.name}</div>

// <div className="chat-messages">

// {messages.map(msg=>{

// const senderId = msg.sender?._id || msg.senderId;
// const senderName = msg.sender?.name || msg.senderName;

// const isMe = senderId === currentUser._id;

// return(

// <div
// key={msg._id}
// className={`chat-message ${isMe?"me":"other"}`}
// >

// <div className="chat-bubble">

// {selectedChat.type==="group" && !isMe && (
// <div className="sender-name">
// {senderName}
// </div>
// )}

// <div>{msg.text}</div>

// <div className="chat-time">
// {new Date(msg.createdAt).toLocaleTimeString([],{
// hour:"2-digit",
// minute:"2-digit"
// })}
// </div>

// </div>

// </div>

// );

// })}

// <div ref={messagesEndRef}></div>

// </div>

// <div className="chat-input">

// <input
// placeholder="Type message..."
// value={newMessage}
// onChange={e=>setNewMessage(e.target.value)}
// onKeyDown={e=> e.key==="Enter" && sendMessage()}
// />

// <button onClick={sendMessage}>Send</button>

// </div>

// </>

// ):(

// <div className="no-chat">
// Select a chat
// </div>

// )}

// </div>

// </div>

// );

// };

// export default ChatScreen;

// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import "./ChatScreen.css";

// const reactbaseurl = process.env.REACT_APP_API_BASE_URL;
// const socket = io("http://localhost:3009");
// // const socket = io("http://34.171.111.0:3009");

// const ChatScreen = () => {

//   const [currentUser, setCurrentUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [groups, setGroups] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [selectedChat, setSelectedChat] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   const [showGroupModal, setShowGroupModal] = useState(false);
//   const [groupName, setGroupName] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);

//   const messagesEndRef = useRef(null);


//   // ==============================
//   // LOAD CURRENT USER
//   // ==============================

//   useEffect(() => {

//     const loadUser = async () => {

//       const storedUserId = localStorage.getItem("userId");

//       if (!storedUserId) return;
//       const res = await fetch(
//         `${reactbaseurl}/getUserById/${storedUserId}`
//       );

//       const data = await res.json();

//       if (data.success) {
//         setCurrentUser(data.data);
//       }

//     };

//     loadUser();

//   }, []);


//   // ==============================
//   // LOAD USERS + CONVERSATIONS
//   // ==============================

//   useEffect(() => {

//     if (!currentUser) return;

//     const loadData = async () => {

//       const userRes = await fetch(`${reactbaseurl}/getActiveUsers`);
//       const userData = await userRes.json();

//       setUsers(userData.filter(u => u._id !== currentUser._id));

//       const convoRes = await fetch(
//         `${reactbaseurl}/conversations/user/${currentUser._id}`
//       );

//       const response = await convoRes.json();

//       const conversations = response.data || [];


//       // GROUPS

//       setGroups(
//         conversations.filter(c => c.type === "group")
//       );


//       // CONTACT LIST

//       const personalChats = conversations.filter(
//         c => c.type === "individual"
//       );

//       const contactUsers = personalChats.map(convo => {

//         const otherUser = convo.participants.find(
//           p => p._id !== currentUser._id
//         );

//         if (!otherUser) return null;

//         return {
//           _id: otherUser._id,
//           name: otherUser.name,
//           conversationId: convo._id
//         };

//       }).filter(Boolean);

//       setContacts(contactUsers);

//     };

//     loadData();

//   }, [currentUser]);


//   // ==============================
//   // AUTO SCROLL
//   // ==============================

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);


//   // ==============================
//   // SOCKET RECEIVE MESSAGE
//   // ==============================

//   useEffect(() => {

//     socket.on("receiveMessage", message => {

//       if (message.conversationId === conversationId) {
//         setMessages(prev => [...prev, message]);
//       }

//     });

//     return () => socket.off("receiveMessage");

//   }, [conversationId]);


//   // ==============================
//   // OPEN CHAT
//   // ==============================

//   const openChat = async (chat) => {

//     setSelectedChat(chat);
//     setMessages([]);

//     let convoId = chat.conversationId;

//     if (!convoId) {

//       const res = await fetch(
//         `${reactbaseurl}/conversations`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             senderId: currentUser._id,
//             receiverId: chat._id
//           })
//         }
//       );

//       const convo = await res.json();

//       convoId = convo._id;

//       setContacts(prev => [
//         ...prev,
//         { _id: chat._id, name: chat.name, conversationId: convoId }
//       ]);

//     }

//     setConversationId(convoId);

//     socket.emit("joinConversation", convoId);

//     const msgRes = await fetch(
//       `${reactbaseurl}/conversations/${convoId}/messages`
//     );

//     const msgData = await msgRes.json();

//     setMessages(msgData);

//   };


//   // ==============================
//   // SEND MESSAGE
//   // ==============================

//   const sendMessage = () => {

//     if (!newMessage.trim()) return;

//     socket.emit("sendMessage", {

//       conversationId,
//       senderId: currentUser._id,
//       senderName: currentUser.name,
//       text: newMessage

//     });

//     setNewMessage("");

//   };


//   // ==============================
//   // CREATE GROUP
//   // ==============================

//   const toggleMember = (id) => {

//     setSelectedMembers(prev =>
//       prev.includes(id)
//         ? prev.filter(m => m !== id)
//         : [...prev, id]
//     );

//   };

//   const createGroup = async () => {

//     if (!groupName || selectedMembers.length === 0) {
//       alert("Enter group name and select members");
//       return;
//     }

//     const res = await fetch(
//       `${reactbaseurl}/conversations/createGroup`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: groupName,
//           participants: [...selectedMembers, currentUser._id],
//           createdBy: currentUser._id
//         })
//       }
//     );

//     const data = await res.json();

//     if (data._id) {
//       setGroups(prev => [...prev, data]);
//     }

//     setShowGroupModal(false);
//     setGroupName("");
//     setSelectedMembers([]);

//   };


//   // ==============================
//   // SEARCH USERS
//   // ==============================

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );


//   if (!currentUser) return <div>Loading...</div>;


//   return (

//     <div className="chat-container">

//       <div className="chat-sidebar">

//         <input
//           placeholder="Search users..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />


//         {/* <button
//           className="create-group-btn"
//           onClick={() => setShowGroupModal(true)}
//         >
//           ➕ Create Group
//         </button> */}
// {currentUser?.role === "admin" && (
//   <button
//     className="create-group-btn"
//     onClick={() => setShowGroupModal(true)}
//   >
//     ➕ Create Group
//   </button>
// )}

//         {/* GROUPS */}

//         <div className="group-title">Groups</div>

//         {groups.map(group => (

//           <div
//             key={group._id}
//             className="chat-item"
//             onClick={() => openChat({
//               type: "group",
//               _id: group._id,
//               name: group.name,
//               conversationId: group._id
//             })}
//           >

//             👥 {group.name}

//           </div>

//         ))}


//         {/* CONTACT LIST */}

//         {!searchTerm && (

//           <>

//             <div className="personal-title">Chats</div>

//             {contacts.map(user => (

//               <div
//                 key={user._id}
//                 className="chat-item"
//                 onClick={() => openChat({
//                   type: "individual",
//                   _id: user._id,
//                   name: user.name,
//                   conversationId: user.conversationId
//                 })}
//               >

//                 👤 {user.name}

//               </div>

//             ))}

//           </>

//         )}


//         {/* SEARCH USERS */}

//         {searchTerm && (

//           <>

//             <div className="personal-title">Search</div>

//             {filteredUsers.map(user => (

//               <div
//                 key={user._id}
//                 className="chat-item"
//                 onClick={() => openChat({
//                   type: "individual",
//                   _id: user._id,
//                   name: user.name
//                 })}
//               >

//                 👤 {user.name}

//               </div>

//             ))}

//           </>

//         )}

//       </div>


//       {/* CHAT AREA */}

//       <div className="chat-main">

//         {selectedChat ? (

//           <>

//             <div className="chat-header">{selectedChat.name}</div>

//             <div className="chat-messages">

//               {messages.map(msg => {

//                 const senderId = msg.sender?._id || msg.senderId;
//                 const senderName = msg.sender?.name || msg.senderName;

//                 const isMe = senderId === currentUser._id;

//                 return (

//                   <div
//                     key={msg._id}
//                     className={`chat-message ${isMe ? "me" : "other"}`}
//                   >

//                     <div className="chat-bubble">

//                       {selectedChat.type === "group" && !isMe && (
//                         <div className="sender-name">
//                           {senderName}
//                         </div>
//                       )}

//                       <div>{msg.text}</div>

//                       <div className="chat-time">
//                         {new Date(msg.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>

//                     </div>

//                   </div>

//                 );

//               })}

//               <div ref={messagesEndRef}></div>

//             </div>

//             <div className="chat-input">

//               <input
//                 placeholder="Type message..."
//                 value={newMessage}
//                 onChange={e => setNewMessage(e.target.value)}
//                 onKeyDown={e => e.key === "Enter" && sendMessage()}
//               />

//               <button onClick={sendMessage}>Send</button>

//             </div>

//           </>

//         ) : (

//           <div className="no-chat">
//             Select a chat
//           </div>

//         )}

//       </div>


//       {/* GROUP MODAL */}

//     {currentUser?.role === "admin" && showGroupModal && (

//   <div className="group-modal">

//     <div className="modal-content">

//       <h3>Create Group</h3>

//       <input
//         placeholder="Group name"
//         value={groupName}
//         onChange={e => setGroupName(e.target.value)}
//       />

//       <div className="member-list">

//         {users.map(user => (

//           <label key={user._id}>

//             <input
//               type="checkbox"
//               onChange={() => toggleMember(user._id)}
//             />

//             {user.name}

//           </label>

//         ))}

//       </div>

//       <button onClick={createGroup}>Create</button>

//       <button onClick={() => setShowGroupModal(false)}>Cancel</button>

//     </div>

//   </div>

// )}

//     </div>

//   );

// };

// export default ChatScreen;

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatScreen.css";

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

  const messagesEndRef = useRef(null);

  /* ==============================
     LOAD CURRENT USER
  ============================== */

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

            {contacts.map(user => (

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

            ))}

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