export const validateBookingForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!values.service.trim()) {
    errors.service = "Select a service type.";
  }

  if (!values.duration.trim()) {
    errors.duration = "Choose how long the session should run.";
  }

  if (!values.date.trim()) {
    errors.date = "Preferred date is required.";
  }

  if (!values.location.trim()) {
    errors.location = "Location is required.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell Warrior Lens a little about the session.";
  }

  return errors;
};

export const validateContactForm = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "A message is required.";
  }

  return errors;
};
