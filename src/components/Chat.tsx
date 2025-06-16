
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  userType: 'employee' | 'ceo' | 'holder';
  company?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'Employee_1337',
      message: 'Welcome to StonkChain! 🚀',
      timestamp: new Date(),
      userType: 'employee'
    },
    {
      id: '2',
      user: 'APPLE CEO',
      message: 'Just launched my Apple coin! 🍎',
      timestamp: new Date(),
      userType: 'ceo',
      company: 'Apple'
    },
    {
      id: '3',
      user: 'Tesla Holder',
      message: '$treaty Tesla NVIDIA',
      timestamp: new Date(),
      userType: 'holder',
      company: 'Tesla'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: `Employee_${Math.floor(Math.random() * 9999)}`,
      message: newMessage,
      timestamp: new Date(),
      userType: 'employee'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-lg p-4 w-80 h-64 flex flex-col">
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
        <span className="text-lg mr-2">💬</span>
        Global Chat
      </h3>
      
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg) => (
          <div key={msg.id} className="text-xs">
            <span className="font-medium">
              {msg.userType === 'ceo' && '👑 '}
              {msg.userType === 'holder' && '💎 '}
              {msg.user}:
            </span>
            <span className="ml-1 text-gray-700">{msg.message}</span>
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-xs bg-white bg-opacity-70 rounded-lg outline-none focus:bg-opacity-90 transition-all"
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
        >
          <Send size={14} />
        </button>
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        Commands: $treaty [company1] [company2], $break treaty [company1] [company2]
      </div>
    </div>
  );
};

export default Chat;
