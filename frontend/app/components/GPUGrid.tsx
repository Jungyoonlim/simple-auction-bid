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
    <div>
      {gpuClusters.map((cluster) => (
        <div key={cluster.id}>
          <h3>{cluster.name}</h3>
          <p>GPU Type: {cluster.gpuType}</p>
          <p>GPU Count: {cluster.gpuCount}</p>
          <p>Current Bid: {cluster.currentBid}</p>
          <p>Status: {cluster.status}</p>
          <table>
            <thead>
              <tr>
                <th>Hour</th>
                <th>Bid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gpuHours
                .filter((hour) => hour.gpuClusterId === cluster.id)
                .map((hour, index) => (
                  <tr key={`${cluster.id}-${hour.hour}`}>
                    <td>{hour.hour}</td>
                    <td>{hour.bid ?? '-'}</td>
                    <td>
                      <AuctionForm
                        gpuClusterId={cluster.id}
                        hourIndex={index}
                        onSubmit={onBidSubmit}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GPUGrid;