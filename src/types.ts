export interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  change: number;
  available: number;
  tracked: boolean;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  lastSale?: number;
  views: number;
  maxResellPrice?: number;
  minResellPrice?: number;
  averagePrice?: number;
  priceHistory: {
    timestamp: number;
    price: number;
  }[];
}

export interface SnipeSettings {
  maxPrice: number;
  autoSnipe: boolean;
  alertPrice: number;
}

export interface Alert {
  id: number;
  itemId: number;
  maxPrice: number;
  createdAt: string;
}