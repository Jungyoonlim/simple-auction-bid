export interface GpuCluster {
    id: string;
    name: string;
    gpuType: string;
    gpuCount: number;
    currentBid: number;
    startTime: Date;
    endTime: Date;
    duration: number;
    bidPrice: number;
    status: string;
  }
  
  export interface Reservation {
    id: string;
    gpuType: string;
    gpuCount: number;
    duration: number;
    bidPrice: number;
    startTime: Date;
    endTime: Date;
    status: string;
  }