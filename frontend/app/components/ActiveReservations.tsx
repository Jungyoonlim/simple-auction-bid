import React, { useEffect, useState } from 'react';
import { Reservation } from '../types';

const ActiveReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const response = await fetch('/api/reservations');
    const data = await response.json();
    setReservations(data);
  };

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold">Reservation #{reservation.id}</h3>
          <p>GPU Type: {reservation.gpuType}</p>
          <p>GPU Count: {reservation.gpuCount}</p>
          <p>Duration: {reservation.duration} hours</p>
          <p>Bid Price: ${reservation.bidPrice}</p>
          <p>Status: {reservation.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ActiveReservations;