
export interface Company {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  marketCap: number;
  ceo: string | null;
  ceoWallet: string | null;
  holders: number;
  creationTime: Date | null;
  pumpFunUrl: string | null;
  color: string;
  hasActiveCoin: boolean;
  trending: boolean;
}

export interface Treaty {
  id: string;
  company1: string;
  company2: string;
  votes1: number;
  votes2: number;
  status: 'pending' | 'active' | 'broken';
  createdAt: Date;
}

export interface Vote {
  id: string;
  treatyId: string;
  voterWallet: string;
  companyId: string;
  voteType: 'create' | 'break';
  vote: 'yes' | 'no';
  timestamp: Date;
}
