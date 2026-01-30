export enum AssetType {
  STOCK = 'STOCK',
  CRYPTO = 'CRYPTO',
  FUND = 'FUND',
  FIXED_INCOME = 'FIXED_INCOME',
  OTHER = 'OTHER'
}

export const AssetTypeLabels: Record<AssetType, string> = {
  [AssetType.STOCK]: 'Ação',
  [AssetType.CRYPTO]: 'Criptomoeda',
  [AssetType.FUND]: 'Fundo de Investimento',
  [AssetType.FIXED_INCOME]: 'Renda Fixa',
  [AssetType.OTHER]: 'Outro'
};

export interface InvestmentRequest {
  type: AssetType;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
}

export interface Investment {
  id: number;
  type: AssetType;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface Summary {
  totalInvested: number;
  currentTotalValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  totalByType: Record<AssetType, number>;
  currentValueByType: Record<AssetType, number>;
  assetCount: number;
}
