import React, { useCallback } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useBookingFormData } from "../../context/BookingFormDataCtx";
import {
  MAX_RESULTS,
  MIN_INPUT_LENGTH,
  OPEN_STREET_BASE_URL,
} from "../../Config";
import { useDebounce } from "../../hooks/useDebounce";

interface Location {
  display_name: string;
}

type OpenStreetLocDropdownPropsT = {
  inputUniqueKey: string;
};

const OpenStreetLocDropdown: React.FC<OpenStreetLocDropdownPropsT> = ({
  inputUniqueKey,
}) => {
  const { formData, setFormData } = useBookingFormData();

  const [suggestions, setSuggestions] = React.useState<Location[]>([]); // State to manage suggestions
  const [error, setError] = React.useState<string | null>(null); // State to manage errors (if any)
  const [open, setOpen] = React.useState<boolean>(false); // State to manage errors (if any)

  // Use the custom hook with specific element type
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false);
  });

  const getSuggestions = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      setOpen(true);
      console.log({ inputVal, OPEN_STREET_BASE_URL });

      if (inputVal.length >= MIN_INPUT_LENGTH) {
        const url = `${OPEN_STREET_BASE_URL}search?format=json&q=${inputVal}&addressdetails=1&limit=${MAX_RESULTS}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setSuggestions(data);
            } else {
              setSuggestions([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
            setError("Failed to fetch suggestions");
          });
      } else {
        setSuggestions([]);
      }
    },
    []
  );

  // Debounced version of getSuggestions
  const debouncedGetSuggestions = useDebounce(getSuggestions, 500);

  // Handle suggestion click
  const selectLocation = (location: Location) => {
    const locEle: HTMLInputElement | null = document.getElementById(
      inputUniqueKey
    ) as HTMLInputElement;
    if (locEle) {
      console.log({ location, inputUniqueKey });
      locEle.value = location.display_name;
    }
    setFormData(() => ({
      ...formData,
      [inputUniqueKey]: location.display_name,
    }));
    setSuggestions([]); // Clear the suggestions after selection
    setOpen(false);
  };

  return (
    <div className="relative">
      <input
        className="input-field"
        type="text"
        id={inputUniqueKey}
        name={inputUniqueKey}
        placeholder="Enter location name"
        onInput={debouncedGetSuggestions}
      />
      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          {error && <div>{error}</div>} {/* Display error message if any */}
          <div className="max-h-60 overflow-y-auto text-black">
            {suggestions.length > 0 ? (
              suggestions.map((location, index) => (
                <div
                  key={index}
                  className="p-2 border-b last:border-0 hover:rounded-lg hover:bg-gray-200 cursor-pointer text-sm"
                  onClick={() => selectLocation(location)}
                >
                  {location.display_name}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenStreetLocDropdown;
