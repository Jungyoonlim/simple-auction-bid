import React from 'react';
import { GpuCluster, GpuHour } from '../types';
import AuctionForm from './AuctionForm';

interface Props {
  gpuClusters: GpuCluster[];
  gpuHours: GpuHour[];
  onBidSubmit: (gpuClusterId: string, hourIndex: number, bidAmount: number) => void;
}

const GPUGrid: React.FC<Props> = ({ gpuClusters, gpuHours, onBidSubmit }) => {
  return (
    <div className="space-y-6">
      {gpuClusters.map((cluster) => (
        <div key={cluster.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800">{cluster.name}</h3>
            <p className="text-sm text-gray-600">GPU Type: {cluster.gpuType}</p>
            <p className="text-sm text-gray-600">GPU Count: {cluster.gpuCount}</p>
            <p className="text-sm text-gray-600">Current Bid: {cluster.currentBid}</p>
            <p className={`text-sm ${cluster.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>Status: {cluster.status}</p>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gpuHours
                .filter((hour) => hour.gpuClusterId === cluster.id)
                .map((hour, index) => (
                  <div key={`${cluster.id}-${hour.hour}`} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-700 font-medium">{hour.hour}</span>
                      <span className="text-sm text-gray-500">{hour.bid ?? '-'}</span>
                    </div>
                    <AuctionForm
                      gpuClusterId={cluster.id}
                      hourIndex={index}
                      onSubmit={onBidSubmit}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GPUGrid;