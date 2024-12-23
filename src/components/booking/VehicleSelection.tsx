import { Dot, IndianRupee, Tag } from "lucide-react";
import { memo } from "react";
import {
  MOCK_DISTANCE,
  RATE_DISCOUNT,
  VEHICLE_RATES,
} from "../../helper/constants/booking";
import {
  getCurrentTime,
  getRandomFareAmount,
} from "../../utils/customFunctions";

import BikeImg from "../../assets/img/bike.png";
import AutoImg from "../../assets/img/auto-cropped.png";
import CabImg from "../../assets/img/cab.png";

type VehicleSelectionPropsT = {
  selectedVehicleType: number;
  setSelectedVehicleType: (index: number) => void;
  setRideFare: (amount: number) => void;
};

const vehicleBookingDetails = [
  { VehicleType: "Bike", asset: BikeImg, minDuration: 6 },
  { VehicleType: "Auto", asset: AutoImg, minDuration: 8 },
  { VehicleType: "Cab", asset: CabImg, minDuration: 5 },
];

const VehicleSelection: React.FC<VehicleSelectionPropsT> = memo(
  ({ selectedVehicleType, setSelectedVehicleType, setRideFare }) => (
    <div className="h-80 bg-black rounded-lg">
      <div className="sticky flex justify-center items-center border-b border-gray-800 p-3">
        <Tag
          size={14}
          color="green"
          fill="green"
          className="rotate-90 mt-1.5 mr-0.5"
        />
        <p>{RATE_DISCOUNT}% promotion applied</p>
      </div>
      <div className="overflow-y-auto h-[calc(100%-49px)] p-4">
        {vehicleBookingDetails.map((item, index) => {
          const fareAmount = getRandomFareAmount(
            item.VehicleType.toLowerCase() as keyof typeof VEHICLE_RATES,
            MOCK_DISTANCE
          );
          let discountFareAmount: number | undefined;
          if (typeof fareAmount === "number") {
            const discount = fareAmount * (RATE_DISCOUNT / 100);
            discountFareAmount =
              Math.round((fareAmount - discount) * 100) / 100;
          }
          const activeItem: boolean = index + 1 === selectedVehicleType;
          return (
            <div
              key={index}
              className={`relative flex items-center gap-2 rounded-md p-2 py-4 cursor-pointer transition-all duration-400 ${
                activeItem
                  ? "flex-col ring-2 ring-theme ring-inset scale-105 shadow-xl duration-500 gap-0 p-4"
                  : "hover:bg-white/10"
              }`}
              onClick={() => {
                setSelectedVehicleType(index + 1);
                setRideFare(Number(discountFareAmount ?? fareAmount));
              }}
            >
              <img
                className={`${
                  activeItem ? "w-24 rounded-full -mb-4" : "w-14"
                } transition-all ease-out duration-500`}
                src={item.asset}
                alt={item.VehicleType}
              />
              <div className="w-full flex justify-between transition-all duration-700 delay-300">
                <div className="flex flex-col items-start justify-center mr-auto">
                  <p>{item.VehicleType}</p>
                  <p className="flex items-center -space-x-1">
                    <small>{getCurrentTime(item.minDuration)}</small>
                    <Dot />
                    <small>{Math.floor(Math.random() * 12) + 1} min away</small>
                  </p>
                </div>
                <div className="flex flex-col items-end ml-auto">
                  <div className="flex">
                    <Tag
                      size={12}
                      color="green"
                      fill="green"
                      className="rotate-90"
                    />
                    <IndianRupee size={12} />
                    <p className="-mt-1.5">
                      {discountFareAmount ?? fareAmount}
                    </p>
                  </div>
                  {discountFareAmount && (
                    <div className="flex items-center">
                      <IndianRupee size={12} />
                      <small className="line-through">{fareAmount}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
);

export default VehicleSelection;
