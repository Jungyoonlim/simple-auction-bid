// Defines the GPU cluster model

export interface GpuCluster {
    id: string;
    name: string;
    gpuType: string;
    gpuCount: number;
    startTime: Date;
    endTime: Date;
    duration: number;
    bidPrice: number;
    status: string;
}

