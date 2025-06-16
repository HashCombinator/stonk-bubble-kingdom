
import React from 'react';
import { Company } from '../types/Company';

interface DashboardProps {
  companies: Company[];
  onCompanySelect: (company: Company) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ companies, onCompanySelect }) => {
  const topCompanies = companies
    .filter(c => c.hasActiveCoin)
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, 10);

  return (
    <div className="bg-black bg-opacity-5 backdrop-blur-sm rounded-lg p-4 min-w-[300px] max-h-[400px] overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-2xl mr-2">🏆</span>
        Top Companies
      </h3>
      
      <div className="space-y-2">
        {topCompanies.map((company, index) => (
          <button
            key={company.id}
            onClick={() => onCompanySelect(company)}
            className="w-full text-left p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-all duration-200 hover:scale-105 flex items-center space-x-3"
          >
            <div className="text-lg font-bold text-gray-600 w-8">
              #{index + 1}
            </div>
            
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: company.color }}
            >
              {company.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="font-medium text-gray-800">{company.name}</div>
              <div className="text-sm text-gray-600">
                ${company.marketCap.toLocaleString()}
                {company.ceo && (
                  <span className="ml-2 text-yellow-600">👑 {company.ceo}</span>
                )}
              </div>
            </div>
            
            {company.trending && (
              <span className="text-green-500 text-sm">📈</span>
            )}
          </button>
        ))}
      </div>
      
      {topCompanies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🎯</div>
          <p>No active companies yet!</p>
          <p className="text-sm">Be the first CEO</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
