import {
  CreditCard,
  IndianRupee,
  ReceiptIndianRupee,
  UserRound,
  Wallet,
} from "lucide-react";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import React, { memo } from "react";
import { VehicleType } from "../../helper/constants/booking";
import { DriverDetailsT } from "../../types/driver";
import { useBookingFormData } from "../../context/BookingFormDataCtx";
import PaymentComponent from "../PaymentComponent";

type DriverInfoPropsT = {
  selectedDriver: DriverDetailsT | null;
  rideFare: number;
  selectedVehicleType: number;
  setRideStatus: (status: string) => void;
};

const DriverInfo: React.FC<DriverInfoPropsT> = memo(
  ({ selectedDriver, rideFare, selectedVehicleType, setRideStatus }) => {
    const { formData, setFormData } = useBookingFormData();

    const [isOpen, setIsOpen] = React.useState(false);
    const [payOpt, setPayOpt] = React.useState<Record<string, boolean> | null>(
      null
    );
    const [showStripePayment, setShowStripePayment] = React.useState(false);

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
      if (showStripePayment && formData.paymentSuccess) {
        setRideStatus("initial");
        setFormData({
          pickup_location: "",
          dropoff_location: "",
          paymentSuccess: null,
          paymentError: null,
        });
      }
      setTimeout(() => {
        setShowStripePayment(false);
      }, 100);
    };

    const handleCanceRide = (snackbarId: SnackbarKey) => {
      setShowStripePayment(false);
      setRideStatus("initial");
      setFormData({
        pickup_location: "",
        dropoff_location: "",
        paymentSuccess: null,
        paymentError: null,
      });
      closeSnackbar(snackbarId);
    };

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
          onClick={() => handleCanceRide(snackbarId)}
        >
          Cancel Ride
        </button>
      </>
    );

    const handlePayModeChange = () => {
      if (payOpt?.["stripe_pay"]) {
        setShowStripePayment(true);
      } else {
        toggleDrawer();
      }
    };

    return (
      <>
        {selectedDriver && (
          <>
            <div className="overflow-y-auto relative h-80 bg-black rounded-lg p-4">
              {/* time */}
              <div className="grid grid-cols-4">
                <div className="col-span-3">
                  <p className="-mb-1.5 text-base text-theme font-semibold">
                    Captain on the way
                  </p>
                  <small className="text-xs text-gray-400 font-medium">
                    {selectedDriver?.distance} km away
                  </small>
                </div>
                <div className="flex items-end justify-end">
                  <small className="h-6 w-14 bg-theme rounded-full flex justify-center items-center px-2 text-xs font-semibold">
                    {selectedDriver?.estimatedArrival}
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
                        {selectedDriver?.rto_number}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {selectedDriver?.vehicle}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {selectedDriver?.name}
                      </p>
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-white/10 flex flex-col justify-center items-center">
                    <UserRound size={24} className="text-theme mt-2.5" />
                    <p className="text-xs mt-1.5 ml-1">
                      {selectedDriver?.rating} ⭐{" "}
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
              <div className="grid grid-cols-2 gap-4 my-3">
                <div className="flex flex-col items-start">
                  <p className="flex justify-center items-center gap-3 text-sm text-gray-500 font-medium">
                    <ReceiptIndianRupee color="green" size={14} />
                    Paying via Cash
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    className="text-theme text-sm font-medium"
                    onClick={toggleDrawer}
                  >
                    Change
                  </button>
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

            <div
              className={`w-full h-3/4 flex flex-col absolute bottom-0 left-2/4 -translate-x-2/4 bg-black z-50 py-4 rounded-t-2xl transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              } `}
            >
              <div
                className="relative w-14 h-2 bg-white mx-auto rounded-2xl cursor-pointer hover:h-6 hover:bg-black/10 [&>p]:hover:opacity-100 [&>p]:hover:visible transition-all duration-500 ease-out"
                title="Close Drawer"
                onClick={toggleDrawer}
              >
                <p className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-semibold opacity-0 invisible">
                  Close
                </p>
              </div>
              <div className="overflow-y-auto flex flex-col flex-1 py-4">
                <div className="flex flex-col gap-2 px-4">
                  Amount to be paid
                  <p className="flex items-center">
                    <IndianRupee size={12} />
                    <small className="-mt-0.5">{rideFare}</small>
                  </p>
                </div>
                {!showStripePayment ? (
                  <div>
                    <p className="text-sm text-gray-500 font-medium mt-6 px-4">
                      Personal Wallet
                    </p>
                    <div className="flex flex-col bg-white/15 p-4 cursor-not-allowed">
                      <div
                        className="flex justify-between"
                        onClick={() => setPayOpt({ wallet_pay: true })}
                      >
                        <p className="flex items-center gap-2">
                          <div className="bg-yellow-500 p-1.5 rounded-full">
                            <Wallet size={14} color="black" />
                          </div>
                          Ride Share Wallet (N/A)
                        </p>
                        <input
                          disabled
                          type="radio"
                          name="wallet_pay"
                          id="wallet_pay"
                          checked={payOpt?.["wallet_pay"] || false}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mt-6 px-4">
                      Credit/Debit Cards
                    </p>
                    <div className="flex flex-col bg-white/15 p-4 cursor-pointer">
                      <div
                        className="flex justify-between"
                        onClick={() => setPayOpt({ stripe_pay: true })}
                      >
                        <p className="flex items-center gap-2">
                          <CreditCard size={16} />
                          Credit/Debit Card
                        </p>
                        <input
                          type="radio"
                          name="stripe_pay"
                          id="stripe_pay"
                          checked={payOpt?.["stripe_pay"] || false}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mt-6 px-4">
                      Other Payment Methods
                    </p>
                    <div className="flex flex-col bg-white/15 p-4 cursor-pointer">
                      <div
                        className="flex justify-between"
                        onClick={() => setPayOpt({ cash_pay: true })}
                      >
                        <p className="flex items-center gap-2">
                          <ReceiptIndianRupee size={16} color="green" />
                          Cash
                        </p>
                        <input
                          type="radio"
                          name="cash_pay"
                          id="cash_pay"
                          checked={payOpt?.["cash_pay"] || false}
                        />
                      </div>
                    </div>
                    <button
                      className="w-1/2 mt-4 flex justify-center mx-auto px-6 p-2 bg-green-800 rounded-xl"
                      onClick={handlePayModeChange}
                    >
                      {" "}
                      {payOpt?.["stripe_pay"] ? "Pay Now" : "Change"}
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex flex-col justify-center bg-white/15 mt-4 p-4 transition-all duration-300 ease-out">
                    <PaymentComponent />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  }
);

export default DriverInfo;
