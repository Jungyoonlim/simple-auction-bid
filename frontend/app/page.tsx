'use client';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import GPUGrid from './components/GPUGrid';
import AuctionDetail from './components/AuctionDetail';
import { GpuCluster } from './types';
import { sampleGpuClusters } from '../../src/sampleData';

export default function Home() {
  const [gpuClusters] = useState<GpuCluster[]>(sampleGpuClusters);
  const [selectedCluster, setSelectedCluster] = useState<GpuCluster | null>(null);

  const handleClusterClick = (cluster: GpuCluster) => {
    setSelectedCluster(cluster);
  };

  return (
    <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Row>
        <Col md={4}>
          <GPUGrid gpuClusters={gpuClusters} onClusterClick={handleClusterClick} />
        </Col>
        <Col md={8}>
          {selectedCluster && <AuctionDetail gpuCluster={selectedCluster} />}
        </Col>
      </Row>
    </Container>
  );
}