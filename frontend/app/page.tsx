'use client';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GPUGrid from './components/GPUGrid';
import AuctionForm from './components/AuctionForm';
import ActiveReservations from './components/ActiveReservations';
import { GpuCluster, Reservation } from './types'; 

const exampleGpuCluster: GpuCluster = {
  id: '1',
  name: 'Example GPU Cluster',
  gpuType: 'NVIDIA Tesla V100',
  gpuCount: 4,
  status: 'available',
};

export default function Home() {
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const handleAuctionSubmit = async (gpuCluster: GpuCluster) => {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gpuCluster),
    });

    if (response.ok) {
      const reservation = await response.json();
      setActiveReservations([...activeReservations, reservation]);
      alert('Auction submitted successfully!');
    } else {
      alert('Failed to submit auction. Please try again.');
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="mb-4" style={{ fontSize: '2.5rem' }}>GPU Auction</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <h2>Available GPUs</h2>
          <GPUGrid gpuClusters={[exampleGpuCluster]} />
        </Col>
        <Col md={4}>
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2>Place a Bid</h2>
            <AuctionForm onSubmit={handleAuctionSubmit} />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Active Reservations</h2>
          <ActiveReservations />
        </Col>
      </Row>
    </Container>
  );
}
