## Simple GPU Auction Bid.

Welcome to our simple GPU Auction House! Our platform is designed to facilitate the reservation and bidding process for GPU clusters. 

## Project Explanation! 
### src/models 
#### src/models/auction.ts
The `auction.ts` model is responsible for defining the structure and behavior of auction entities within the application. It has properties: `id`, `reservationId`, `startTime`, `endTime`, `status`, and `currentBid`. 

#### src/models/reservation.ts
The `reservation.ts` model is responsible for defining the structure and behavior of reservation entities within the application. It has properties: `id`, `name`, `gpuType`, `gpuCount`, `duration`, `bidPrice`, `startTime`, `endTime`, `status`.

#### src/models/gpuCluster.ts

