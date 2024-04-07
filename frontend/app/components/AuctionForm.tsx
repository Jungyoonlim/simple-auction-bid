import React, { useState } from 'react'; 
import { GpuCluster } from  '../types';

interface Props {
    gpuClusterId: string; 
    onSubmit: (gpuCluster: string, bidAmount: number) => void;
  }
  
  const AuctionForm: React.FC<Props> = ({ gpuClusterId, onSubmit }) => {
    const [bidAmount, setBidAmount] = useState(0);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(gpuClusterId, bidAmount);
      setBidAmount(0); 
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          placeholder="Enter bid amount"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Place Bid
        </button>
      </form>
    );
  };
  
  export default AuctionForm;