import React from "react";

const Header: React.FC = () => {
  // const [rideType, setRideType] = React.useState("single");

  return (
    <header className="bg-white text-black h-16 shadow-md">
      <div className="h-full container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ride Share</h1>
        <div className="h-full ml-auto flex">
          <button className="py-2 px-4 bg-white rounded-md text-gray-800 hover:text-gray-900">
            Log In
          </button>
          <div className="border-r border-grey-800" />
          <button className="py-2 px-4 bg-white rounded-md text-gray-800 hover:text-gray-900">
            Sign Up
          </button>
        </div>
        {/* <div className="flex space-x-2">
          <button
            onClick={() => setRideType("single")}
            className={`px-3 py-2 rounded transition ${
              rideType === "single"
                ? "bg-blue-800 text-white"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Single Ride
          </button>
          <button
            onClick={() => setRideType("share")}
            className={`px-3 py-2 rounded transition ${
              rideType === "share"
                ? "bg-blue-800 text-white"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Ride Share
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
