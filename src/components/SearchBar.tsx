
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Company } from '../types/Company';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchResults: Company[];
  isOpen: boolean;
  onCompanySelect: (company: Company) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  searchResults,
  isOpen,
  onCompanySelect,
  onClose
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg min-w-[400px]">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search companies..."
          value={query}
          onChange={handleInputChange}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              onSearch('');
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl max-h-60 overflow-y-auto z-50">
          {searchResults.map((company) => (
            <button
              key={company.id}
              onClick={() => onCompanySelect(company)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: company.hasActiveCoin ? company.color : '#CCCCCC' }}
              >
                {company.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{company.name}</div>
                <div className="text-sm text-gray-500">
                  ${company.marketCap.toLocaleString()} 
                  {company.ceo && <span className="ml-2">👑 {company.ceo}</span>}
                </div>
              </div>
              {company.trending && (
                <span className="text-green-500 text-sm">📈 Trending</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
