import React, { useState } from 'react'; 
import { GpuCluster } from  '../types/index';

// Interface for the props that the AuctionForm component will receive
interface Props {
    gpuClusterId: string; 
    onSubmit: (gpuCluster: string, bidAmount: number) => void;
  }
  
  // React functional component that will render the form for placing a bid
  const AuctionForm: React.FC<Props> = ({ gpuClusterId, onSubmit }) => {
    const [bidAmount, setBidAmount] = useState(0);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(gpuClusterId, bidAmount);
      setBidAmount(0); 
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Place Your Bid</h2>
        <div className="mb-4">
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 transition duration-300 ease-in-out text-gray-700 placeholder-gray-400"
            placeholder="Enter bid amount"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Place Bid
          </button>
        </div>
      </form>
    );
  };
  
  export default AuctionForm;