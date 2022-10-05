import { scrollTo } from "@/utils/document";
import { formattedPrice, getCalendarType, showTimeSlots } from "@/utils/tour";
import React from "react";
import CustomDatePicker from "../CustomDatePicker";
import EntityPicker from "../EntityPicker";

function TourPricingCard(props: {
  productData: any;
  formik: any;
  onEntityChange: any;
  onDateChange: any;
}) {
  //TODO
  const { productData, formik, onEntityChange, onDateChange } = props;

  return (
    <>
      <div className="content-card-item">
        <div className="tour-pricing">
          <div className="title">Starts At</div>
          <div className="tour-pricing-current">
            <div className="tour-pricing__current">
              {`${productData?.currency} ${formattedPrice(
                productData?.starting_price
              )}`}
            </div>
            <div className="tour-pricing__price-unit">
              /per {productData?.least_priced_inventory}
            </div>
          </div>
          <div className="tour-pricing__strike-through">
            {`${productData?.currency} ${formattedPrice(
              productData?.strike_through_price
            )}`}
          </div>
        </div>
      </div>

      <CustomDatePicker
        className="booking-date-picker clickable"
        wrapperClassName="custom-datepicker-wrapper"
        placeholderText="Select Date"
        selected={formik.values.bookings[0].date_of_travel}
        onChange={onDateChange}
        startDate={formik.values.bookings[0].date_of_travel}
        endDate={formik.values.bookings[0].booking_end_date}
        dateFormat="dd MMM yyyy  -  hh:mm a"
        selectsRange={
          getCalendarType(productData?.product_type, productData?.variants) ===
          "daterange"
        }
        monthsShown={
          getCalendarType(productData?.product_type, productData?.variants) ===
          "daterange"
            ? 2
            : 1
        }
        showTimeSelect={showTimeSlots(productData?.variants)}
      />

      <div className="content-card-item content-card-item__bordered content-card-item__padded">
        <div className="title title__border-bottom">Guests</div>
        <div className="guests-selector-wrapper">
          <EntityPicker
            data={formik.values.entityData}
            onChange={onEntityChange}
          />
        </div>
      </div>

      <div className="content-card-item">
        <button
          type="submit"
          className="btn btn__brand-filled btn__lg"
          onClick={() => {
            scrollTo("tour-package", 150);
          }}
        >
          View Package options
        </button>
      </div>
    </>
  );
}

export default TourPricingCard;
