import React, { useState } from 'react';
import { GpuCluster } from '../types';
import placeBid from '../../../src/services/auctionService';

interface Props {
  gpuCluster: GpuCluster;
  onBidPlaced: () => void;
}

const BidForm: React.FC<Props> = ({ gpuCluster, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await placeBid(gpuCluster.id, bidAmount);
    onBidPlaced();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-2">Place Bid for {gpuCluster.name}</h3>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 mb-2"
        min={gpuCluster.currentBid + 1}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Place Bid
      </button>
    </form>
  );
};

export default BidForm;