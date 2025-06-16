
import { Company } from '../types/Company';

const companyNames = [
  'Apple', 'Microsoft', 'Google', 'Amazon', 'Meta', 'Tesla', 'NVIDIA', 'Netflix', 
  'Disney', 'Spotify', 'Roblox', 'Nintendo', 'PlayStation', 'Xbox', 'Snapchat', 
  'YouTube', 'TikTok', 'OpenAI', 'Neuralink', 'SpaceX', 'Starlink', 'Twitter', 
  'Reddit', 'Coinbase', 'Binance', 'PayPal', 'Visa', 'Mastercard', 'Robinhood', 
  'Airbnb', 'Uber', 'Lyft', 'DoorDash', 'Shein', 'Temu', 'Bing', 'Zoom', 
  'Twitch', 'Epic Games', 'EA', 'Lamborghini', 'Porsche', 'BMW', 'Mercedes-Benz', 
  'Shell', 'Chevron', 'AMD', 'Intel', 'Samsung', 'HP', 'Alienware', 'GoPro', 
  'Boeing', 'Adobe', 'eBay', 'Costco', 'Target', 'Walmart', 'Starbucks', 
  'McDonald\'s', 'Chipotle', 'Domino\'s', 'KFC'
];

const generateRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
    '#FF7675', '#74B9FF', '#A29BFE', '#FD79A8', '#FDCB6E', '#6C5CE7',
    '#00CEC9', '#55A3FF', '#FF9F43', '#26DE81', '#FD79A8', '#2D3436'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateMockMarketCap = () => {
  // Generate random market caps between 100 and 50000
  return Math.floor(Math.random() * 49900) + 100;
};

export const companies: Company[] = companyNames.map((name, index) => ({
  id: `company-${index}`,
  name,
  symbol: name.toUpperCase().substring(0, 4),
  logo: `https://images.unsplash.com/photo-1618160702438-9b02040d0a901?w=100&h=100&fit=crop&crop=center`, // Placeholder
  marketCap: generateMockMarketCap(),
  ceo: Math.random() > 0.7 ? `CEO${Math.floor(Math.random() * 1000)}` : null,
  ceoWallet: Math.random() > 0.7 ? `wallet${Math.floor(Math.random() * 10000)}` : null,
  holders: Math.floor(Math.random() * 1000) + 10,
  creationTime: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 86400000) : null,
  pumpFunUrl: Math.random() > 0.5 ? `https://pump.fun/${name.toLowerCase()}` : null,
  color: generateRandomColor(),
  hasActiveCoin: Math.random() > 0.6,
  trending: Math.random() > 0.8
}));
