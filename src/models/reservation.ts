export interface reservation{
    id: string;
    name: string;
    gpuType: string;
    gpuCount: number;
    duration: number; 
    bidPrice: number;
    startTime: Date;
    endTime: Date;
    status: 'pending' | 'approved' | 'rejected';
}

