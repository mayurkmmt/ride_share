import { useState } from "react";
import TextLogo from "../components/common/TextLogo";
import UserMenu from "../components/UserMenu";

import MapImg from "../assets/img/map.png";
import Booking from "./Booking";
import { BookingFormDataCtxProvider } from "../context/BookingFormDataCtx";

const DashBoard = () => {
  const [rideStatus, setRideStatus] = useState("initial"); // initial, vehicle, searching, confirmed

  return (
    <div className="h-full overflow-y-auto space-y-6 p-6">
      {/* Header */}
      {/* <Header /> */}
      <UserMenu />

      {/* Map & Logo */}
      {rideStatus === "confirmed" ? (
        <div className="h-60 scale-150">
          <img
            className="h-full w-full rounded-t-[80px] object-cover"
            src={MapImg}
            alt="map"
          />
        </div>
      ) : (
        <div className="!-m-px">
          <TextLogo />
        </div>
      )}

      <BookingFormDataCtxProvider>
        <Booking rideStatus={rideStatus} setRideStatus={setRideStatus} />
      </BookingFormDataCtxProvider>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default DashBoard;
