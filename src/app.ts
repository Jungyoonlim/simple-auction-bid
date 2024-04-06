import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { reservation } from './models/reservation';
import { createReservation } from './services/reservationService';
import { createAuction, placeBid, closeAuction } from './services/auctionService';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Welcome to the GPU Auction House!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export const reservations: reservation[] = [];

app.post('/reservations', (req, res) => {
    const { name, gpuType, gpuCount, duration, bidPrice, startTime, endTime } = req.body;
    const reservation: reservation = {
        id: Date.now().toString(),
        name,
        gpuType,
        gpuCount,
        duration,
        bidPrice,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'pending',
      };
    reservations.push(reservation);
    console.log('Reservations:', reservations);
    res.status(201).json(reservation);
});

app.post('/auctions', (req, res) => {
    const { reservationId, startTime, endTime } = req.body;
    try {
      const auction = createAuction(reservationId, new Date(startTime), new Date(endTime), 'open', 0);
      res.status(201).json(auction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.post('/auctions/:auctionId/bids', (req, res) => {
    const { auctionId } = req.params;
    const { bidAmount } = req.body;
    placeBid(auctionId, bidAmount);
    res.sendStatus(200);
  });
  
  app.post('/auctions/:auctionId/close', (req, res) => {
    const { auctionId } = req.params;
    closeAuction(auctionId);
    res.sendStatus(200);
  });