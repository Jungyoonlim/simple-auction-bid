import { Auction } from '../models/auction';
import { getReservationById, updateReservationStatus } from './reservationService';

let auctions: Auction[] = []; 

export function createAuction(reservationId: string, startTime: Date, endTime: Date, status: 'open' | 'closed', currentBid: number): Auction {
    const reservation = getReservationById(reservationId);
    if (!reservation) {
        throw new Error('Reservation not found');
    }

    const auction: Auction = {
        id: Date.now().toString(), 
        reservationId,
        startTime,
        endTime,
        status: 'open',
        currentBid: 0,
    };
    auctions.push(auction);
    return auction;
}

export function placeBid(id: string, bidAmount: number): Auction {
    const auction = auctions.find((auction) => auction.id === id);
    if (!auction) {
        throw new Error('Auction not found');
    }
    if (bidAmount <= auction.currentBid) {
        throw new Error('Bid amount must be greater than current bid');
    }
    auction.currentBid = bidAmount;
    return auction;
}

export function closeAuction(id: string): void {
    const auction = auctions.find((auction) => auction.id === id);
    if (!auction) {
        throw new Error('Auction not found');
    }
    auction.status = 'closed';
    const reservation = getReservationById(auction.id);
    if (reservation) {
      updateReservationStatus(reservation.id, 'approved');
    }
}

export function getCurrentBid(id: string): number {
    const auction = auctions.find((auction) => auction.id === id);
    return auction ? auction.currentBid : 0;
}

