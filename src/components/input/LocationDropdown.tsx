import React from "react";
import OpenStreetLocDropdown from "./OpenStreetLocDropdown";

interface LocationDropdownPropsT {
  label?: string | React.ReactElement;
  id: string;
}

const LocationDropdown: React.FC<LocationDropdownPropsT> = ({
  label = "",
  id,
}) => {
  return (
    <div className="relative w-full max-w-md">
      {label && (
        <label className="flex items-center text-lg mb-2">{label}</label>
      )}
      <OpenStreetLocDropdown inputUniqueKey={id} />
    </div>
  );
};

export default LocationDropdown;
