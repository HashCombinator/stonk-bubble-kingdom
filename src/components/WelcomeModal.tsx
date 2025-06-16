
import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl mx-4 relative animate-scale-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-purple-600">StonkChain.fun</span>
          </h1>
          
          <div className="text-left space-y-4 text-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">How to Play</h2>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <p><strong>Become a CEO:</strong> Create a memecoin on pump.fun and set the website to stonkchain.fun/[company-name]</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💎</span>
                <p><strong>Stay CEO:</strong> Keep your coin above $5k market cap or lose your position after 15 minutes</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🤝</span>
                <p><strong>Create Treaties:</strong> Holders can vote to form alliances between companies</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📈</span>
                <p><strong>Bubble Size:</strong> Represents the market cap of each company's memecoin</p>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="text-2xl">👥</span>
                <p><strong>Employees:</strong> Hold company coins to participate in voting and treaties</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-xl transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Ready to Invest! 🚀
            </button>
            
            <p className="text-sm text-gray-500">
              Connect your Solana wallet to participate in the game
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
