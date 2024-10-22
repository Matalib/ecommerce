import React, { useState, useRef } from 'react';
import './Chatbot.css'; // Ensure you have this CSS file for styling

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const chatBoxRef = useRef(null);

    const addMessage = (sender, message) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // Auto-scroll
    };

    const getBotResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('product')) {
            return "We have a variety of products available! What are you looking for?";
        } else if (lowerMessage.includes('price')) {
            return "Please specify the product you are inquiring about.";
        } else if (lowerMessage.includes('order')) {
            return "You can check your order status in your account.";
        } else {
            return "I'm sorry, I didn't understand that. Can you please rephrase?";
        }
    };

    const handleSendMessage = () => {
        if (userMessage.trim()) {
            addMessage('user', userMessage);
            const botResponse = getBotResponse(userMessage);
            addMessage('bot', botResponse);
            setUserMessage(''); // Clear input field
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div id="chat-container">
            <div id="chat-box" ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div id="user-input">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyUp={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;