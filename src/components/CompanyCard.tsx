
import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Company } from '../types/Company';

interface CompanyCardProps {
  company: Company;
  onClose: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md mx-4 relative animate-scale-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: company.hasActiveCoin ? company.color : '#CCCCCC' }}
          >
            {company.name.charAt(0)}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {company.name}
          </h2>
          
          {!company.hasActiveCoin && (
            <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              No Active Coin
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Market Cap:</span>
            <span className="font-bold text-lg">
              ${company.marketCap.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Employees:</span>
            <span className="font-medium">{company.holders}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">CEO:</span>
            <span className="font-medium">
              {company.ceo ? (
                <span className="flex items-center">
                  👑 {company.ceo}
                </span>
              ) : (
                <span className="text-gray-400">No CEO</span>
              )}
            </span>
          </div>

          {company.creationTime && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium text-sm">
                {company.creationTime.toLocaleDateString()}
              </span>
            </div>
          )}

          {company.trending && (
            <div className="flex justify-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                📈 Trending
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {company.pumpFunUrl && (
            <a
              href={company.pumpFunUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105"
            >
              <span>Buy on Pump.fun</span>
              <ExternalLink size={16} />
            </a>
          )}
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://stonkchain.fun/${company.name.toLowerCase()}`);
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Copy Company URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
