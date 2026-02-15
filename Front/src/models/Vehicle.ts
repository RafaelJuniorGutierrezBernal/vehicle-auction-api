export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  mileage: number; 
  color: string; 
  fuelType: string; 
  transmission: string; 
  description: string; 
  imageUrl: string; 
  startingPrice: number; 
  currentPrice: number; 
  auctionEndDate: Date;
  status: "active" | "closed" | "pending";
}
