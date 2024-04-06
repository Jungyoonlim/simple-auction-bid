import { reservation } from '../models/reservation';
import { reservations } from '../app';

export function createReservation(id: string, name: string, gpuType: string, gpuCount: number, duration: number, bidPrice: number, startTime: Date, endTime: Date) {
  const newReservation: reservation = {
    id,
    name,
    gpuType,
    gpuCount,
    duration,
    bidPrice,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status: 'pending',
  };
  reservations.push(newReservation);
  return newReservation;
}

export function getReservationById(id: string): reservation | undefined {
  return reservations.find((r) => r.id === id);
}

export function updateReservationStatus(reservationId: string, status: 'approved' | 'rejected'): void {
  const reservation = getReservationById(reservationId);
  if (reservation) {
    reservation.status = status;
  }
}