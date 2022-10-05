import React from "react";
import EntityPicker, {
  IStickyBookingCardItems,
} from "@/components/EntityPicker";
import CustomDatePicker from "../CustomDatePicker";
import { formattedPrice, getCalendarType, showTimeSlots } from "@/utils/tour";
import { scrollTo } from "@/utils/document";

function StickyBookingCard(props: {
  productData: any; //TODO
  formik: any; //TODO
  productType: string;
  startingPrice: number | string;
  strikedPrice?: number | string;
  leastPricedInventory?: string;
  currency: string;
  bookable: boolean;
  enquirable: boolean;
  startDate: string | Date;
  endDate?: string | Date;
  entities?: IStickyBookingCardItems;
  onChange: any;
  onDateChange: any;
}) {
  const {
    productData,
    formik,
    productType,
    startingPrice,
    strikedPrice,
    leastPricedInventory,
    currency,
    bookable,
    enquirable,
    startDate,
    endDate,
    onChange,
    onDateChange,
    entities,
  } = props;

  const handleBookNow = () => {
    if (!formik.values.bookings[0].variant_id) scrollTo("tour-package");
  };
  return (
    <div className={`sticky-booking-card`}>
      <div className="booking-card-content">
        <div className="booking-card-content-left">
          <div className="picker-wrapper date-picker-wrapper">
            {getCalendarType(productType, productData?.variants) ===
            "daterange" ? (
              <p className="picker-title">Check in - Check out</p>
            ) : (
              <p className="picker-title">Travel Date</p>
            )}
            <div className="picker date-picker">
              <CustomDatePicker
                className="booking-date-picker"
                wrapperClassName="custom-datepicker-wrapper"
                placeholderText="Select Date"
                selected={startDate}
                onChange={onDateChange}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd MMM yyyy  -  hh:mm a"
                selectsRange={
                  getCalendarType(productType, productData?.variants) ===
                  "daterange"
                }
                monthsShown={
                  getCalendarType(productType, productData?.variants) ===
                  "daterange"
                    ? 2
                    : 1
                }
                showTimeSelect={showTimeSlots(productData?.variants)}
              />
            </div>
          </div>
          {entities && (
            <div className="picker-wrapper other-picker-wrapper">
              <p className="picker-title">Travellers, Rooms</p>
              <div className="picker other-picker">
                <EntityPicker data={entities} onChange={onChange} />
              </div>
            </div>
          )}
        </div>
        <div className="booking-card-content-right">
          <div className="pricing-wrapper">
            <div className="pricing-block">
              {strikedPrice && (
                <div className="pricing pricing__strike-through">
                  {`${currency} ${formattedPrice(strikedPrice)}`}
                </div>
              )}
              <div className="pricing pricing__current">{`${currency} ${formattedPrice(
                startingPrice
              )}`}</div>
            </div>
            {enquirable && (
              <div className="btn btn__md btn__brand-hollow">Send Enquiry</div>
            )}
            {bookable && (
              <div
                className="btn btn__md btn__brand-filled"
                onClick={handleBookNow}
              >
                BOOK NOW
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyBookingCard;
