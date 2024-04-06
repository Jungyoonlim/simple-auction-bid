import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { reservation } from './models/reservation';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the GPU Auction House!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const reservations: reservation[] = [];

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

