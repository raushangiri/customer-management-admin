// // Chat.js

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// const socket = io('http://localhost:3007'); // Replace with your server URL

// const Chat = ({ userId, recipientId }) => {
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fetchMessages = async () => {
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/messages`, {
//             params: { senderId: userId, recipientId },
//         });
//         setMessages(response.data.data);
//         setUnreadCount(response.data.data.filter((msg) => !msg.read && msg.senderId !== userId).length);
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         // You can also set an error state here if needed
//     }
// };


// const handleSendMessage = async (messageData) => {
//     try {
//         const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/messages/send`, messageData);
//         console.log('Message sent successfully:', response.data);
//         // Update UI or handle success
//     } catch (error) {
//         console.error('Error sending message:', error.response ? error.response.data : error.message);
//         // Optionally handle error state
//     }
// };


//   useEffect(() => {
//     fetchMessages();

//     socket.on('receiveMessage', (messageData) => {
//       setMessages((prevMessages) => [...prevMessages, messageData]);
//       if (messageData.recipientId === userId) {
//         setUnreadCount((prevCount) => prevCount + 1);
//       }
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, [userId, recipientId]);

//   return (
//     <div>
//       <div>
//         <h3>Chat</h3>
//         <div>
//           {messages.map((msg, index) => (
//             <div key={index} style={{ textAlign: msg.senderId === userId ? 'right' : 'left' }}>
//               <strong>{msg.senderId}: </strong>
//               {msg.content}
//             </div>
//           ))}
//         </div>
//         <div>
//           <input
//             type="text"
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       </div>
//       {unreadCount > 0 && <p>You have {unreadCount} unread messages!</p>}
//     </div>
//   );
// };

// export default Chat;
