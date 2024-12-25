import React from "react";
import LocationDropdown from "../components/input/LocationDropdown";
import { Clock, MapPin, Navigation } from "lucide-react";
import VehicleSelection from "../components/booking/VehicleSelection";
import { MOCK_DRIVERS, VehicleType } from "../helper/constants/booking";
import DriverInfo from "../components/booking/DriverInfo";
import { DriverDetailsT } from "../types/driver";
import { useBookingFormData } from "../context/BookingFormDataCtx";

type BookingPropsT = {
  rideStatus: string;
  setRideStatus: (status: string) => void;
};

const Booking: React.FC<BookingPropsT> = ({ rideStatus, setRideStatus }) => {
  const { formData } = useBookingFormData();

  const [selectedVehicleType, setSelectedVehicleType] = React.useState(
    VehicleType.Auto
  );
  const [rideFare, setRideFare] = React.useState(0);
  const [selectedDriver, setSelectedDriver] =
    React.useState<DriverDetailsT | null>(null);

  const renderVehicleSelection = () => {
    if (formData.pickup_location && formData.dropoff_location) {
      setRideStatus("vehicle");
    }
  };

  // Ride request handler
  const handleRideRequest = () => {
    if (formData.pickup_location && formData.dropoff_location) {
      setRideStatus("searching");
      // Simulated driver matching
      setTimeout(() => {
        setSelectedDriver(
          MOCK_DRIVERS.find(
            (item) =>
              item.type.toLowerCase() ===
              VehicleType[selectedVehicleType].toLowerCase()
          ) ?? MOCK_DRIVERS[0]
        );
        setRideStatus("confirmed");
      }, 2000);
    } else {
      alert("Please enter pickup and dropoff locations");
    }
  };

  return (
    <div>
      {/* Pickup/Dropoff Location */}
      {rideStatus !== "confirmed" && (
        <>
          <div className="mb-4">
            <LocationDropdown
              label={
                <>
                  {" "}
                  <MapPin size={16} className="mr-2 text-theme" />
                  Pickup Location
                </>
              }
              id="pickup_location"
            />
          </div>
          <div className="mb-4">
            <LocationDropdown
              label={
                <>
                  {" "}
                  <Navigation size={16} className="mr-2 text-theme" />
                  Dropoff Location
                </>
              }
              id="dropoff_location"
            />
          </div>
        </>
      )}
      {rideStatus === "initial" && (
        <button
          disabled={!formData.pickup_location || !formData.dropoff_location}
          onClick={renderVehicleSelection}
          className="w-full disabled:bg-gray-400 bg-theme/70 text-white py-3 rounded-md hover:bg-theme/90 transition"
        >
          Find a Ride
        </button>
      )}
      {rideStatus === "vehicle" && (
        <>
          <VehicleSelection
            selectedVehicleType={selectedVehicleType}
            setSelectedVehicleType={setSelectedVehicleType}
            setRideFare={setRideFare}
          />
          <button
            className="mt-6 w-full bg-gray-400 hover:bg-gray-500 rounded-md text-black font-medium text-lg p-2 transition-all duration-500"
            onClick={handleRideRequest}
          >
            Choose {VehicleType[selectedVehicleType]}
          </button>
        </>
      )}
      {rideStatus === "searching" && (
        <div className="text-center py-4">
          <p className="flex justify-center items-center">
            <Clock className="mr-2 animate-spin" />
            Searching for nearby drivers...
          </p>
        </div>
      )}
      {rideStatus === "confirmed" && (
        <DriverInfo
          selectedDriver={selectedDriver}
          rideFare={rideFare}
          selectedVehicleType={selectedVehicleType}
          setRideStatus={setRideStatus}
        />
      )}
    </div>
  );
};

export default Booking;
