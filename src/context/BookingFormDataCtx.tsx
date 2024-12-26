import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the form data
interface BookingFormData {
  pickup_location: string;
  dropoff_location: string;
  paymentSuccess: null | string;
  paymentError: null | string;
}

// Define the context type
type BookingFormDataCtxT = {
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
};

// Create the context with an undefined initial state
const BookingFormDataCtx = createContext<BookingFormDataCtxT | undefined>(
  undefined
);

// Provider component
type BookingFormDataCtxProviderPropsT = {
  children: ReactNode;
};

export const BookingFormDataCtxProvider: React.FC<
  BookingFormDataCtxProviderPropsT
> = ({ children }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    pickup_location: "",
    dropoff_location: "",
    paymentSuccess: null,
    paymentError: null,
  });

  return (
    <BookingFormDataCtx.Provider value={{ formData, setFormData }}>
      {children}
    </BookingFormDataCtx.Provider>
  );
};

// Custom hook to use form data context
export const useBookingFormData = (): BookingFormDataCtxT => {
  const context = useContext(BookingFormDataCtx);
  if (!context) {
    throw new Error(
      "useBookingFormData must be used within a BookingFormDataCtxProvider"
    );
  }
  return context;
};
