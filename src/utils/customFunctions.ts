import { VEHICLE_RATES } from "../helper/constants/booking";

export const getCurrentTime = (additional_hrs = 0) => {
  // Get the current date and time
  const now = new Date();

  // Extract the hours and minutes
  let hours = now.getHours() + additional_hrs;
  const minutes = now.getMinutes();

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12; // Convert 0-23 hours to 0-11
  hours = hours ? hours : 12; // Adjust "0" to "12" for midnight and noo

  // Determine AM or PM
  let isPM = hours >= 12 ? "am" : "pm";

  // Format minutes to always display two digits (e.g., "09" instead of "9")
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes}`;
};

export const getRandomFareAmount = (
  vehicleType: keyof typeof VEHICLE_RATES,
  distance: number
) => {
  // Ensure the vehicleType is valid
  if (!VEHICLE_RATES[vehicleType]) {
    return "N/A";
  }

  // Get the vehicle's base fare and rate per km
  const { baseFare, ratePerKm } = VEHICLE_RATES[vehicleType];

  // Calculate the fare
  const fare = baseFare + ratePerKm * distance;
  return Math.round(fare * 100) / 100;
};
