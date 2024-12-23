export type LocationData = {
  [key: string]: string[];
};

export interface LocationDropdownState {
  isOpen: boolean;
  searchTerm: string;
  selectedCity: string;
  selectedLocation: string;
}
