export interface Bid{
id: number;
vehicleId: number;             
userId: number;                
amount: number;                
timestamp: Date;             
status: 'active' | 'outbid' | 'won';
}