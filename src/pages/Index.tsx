
import React, { useState, useEffect } from 'react';
import BubbleCanvas from '../components/BubbleCanvas';
import WelcomeModal from '../components/WelcomeModal';
import SearchBar from '../components/SearchBar';
import Dashboard from '../components/Dashboard';
import CompanyCard from '../components/CompanyCard';
import Chat from '../components/Chat';
import { Company } from '../types/Company';
import { companies } from '../data/companies';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setIsSearchOpen(false);
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }
    
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setIsSearchOpen(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Bubble Canvas */}
      <BubbleCanvas 
        companies={companies}
        onCompanyClick={handleCompanySelect}
        selectedCompany={selectedCompany}
      />

      {/* Overlay UI */}
      {!showWelcome && (
        <>
          {/* Search Bar */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
            <SearchBar 
              onSearch={handleSearch}
              searchResults={searchResults}
              isOpen={isSearchOpen}
              onCompanySelect={handleCompanySelect}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>

          {/* Dashboard */}
          <div className="absolute top-4 right-4 z-20">
            <Dashboard 
              companies={companies}
              onCompanySelect={handleCompanySelect}
            />
          </div>

          {/* Chat */}
          <div className="absolute bottom-4 left-4 z-20">
            <Chat />
          </div>

          {/* Connect Wallet Button */}
          <div className="absolute bottom-4 right-4 z-20">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-200 hover:scale-105">
              Connect Wallet
            </button>
          </div>

          {/* Notifications */}
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-lg p-4 min-w-[300px]">
              <h3 className="text-sm font-bold text-gray-700 mb-2">📢 Notifications</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>🚀 Welcome to StonkChain.fun!</p>
                <p>💎 Create memecoins to become CEO</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Welcome Modal */}
      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}

      {/* Company Information Card */}
      {selectedCompany && (
        <CompanyCard 
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default Index;
