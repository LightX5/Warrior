import { useContext } from "react";
import { BookingFlowContext } from "../providers/BookingFlowProvider";

export const useBookingFlow = () => {
  const context = useContext(BookingFlowContext);

  if (!context) {
    throw new Error("useBookingFlow must be used within BookingFlowProvider.");
  }

  return context;
};
