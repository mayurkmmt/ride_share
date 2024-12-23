import React from "react";
import travelGif from "../assets/img/travel-to.gif";
import { useNavigate } from "react-router";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-full text-black">
      <div className="h-full">
        <img className="h-full rounded-xl object-cover" src={travelGif} />
      </div>
      <div className="w-full absolute top-44 left-2/4 transform -translate-x-2/4 -translate-y-2/4 text-center p-8 space-y-4">
        <h1 className="text-3xl font-bold">Need a Ride?</h1>
        <h4 className="text-2xl font-semibold">Let's get you ready to ride</h4>
        <p className="text-gray-800">
          Find a ride with your friends, family, or neighbors. Choose from a
          wide range of ride options, including bikes, scooters, and cars.
        </p>
        <button
          className="bg-theme/60 hover:bg-theme/90 text-white p-2 px-20 !mt-8 rounded-md text-2xl font-semibold"
          onClick={() => navigate("login")}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;
