import { lazy, Suspense } from "react";
import { SectionHeading } from "../components/SectionHeading";

const BookingSection = lazy(() =>
  import("../components/BookingSection").then((module) => ({
    default: module.BookingSection,
  }))
);

export const BookingPage = () => {
  return (
    <main className="section-block pt-10 sm:pt-12">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Booking"
          title="Book a session."
          copy="Share the service, date, and details. We will review your request personally."
        />
      </div>
      <Suspense fallback={null}>
        <BookingSection
          compact
          eyebrow="Consultation"
          title="A clear, direct booking flow."
          copy="Move through the steps and send the details when you are ready."
        />
      </Suspense>
    </main>
  );
};
