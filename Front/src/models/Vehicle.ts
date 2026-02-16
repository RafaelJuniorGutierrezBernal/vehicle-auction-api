export interface Vehicle {
  vin: string;                   
  make: string;                  
  model: string;
  year: number;
  trim?: string;
  body?: string;
  transmission?: string;
  state?: string;
  condition?: number;
  odometer?: number;             
  color?: string;
  interior?: string;
  description?: string;
  imageUrl?: string;
  startingPrice?: number;
  currentPrice?: number;
  auctionEndDate?: Date;
  status?: "active" | "closed" | "pending";
}
