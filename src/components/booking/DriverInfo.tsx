import { IndianRupee, UserRound } from "lucide-react";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import React, { memo } from "react";
import { VehicleType } from "../../helper/constants/booking";
import { DriverDetailsT } from "../../types/driver";

type DriverInfoPropsT = {
  selectedDriver: DriverDetailsT | null;
  formData: any;
  rideFare: number;
  selectedVehicleType: number;
  setRideStatus: (status: string) => void;
};

const DriverInfo: React.FC<DriverInfoPropsT> = memo(
  ({
    selectedDriver,
    formData,
    rideFare,
    selectedVehicleType,
    setRideStatus,
  }) => {
    // add action to an individual snackbar
    const action = (snackbarId: SnackbarKey) => (
      <>
        <button
          className="mr-2 text-black"
          onClick={() => {
            closeSnackbar(snackbarId);
          }}
        >
          Back
        </button>
        <button
          className="bg-black/80 p-2 rounded-2xl text-xs text-red-500 font-medium"
          onClick={() => {
            setRideStatus("initial");
            closeSnackbar(snackbarId);
          }}
        >
          Cancel Ride
        </button>
      </>
    );

    return (
      <>
        {selectedDriver && (
          <>
            <div className="relative h-80 bg-black rounded-lg p-4">
              {/* time */}
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <p className="-mb-1.5 text-base text-theme font-semibold">
                    Captain on the way
                  </p>
                  <small className="text-xs text-gray-400 font-medium">
                    {selectedDriver.distance} km away
                  </small>
                </div>
                <div className="flex items-end justify-end">
                  <small className="h-6 w-14 bg-theme rounded-full flex justify-center items-center px-2 text-xs font-semibold">
                    {selectedDriver.estimatedArrival}
                  </small>
                </div>
              </div>
              <div className="border-b border-gray-800 my-2" />
              {/* otp */}
              <div className="flex justify-between mb-3">
                <small className="text-xs text-gray-400 font-meduim">
                  Start ride with PIN
                </small>
                <div className="flex gap-1">
                  {[7, 6, 6, 8].map((item) => (
                    <small className="h-4 w-4 rounded-sm bg-white/15 flex justify-center items-center">
                      {item}
                    </small>
                  ))}
                </div>
              </div>
              {/* driver */}
              <div className={`bg-white/15 p-2 rounded-md mb-3`}>
                <div className="flex justify-between items-center p-2">
                  <div className="flex items-center">
                    <div>
                      <p className="font-semibold">
                        {selectedDriver.rto_number}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {selectedDriver.vehicle}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {selectedDriver.name}
                      </p>
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-white/10 flex flex-col justify-center items-center">
                    <UserRound size={24} className="text-theme mt-2.5" />
                    <p className="text-xs mt-1.5 ml-1">
                      {selectedDriver.rating} ⭐{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* pickup/fare */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-gray-500 font-medium">
                    Pickup from
                  </p>
                  <p className="text-xs font-semibold">
                    {formData.pickup_location}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-500 font-medium">
                    Total Fare
                  </p>
                  <p className="flex items-center">
                    <IndianRupee size={12} />
                    <small className="-mt-0.5">{rideFare}</small>
                  </p>
                </div>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-white/10 hover:bg-black rounded-md text-red-600 text-lg p-2"
              onClick={() =>
                enqueueSnackbar("Are you sure to cancel?", {
                  action,
                  variant: "warning",
                  persist: true,
                })
              }
            >
              Cancel {VehicleType[selectedVehicleType]}
            </button>
          </>
        )}
      </>
    );
  }
);

export default DriverInfo;
