import React, { useState, useEffect } from 'react';
import { GpuCluster } from '../types';
import AuctionForm from './AuctionForm'; 

interface Props {
  gpuClusters: GpuCluster[];
  onBidSubmit: (gpuClusterId: string, bidAmount: number) => void; 
}
 
const GPUGrid: React.FC<Props> = ({ gpuClusters, onBidSubmit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {gpuClusters.map((gpu) => (
        <div key={gpu.id} className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold">{gpu.name}</h3>
          <p>GPU Type: {gpu.gpuType}</p>
          <p>GPU Count: {gpu.gpuCount}</p>
          <p>Current Highest Bid: ${gpu.currentBid}</p>
          <p>Status: {gpu.status}</p>
          <AuctionForm gpuClusterId={gpu.id} onSubmit={onBidSubmit} />
        </div>
      ))}
    </div>
  );
};

export default GPUGrid;