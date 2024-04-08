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
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4" style={{ fontSize: '2.5rem' }}>
            GPU Auction
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h2>Available GPUs</h2>
          <GPUGrid gpuClusters={gpuClusters} onBidSubmit={handleBidSubmit} />
        </Col>
        <Col md={4}>
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2>Place a Bid</h2>
            <AuctionForm onSubmit={handleBidSubmit} gpuClusterId={''} />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Active Reservations</h2>
          <ActiveReservations reservations={activeReservations} />
        </Col>
      </Row>
    </Container>
  );
}