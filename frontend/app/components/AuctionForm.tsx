import React, { useState } from 'react'; 
import { GpuCluster } from  '../types';

interface Props {
    onSubmit: (gpuCluster: GpuCluster) => void;
  }
  
  const AuctionForm: React.FC<Props> = ({ onSubmit }) => {
    const [gpuType, setGpuType] = useState('');
    const [gpuCount, setGpuCount] = useState(1);
    const [duration, setDuration] = useState(1);
    const [bidPrice, setBidPrice] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const gpuCluster: GpuCluster = {
        id: '',
        name: 'New GPU Cluster',
        gpuType,
        gpuCount,
        duration,
        bidPrice,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'pending',
      };
      onSubmit(gpuCluster);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
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