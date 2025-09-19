import React, { useState, useRef, useEffect } from "react";
import "./ChatScreen.css";

const initialMessages = [
  { id: 1, senderId: "me", senderName: "You", text: "Hey team!", timestamp: Date.now() - 60000 },
  { id: 2, senderId: "2", senderName: "Agent 2", text: "Hello! How can we help?", timestamp: Date.now() - 30000 },
//   { id: 3, senderId: "3", senderName: "Agent 3", text: "CDR Team here, ready for updates.", timestamp: Date.now() - 10000 },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      senderId: "me",
      senderName: "You",
      text: newMessage,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="full-chat-container">
      <div className="chat-screen">
        <div className="chat-header">Team Chat</div>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.senderId === "me" ? "me" : "other"}`}
            >
              <div className="chat-bubble">
                <div className="chat-text">{msg.text}</div>
                <div className="chat-meta">
  <strong>{msg.senderName} · </strong>
  {new Date(msg.timestamp).toLocaleTimeString([], {
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
      </div>
    </div>
  );
};

export default ChatScreen;
