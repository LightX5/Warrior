import { createContext, useEffect, useMemo, useState } from "react";
import {
  bookingSteps,
  bookingStorageKey,
  initialBookingValues,
} from "../data/bookingFlow";
import { submitBookingRequest } from "../services/bookingService";
import { getLocalDateInputMin } from "../utils/date";
import { validateBookingForm } from "../utils/validation";

export const BookingFlowContext = createContext(null);

const stepFieldSet = new Set(bookingSteps.flatMap((step) => step.fields));

const formatDisplayDate = (value) => {
  if (!value) {
    return "Pending";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
};

const getStepErrors = (step, values) => {
  const fullErrors = validateBookingForm(values);

  return step.fields.reduce((collected, field) => {
    if (fullErrors[field]) {
      collected[field] = fullErrors[field];
    }

    return collected;
  }, {});
};

const buildSummary = (values) => [
  { label: "Service", value: values.service || "Pending", iconKey: "camera" },
  { label: "Duration", value: values.duration || "Pending", iconKey: "sparkles" },
  {
    label: "Preferred Date",
    value: formatDisplayDate(values.date),
    iconKey: "calendar",
  },
  { label: "Location", value: values.location || "Pending", iconKey: "mapPin" },
  { label: "Contact", value: values.name || values.email || "Pending", iconKey: "phone" },
];

export const BookingFlowProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialBookingValues);
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "We will review your request personally and reply with next steps as soon as possible."
  );
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

  const currentStep = bookingSteps[activeStep];
  const minBookingDate = useMemo(() => getLocalDateInputMin(), []);
  const summaryItems = useMemo(() => buildSummary(formData), [formData]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const storedDraft = window.localStorage.getItem(bookingStorageKey);
      if (!storedDraft) {
        return;
      }

      const parsedDraft = JSON.parse(storedDraft);
      if (parsedDraft?.formData) {
        setFormData((current) => ({ ...current, ...parsedDraft.formData }));
      }
      if (typeof parsedDraft?.activeStep === "number") {
        setActiveStep(Math.min(parsedDraft.activeStep, bookingSteps.length - 1));
      }
      setHasRestoredDraft(true);
    } catch {
      window.localStorage.removeItem(bookingStorageKey);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      bookingStorageKey,
      JSON.stringify({
        activeStep,
        formData,
      })
    );
  }, [activeStep, formData]);

  const updateField = (name, value) => {
    setFormData((current) => ({ ...current, [name]: value }));

    if (stepFieldSet.has(name)) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const goToStep = (stepIndex) => {
    if (stepIndex <= activeStep) {
      setActiveStep(stepIndex);
    }
  };

  const nextStep = () => {
    const nextErrors = getStepErrors(currentStep, formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      return;
    }

    setActiveStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  };

  const previousStep = () => {
    setSubmitError("");
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validateBookingForm(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidStepIndex = bookingSteps.findIndex((step) =>
        step.fields.some((field) => nextErrors[field])
      );
      if (firstInvalidStepIndex >= 0) {
        setActiveStep(firstInvalidStepIndex);
      }
      return;
    }

    try {
      setIsSubmitting(true);
      await submitBookingRequest(formData);
      setFormData(initialBookingValues);
      setErrors({});
      setActiveStep(0);
      setSuccessMessage(
        "We will review your request personally and reply with next steps as soon as possible."
      );
      setShowSuccess(true);
      setHasRestoredDraft(false);

      if (typeof window !== "undefined") {
        window.localStorage.removeItem(bookingStorageKey);
      }
    } catch (error) {
      setSubmitError(error.message || "Unable to submit your booking right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = useMemo(
    () => ({
      formData,
      errors,
      activeStep,
      currentStep,
      isSubmitting,
      showSuccess,
      successMessage,
      submitError,
      hasRestoredDraft,
      minBookingDate,
      summaryItems,
      bookingSteps,
      updateField,
      goToStep,
      nextStep,
      previousStep,
      submitBooking,
      closeSuccessModal,
    }),
    [
      activeStep,
      currentStep,
      errors,
      formData,
      hasRestoredDraft,
      isSubmitting,
      minBookingDate,
      showSuccess,
      submitError,
      successMessage,
      summaryItems,
    ]
  );

  return <BookingFlowContext.Provider value={value}>{children}</BookingFlowContext.Provider>;
};
