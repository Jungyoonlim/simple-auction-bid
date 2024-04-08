'use client';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GPUGrid from './components/GPUGrid';
import AuctionForm from './components/AuctionForm';
import ActiveReservations from './components/ActiveReservations';
import { GpuCluster, Reservation } from './types';

export default function Home() {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchGpuClusters();
    fetchReservations();
  }, []);

  const fetchGpuClusters = async () => {
    const response = await fetch('/api/gpuClusters');
    const data = await response.json();
    setGpuClusters(data);
  };

  const fetchReservations = async () => {
    const response = await fetch('/api/reservations');
    const data = await response.json();
    setActiveReservations(data);
  };

  const handleBidSubmit = async (gpuClusterId: string, bidAmount: number) => {
    try {
      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gpuClusterId, bidAmount }),
      });

      if (response.ok) {
        // Refresh GPU clusters data after successful bid submission
        fetchGpuClusters();
      } else {
        console.error('Error submitting bid:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
    }
  };

return (
<Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
  <Row>
    <Col>
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center font-montserrat">
        GPU Auction
      </h1>
    </Col>
  </Row>
  <Row>
    <Col md={8}>
      <div className="bg-white rounded-xl shadow-2xl p-8 mb-6 border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-poppins">
          Available GPUs
          <span className="text-sm text-gray-500 font-normal ml-2">
            (Select & bid on the latest models)
          </span>
        </h2>
        <GPUGrid gpuClusters={gpuClusters} onBidSubmit={handleBidSubmit} />
      </div>
    </Col>
    <Col md={4}>
      <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-poppins">
          Place a Bid
          <span className="text-sm text-gray-500 font-normal ml-2">
            (Enter your best offer)
          </span>
        </h2>
        <AuctionForm onSubmit={handleBidSubmit} gpuClusterId={''} />
      </div>
    </Col>
  </Row>
  <Row className="mt-8">
    <Col>
      <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-poppins">
          Active Reservations
          <span className="text-sm text-gray-500 font-normal ml-2">
            (View your GPU usage)
          </span>
        </h2>
        <ActiveReservations reservations={activeReservations} />
      </div>
    </Col>
  </Row>
</Container>

  );
}