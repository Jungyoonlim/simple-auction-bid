export interface Auction {
    id: string;
    reservationId: string;
    startTime: Date;
    endTime: Date;
    status: 'open' | 'closed';
    currentBid: number;
  }