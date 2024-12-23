import { DriverDetailsT } from "../../types/driver";

export enum VehicleType {
  Bike = 1,
  Auto = 2,
  Cab = 3,
}

// Vehicle fare rates based on vehicle type and distance range
export const VEHICLE_RATES = {
  bike: {
    baseFare: 12.54, // Base fare in currency
    ratePerKm: 4, // Price per kilometer
  },
  auto: {
    baseFare: 21.27,
    ratePerKm: 12,
  },
  cab: {
    baseFare: 30.65,
    ratePerKm: 15,
  },
};

export const MOCK_DISTANCE = 284; // in km
export const RATE_DISCOUNT = 18; // in %

// Mock data (would be replaced by actual backend data)
export const MOCK_DRIVERS: DriverDetailsT[] = [
  {
    id: 1,
    name: "Rakesh Yadav",
    type: "Auto",
    vehicle: "Auto",
    rto_number: "GJ27FA27777",
    rating: 4.8,
    distance: 2.3,
    estimatedArrival: "3 min",
  },
  {
    id: 2,
    name: "Rahil Khan",
    type: "Bike",
    vehicle: "Splendor",
    rto_number: "GJ01AR27575",
    rating: 4.8,
    distance: 2.3,
    estimatedArrival: "5 min",
  },
  {
    id: 3,
    name: "Gaurav Shimpi",
    type: "Cab",
    vehicle: "Honda Civic",
    rto_number: "GJ03CR5767",
    rating: 4.7,
    distance: 3.1,
    estimatedArrival: "9 min",
  },
];
