import React, { useState, useEffect } from 'react';
import { GpuCluster } from '../types';

interface Props {
  gpuClusters: GpuCluster[];
}
 
const GPUGrid: React.FC = () => {
  const [gpuClusters, setGpuClusters] = useState<GpuCluster[]>([]);
  
  useEffect(() => {
    fetchGpuClusters();
  }, []);

  const fetchGpuClusters = async () => {
    const response = await fetch('/api/gpuClusters');
    const data = await response.json();
    setGpuClusters(data);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {gpuClusters.map((gpu) => (
        <div key={gpu.id} className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold">{gpu.name}</h3>
          <p>GPU Type: {gpu.gpuType}</p>
          <p>GPU Count: {gpu.gpuCount}</p>
          <p>Status: {gpu.status}</p>
        </div>
      ))}
    </div>
  );
};

export default GPUGrid;