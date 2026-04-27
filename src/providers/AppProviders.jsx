import { BookingFlowProvider } from "./BookingFlowProvider";
import { StudioAppProvider } from "./StudioAppProvider";
import { WarriorAiProvider } from "./WarriorAiProvider";

export const AppProviders = ({ children }) => (
  <StudioAppProvider>
    <BookingFlowProvider>
      <WarriorAiProvider>{children}</WarriorAiProvider>
    </BookingFlowProvider>
  </StudioAppProvider>
);
