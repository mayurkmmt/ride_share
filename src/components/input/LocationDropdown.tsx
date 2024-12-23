import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import {
  LocationData,
  LocationDropdownState,
} from "../../types/locationDropdown";

// Sample data for cities and their local areas
const locationData: LocationData = {
  Ahmedabad: ["Navrangpura", "Satellite", "Maninagar", "Bopal", "Sola"],
  Surat: ["Vesu", "Piplod", "Athwa", "Katargam", "Udhna"],
  Vadodara: ["Alkapuri", "Gorwa", "Manjalpur", "Waghodia", "Sayajigunj"],
  Rajkot: ["Kalawad Road", "Bhavnagar Road", "Mavdi", "Raiya", "Gondal Road"],
};

interface LocationDropdownPropsT {
  label?: string | React.ReactElement;
  onLocSelect: (location: LocationDropdownState) => void;
}

const LocationDropdown: React.FC<LocationDropdownPropsT> = ({
  label,
  onLocSelect,
}) => {
  const [state, setState] = useState<LocationDropdownState>({
    isOpen: false,
    searchTerm: "",
    selectedCity: "Select a city",
    selectedLocation: "Select a location",
  });

  const { isOpen, searchTerm, selectedCity, selectedLocation } = state;

  const cities = Object.keys(locationData);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let filteredLocations: string[] = [];
  if (selectedCity && locationData[selectedCity]) {
    filteredLocations = locationData[selectedCity].filter((location) =>
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleToggle = () => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  };

  const handleCitySelect = (city: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedCity: city,
      selectedLocation: "Select a location",
    }));
  };

  const handleLocationSelect = (location: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedLocation: location,
      isOpen: false,
    }));
    onLocSelect({
      ...state,
      selectedLocation: location,
      isOpen: false,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: e.target.value,
    }));
  };

  return (
    <div className="relative w-full max-w-md">
      {label && (
        <label className="flex items-center text-lg mb-2">{label}</label>
      )}
      <button
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-theme"
        onClick={handleToggle}
      >
        <span className="text-gray-700">
          {selectedCity}, {selectedLocation}
        </span>
        <ChevronDown
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 pr-1 text-gray-400" />
              <input
                type="text"
                placeholder="Search cities or locations..."
                className="w-full px-8 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-theme"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto text-black">
            {filteredCities.length > 0 && (
              <div>
                <h3 className="px-4 py-3 font-medium bg-gray-100 rounded-t-lg">
                  Cities
                </h3>
                <ul>
                  {filteredCities.map((city, index) => (
                    <li
                      key={index}
                      className={`px-4 py-3 hover:bg-gray-200 cursor-pointer ${
                        city === selectedCity ? "bg-gray-300" : ""
                      }`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {filteredLocations.length > 0 && (
              <div>
                <h3 className="px-4 py-3 font-medium bg-gray-100">Locations</h3>
                <ul>
                  {filteredLocations.map((location, index) => (
                    <li
                      key={index}
                      className={`px-4 py-3 hover:bg-gray-200 cursor-pointer ${
                        location === selectedLocation ? "bg-gray-300" : ""
                      }`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {filteredCities.length === 0 && filteredLocations.length === 0 && (
              <div className="px-4 py-3 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
