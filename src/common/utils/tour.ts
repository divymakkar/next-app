const calculateDiscountPercentage = (
  originalAmount: string | number,
  discountedAmount: string | number
) => {
  if (!discountedAmount || discountedAmount == 0) return 0;

  const discountPercentage =
    ((Number(originalAmount) - Number(discountedAmount)) * 100) /
    Number(originalAmount);
  return discountPercentage.toFixed(0);
};

const showTimeSlots = (variants: any) => {
  return variants?.some((variant: any) => {
    if (variant?.has_time_slots) return true;
    return false;
  });
};

const getCalendarType = (productType: string, variants: any) => {
  const showTime = showTimeSlots(variants);
  switch (productType) {
    case "staycation":
      return "daterange";
    case "activity":
      if (showTime) return "datetime";
      return "date";
    case "tour":
      return "daterange";

    default:
      return "date";
  }
};

const getVariantDuration = (variant: any) => {
  //TODO
  switch (variant?.duration_type) {
    case "days_hours_minutes":
      return `${
        variant?.duration_days > 0 ? `${variant?.duration_days}D` : ""
      } ${
        variant?.duration_hours > 0 ? `${variant?.duration_hours} Hours` : ""
      }`;

    case "days_and_nights":
      return `${variant?.duration_days}D/${variant?.duration_nights}N`;

    default:
      return "";
  }
};

const formattedDay = (day: number): string =>
  day.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

const formattedPrice = (price: number | string, locale?: string) => {
  return Number(price).toLocaleString(locale || "hi-IN");
};

export {
  calculateDiscountPercentage,
  getCalendarType,
  showTimeSlots,
  getVariantDuration,
  formattedDay,
  formattedPrice,
};
