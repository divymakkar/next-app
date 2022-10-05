import type { NextPage } from "next";
import { useEffect, useState } from "react";

// Import External Libraries
import moment from "moment";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getCountryCallingCode,
  getCountries,
} from "react-phone-number-input/input";
import { isEmpty, uniqWith } from "lodash";

// Interfaces Import
import {
  OrderPageProps,
  BookedItemsType,
  OrderDescriptionType,
  SurchargeType,
  BookingLineItemType,
} from "@/interfaces/OrderPage.interface";

// Components Import
import DiscountsCard from "@/components/DiscountsCard";
import BookingExpiryTimer from "@/components/BookingExpiryTimer";
import TourContentCard from "@/components/TourContentCard";
import MoreInfoCard from "@/components/MoreInfoCard";
import CheckBoxOption from "@/components/CheckBoxOption";
import { loadOrderData } from "@/lib/load-order-data";
import { DiscountType } from "@/components/DiscountsCard/interface";

const OrderPage: NextPage<OrderPageProps> = ({ data, error }) => {
  console.log("OrderData --->", data);

  // States
  const [bookingForSomeoneElse, setBookingForSomeoneElse] = useState(false);
  const [enableRefundableBooking, setEnableRefundableBooking] = useState(false);
  const [enablePickupAndDropoff, setEnablePickupAndDropoff] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountType | null>(
    null
  );

  // FRAGMENT: Formik Form Inital Values
  const primaryPassengerDetails = data.bookings[0].passengers.filter(function (
    passenger
  ) {
    return passenger.is_primary_passenger === true;
  })[0];

  const customerDetails = {
    firstName: primaryPassengerDetails.first_name,
    lastName: primaryPassengerDetails.last_name,
    email: primaryPassengerDetails.email,
    phoneCountryCode: primaryPassengerDetails.phone_country_code,
    phoneNumber: primaryPassengerDetails.phone,
  };

  // Formik Form

  const customerDetailsSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z]*$/, "First name can only contain alphabets"),
    lastName: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z]*$/, "Last name can only contain alphabets"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneCountryCode: Yup.string()
      .matches(/^[+][0-9]{1,3}$/, "Invalid Country Code")
      .required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Invalid Phone Number"
      ),
  });

  const formik = useFormik({
    initialValues: customerDetails,
    onSubmit: (values) => {
      handleOrderSubmit(values);
    },
    validationSchema: customerDetailsSchema,
  });

  const handleOrderSubmit = (values: any) => {
    console.log(values);
  };

  return (
    // WRAP: Order Page
    <div className="container">
      <div className="order-page">
        {/* WRAP: Order Package Details Container */}
        <div className="order-page-container">
          {/* SECTION: Order Description */}
          <div className="order-page-container-item order-desc">
            {/* SUBSECTION: Order Description */}
            <OrderDescription
              bookingName={data.bookings[0].name}
              product={{
                product_type: data.bookings[0].product.product_type,
                location: data.bookings[0].product.location,
                variantName: data.bookings[0].product.variant_name,
              }}
              bookingDuration={{
                dateOfTravel: data.bookings[0].date_of_travel,
                bookingEndDate: data.bookings[0].booking_end_date,
                checkInDate: data.bookings[0].checkin_date,
                checkOutDate: data.bookings[0].checkout_date,
                duration: data.bookings[0].product.variant_duration,
                ifHasTimeSlot: data.bookings[0].variant_has_time_slots,
              }}
            />
          </div>

          {/* SECTION: Order Summary, Payment Details and Offers */}
          <div className="order-page-container-item order-summary">
            {/* SUBSECTION: Booking Summary */}
            <BookingSummary
              formik={formik}
              bookingLineItems={data.bookings[0].booking_line_items}
              bookingCurrency={data.bookings[0].currency}
              selectedDiscount={selectedDiscount}
            />

            {/* SUBSECTION: Timer */}
            <BookingExpiryTimer
              // bookingCreatedTime={moment(data.bookings[0].created_at)}
              bookingCreatedTime={moment()}
              expirySeconds={data.bookings[0].booking_expiry_seconds}
              redirectProductSlug={data.bookings[0].product.slug}
            />

            {/* SUBSECTION: Offers */}
            <DiscountsCard
              discounts={data.bookings[0].product.discounts}
              selectedDiscount={selectedDiscount}
              setSelectedDiscount={setSelectedDiscount}
              showRadioBtn
              showPromoInput
            />
          </div>

          {/* SECTION: Customer Details and Payment Methods */}
          <div className="order-page-container-item order-input-details">
            {/* SUBSECTION: Booking For Someone else */}
            <CheckBoxOption
              title="Booking For Someone Else?"
              id={"booking-for-someone-else"}
              moreInfo={[
                "If you are booking for someone else, please enter their details below.",
              ]}
              onCheck={() => {
                setBookingForSomeoneElse(!bookingForSomeoneElse);
              }}
              state={bookingForSomeoneElse}
              showToolTip={true}
            />

            {/* SUBSECTION: Customer Details */}
            <TourContentCard
              headerTitle="Contact Details"
              collapsible={true}
              className="customer-details-container"
            >
              <CustomerDetails formik={formik} />
            </TourContentCard>

            {/* SUBSECTION: Refundable Booking */}
            <CheckBoxOption
              title="Upgrade to refundable booking"
              id={"upgrade-to-refundable-booking"}
              moreInfo={["Enable refundable booking"]}
              onCheck={() => {
                setEnableRefundableBooking(!enableRefundableBooking);
              }}
              state={enableRefundableBooking}
              showToolTip={true}
            />

            {/* SUBSECTION: Pickup and Drop Point */}
            <CheckBoxOption
              title="Need Pickup and drop?"
              id={"need-pickup-and-drop"}
              moreInfo={["Enable pickup and drop"]}
              onCheck={() => {
                setEnablePickupAndDropoff(!enablePickupAndDropoff);
              }}
              state={enablePickupAndDropoff}
              showToolTip={true}
            />

            {/* SUBSECTION: Payment Section */}
            <TourContentCard
              headerTitle="Payment Options"
              collapsible={true}
              className="payment-options-container"
            >
              <PaymentSection formik={formik} />
            </TourContentCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDescription = (props: OrderDescriptionType) => {
  return (
    <div className="order-desc-container">
      <div className="order-desc-container-item order-info">
        <div className="order-info-left">
          <img
            className="order-info-left-image"
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=40"
            alt="product-img"
          />
          <div className="order-info-left-rating">4.5/5</div>
        </div>

        <div className="order-info-title">
          <div className="order-info-title-content">{props.bookingName}</div>
        </div>

        <div className="order-info-product-details">
          <div className="order-info-product-details-location">
            <img
              className="order-info-product-details-location-icon"
              src="/icons/location-pin.svg"
              alt="location-pin"
            />
            <div className="order-info-product-details-location-text">
              {props.product.location}
            </div>
          </div>

          <div className="order-info-product-details-inventory">
            <img
              className="order-info-product-details-inventory-icon"
              src="/icons/bed.svg"
              alt="bed"
            />
            <div className="order-info-product-details-inventory-text">
              2 Rooms - 2 Adults, 3 Childrens
            </div>
          </div>

          <div className="order-info-product-details-dates">
            <img
              className="order-info-product-details-dates-icon"
              src="/icons/calender.svg"
              alt="calender"
            />

            {["staycation", "dynamic_rental"].includes(
              props.product.product_type
            ) && props.bookingDuration.bookingEndDate ? (
              <div className="order-info-product-details-dates-multiple">
                <div className="top-row">
                  <div className="top-row-date1">
                    <div> Check-in </div>
                    <div className="linear-line"></div>
                    <div>
                      <div> {props.bookingDuration.duration.days} </div>
                      <img src="/icons/sun.svg" alt="sun" />
                    </div>
                  </div>
                  <div className="top-row-date2">
                    <div>
                      <div> {props.bookingDuration.duration.nights} </div>
                      <img src="/icons/moon.svg" alt="moon" />
                    </div>
                    <div className="linear-line"></div>
                    <div> Check-out </div>
                  </div>
                </div>
                <div className="bottom-row">
                  <span>
                    {moment(props.bookingDuration.checkInDate)
                      .utc()
                      .format("MMM Do YY")}
                  </span>
                  <span>
                    {moment(props.bookingDuration.checkOutDate)
                      .utc()
                      .format("MMM Do YY")}
                  </span>
                </div>
              </div>
            ) : (
              <div className="order-info-product-details-dates-single">
                <div className="date-of-travel">
                  <div className="detail-heading">Date of Travel</div>
                  <div className="detail-content">
                    {moment(props.bookingDuration.dateOfTravel)
                      .utc()
                      .format("MMM Do YY")}
                  </div>
                </div>
                {props.bookingDuration.ifHasTimeSlot && (
                  <div className="time-slot">
                    <div className="detail-heading">Time Slot</div>
                    <div className="detail-content">
                      {moment(props.bookingDuration.dateOfTravel)
                        .utc()
                        .format("LT")}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="order-desc-container-item order-package-details">
        <div className="order-package-details-left">
          <img src="/icons/bed2.svg" alt="bed" />
        </div>
        <div className="order-package-details-right">
          <div>
            <div>{props.product.variantName}</div>
            <div>Edit</div>
          </div>
          <div>View Package Details</div>
        </div>
      </div>
    </div>
  );
};

const BookingSummary = ({
  formik,
  bookingLineItems,
  bookingCurrency,
  selectedDiscount,
}: {
  formik: any;
  bookingLineItems: BookingLineItemType[];
  bookingCurrency: string;
  selectedDiscount: DiscountType | null;
}) => {
  // States
  const [fareBreakup, setFareBreakup] = useState(false);
  const [thrillophiliaWalletsUsed, setThrillophiliaWalletsUsed] = useState({
    thrillcash: false,
    thrillcashPlus: false,
  });

  // Constants
  // FRAGMENT: Wallet More Info Instructions
  const walletMoreInfo = {
    thrillcash: [
      "Thrillcash is a Thrillophilia wallet that can be used to pay for your bookings.",
      "You can earn Thrillcash by referring your friends to Thrillophilia.",
      "You can also earn Thrillcash by writing reviews for your past experiences.",
    ],
    thrillcashPlus: [
      "Thrillcash Plus is a Thrillophilia wallet that can be used to pay for your bookings.",
      "You can earn Thrillcash Plus by referring your friends to Thrillophilia.",
    ],
  };

  // Booking Line Items
  const bookedInventories = bookingLineItems.filter(
    (item: any) => item.type === "booked_inventory"
  );
  const surcharges = bookingLineItems.filter((item: any) =>
    [
      "booked_third_party_service",
      "tax",
      "fee",
      "booking_partner_surcharge",
    ].includes(item.type)
  );
  const totalSurchargeAmount = surcharges.reduce(
    (acc: number, surcharge: any) => acc + Number(surcharge.amount),
    0
  );

  // Note: Taking the currency of the line items same as that of booking, since the currency source of booking line items is booking
  const lineItems: any = {
    bookedInventories: bookedInventories,
    surcharges: {
      totalAmount: `${bookingCurrency} ${totalSurchargeAmount}`,
      list: surcharges,
    },
    concessions: {
      totalAmount: `${bookingCurrency} 0`,
      list: [],
    },
  };

  // Functions
  const onWalletSelect = (e: { value: any; checked: boolean }) => {
    setThrillophiliaWalletsUsed((state: any) => {
      return {
        ...state,
        [e.value]: e.checked,
      };
    });
  };

  return (
    <div className="booking-summary-container">
      <div className="booking-summary-container-header">
        <div className="booking-summary-container-header-title">
          Booking Summary
        </div>
        <div className="booking-summary-container-header-fare-breakup">
          <span className="fare-breakup-text">Fare Breakup </span>
          <span
            className="fare-breakup-icon"
            onClick={() => setFareBreakup(!fareBreakup)}
          >
            {fareBreakup ? "-" : "+"}
          </span>
        </div>
      </div>

      <div className="booking-summary-container-divider"></div>

      <div className="booking-summary-container-body">
        <div className="booking-summary-container-body-line-items">
          {lineItems.bookedInventories.map(
            (bookedInventory: BookedItemsType, index: number) => {
              return (
                <div className="booking-summary-container-body-line-items-item">
                  <div className="booking-summary-container-body-line-items-item-left">
                    {bookedInventory.quantity} {bookedInventory.name}
                  </div>
                  <div className="booking-summary-container-body-line-items-item-right">
                    <div className="booking-summary-container-body-line-items-item-right-price">
                      <span className="strike-price">
                        {bookedInventory.currency}{" "}
                        {bookedInventory.strike_through_amount}
                      </span>
                      <span className="actual-price">
                        {bookedInventory.currency} {bookedInventory.amount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          )}

          {fareBreakup ? (
            <>
              <div className="booking-summary-container-body-sub-heading">
                <div className="booking-summary-container-body-sub-heading-title">
                  Taxes
                </div>
                <div className="booking-summary-container-body-sub-heading-icon">
                  {" "}
                  -{" "}
                </div>
              </div>
              {lineItems.surcharges.list.map(
                (surcharge: SurchargeType, index: number) => {
                  return (
                    <div className="booking-summary-container-body-line-items-item">
                      <div className="booking-summary-container-body-line-items-item-left">
                        {surcharge.name}
                      </div>
                      <div className="booking-summary-container-body-line-items-item-right">
                        <div className="booking-summary-container-body-line-items-item-right-price">
                          <span className="actual-price">
                            {surcharge.currency} {surcharge.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </>
          ) : (
            <>
              <div className="booking-summary-container-body-line-items-item">
                <div className="booking-summary-container-body-line-items-item-left">
                  {"GST + Taxes"}
                </div>
                <div className="booking-summary-container-body-line-items-item-right">
                  <div className="booking-summary-container-body-line-items-item-right-price">
                    <span className="actual-price">
                      {lineItems.surcharges.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {fareBreakup && (
            <>
              <div className="booking-summary-container-body-sub-heading">
                <div className="booking-summary-container-body-sub-heading-title">
                  Discounts
                </div>
                <div className="booking-summary-container-body-sub-heading-icon">
                  {" "}
                  -{" "}
                </div>
              </div>
            </>
          )}
          {/* {discounts.map((discount: DiscountType, index: number) => {
            return (
              <div className="booking-summary-container-body-line-items-item">
                <div className="booking-summary-container-body-line-items-item-left">
                  <div className="discounts">
                    <div className="discounts-name">{discount.code}</div>
                    <img className="discounts-tick-icon" src="/icons/tick-mark.svg" alt="tick-mark"></img>
                  </div>
                </div>
                <div className="booking-summary-container-body-line-items-item-right">
                  <div className="discounts">
                    <div className="booking-summary-container-body-line-items-item-right-price">
                      <span className="actual-price">{discount.amount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) */}
          {/* })} */}
        </div>

        <div className="booking-summary-container-divider"></div>

        <div className="booking-summary-container-body-total-payable">
          <div className="booking-summary-container-body-total-payable-left">
            Total Payable Amount
          </div>
          <div className="booking-summary-container-body-total-payable-right">
            ₹ 5000
          </div>
        </div>

        <div className="booking-summary-container-divider"></div>

        <div className="booking-summary-container-body-use-wallet">
          <div className="field-checkbox">
            <Checkbox
              inputId="thrillcash"
              name="Thrillcash"
              value="thrillcash"
              onChange={onWalletSelect}
              checked={thrillophiliaWalletsUsed["thrillcash"]}
            />
            <label htmlFor="thrillcash">
              <div className="wallet-text">
                <div>Apply available </div>
                <div className="wallet-text-amount">
                  <span> Thrillcash</span>
                  <span className="thrillcash-amount"> ₹ 2000</span>
                </div>
                <img
                  className="wallet-text-more-info thrillcash-more-info"
                  src="/icons/more-info.svg"
                  alt="more information"
                ></img>
                <MoreInfoCard
                  targetClass={"thrillcash-more-info"}
                  content={walletMoreInfo.thrillcash}
                />
              </div>
            </label>
          </div>
          <div className="field-checkbox">
            <Checkbox
              inputId="thrillcashPlus"
              name="Thrillcash Plus"
              value="thrillcashPlus"
              onChange={onWalletSelect}
              checked={thrillophiliaWalletsUsed["thrillcashPlus"]}
            />
            <label htmlFor="thrillcashPlus">
              <div className="wallet-text">
                <div>Apply available </div>
                <div className="wallet-text-amount">
                  <span> Thrillcash Plus</span>
                  <span className="thrillcash-amount"> ₹ 1000</span>
                </div>
                <img
                  className="wallet-text-more-info thrillcash-plus-more-info"
                  src="/icons/more-info.svg"
                  alt="more information"
                ></img>
                <MoreInfoCard
                  targetClass={"thrillcash-plus-more-info"}
                  content={walletMoreInfo.thrillcashPlus}
                />
              </div>
            </label>
          </div>
        </div>

        <div
          className="booking-summary-container-body-proceed-btn"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          <button className="btn btn__lg btn__brand-filled">
            Proceed to Booking{" "}
            <img
              className="proceed-booking-button-arrow"
              src="/icons/down-arrow.svg"
              alt="down-arrow"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerDetails = ({ formik }: any) => {
  const [isGSTNumberOptionChecked, setIsGSTNumberOptionChecked] =
    useState(false);
  const allCountries: any[] = uniqWith(
    getCountries(),
    (country1: any, country2: any) => {
      return getCountryCallingCode(country1) == getCountryCallingCode(country2);
    }
  );
  const phoneCodes = allCountries.map((country: any) => ({
    code: `+${getCountryCallingCode(country)}`,
  }));

  return (
    <form className="customer-details-form" onSubmit={formik.handleSubmit}>
      <div className="customer-details-form-basic-info">
        <div className="customer-details-form-group">
          <div className="form-item">
            <label htmlFor="firstName" className="form-item-label required">
              First Name
            </label>
            <InputText
              value={formik.values.firstName}
              id="firstName"
              name="firstName"
              onChange={(e) => {
                formik.setFieldValue("firstName", e.target.value);
              }}
              className={
                formik.touched.firstName && formik.errors.firstName
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <small id="firstName-help" className="p-error block">
                {formik.errors.firstName}
              </small>
            )}
          </div>
          <div className="form-item">
            <label htmlFor="lastName" className="form-item-label required">
              Last Name
            </label>
            <InputText
              value={formik.values.lastName}
              id="lastName"
              name="lastName"
              onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
              className={
                formik.touched.lastName && formik.errors.lastName
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <small id="lastName-help" className="p-error block">
                {formik.errors.lastName}
              </small>
            )}
          </div>
        </div>

        <div className="customer-details-form-group">
          <div className="form-item">
            <label htmlFor="email" className="form-item-label required">
              Email Address
            </label>
            <InputText
              value={formik.values.email}
              id="email"
              name="email"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              className={
                formik.touched.email && formik.errors.email ? "p-invalid" : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <small id="email-help" className="p-error block">
                {formik.errors.email}
              </small>
            )}
          </div>
          <div className="form-item">
            <label htmlFor="phone" className="form-item-label required">
              Phone
            </label>
            <div className="form-item-sub-parts">
              <Dropdown
                name="phoneCountryCode"
                id="phoneCountryCode"
                value={{ code: formik.values.phoneCountryCode }}
                options={phoneCodes}
                onChange={(e) => {
                  formik.setFieldValue("phoneCountryCode", e.value.code);
                }}
                optionLabel="code"
                filter
                placeholder="Phone Code"
                className={`form-item-sub-parts-dropdown ${
                  formik.touched.phoneCountryCode &&
                  formik.errors.phoneCountryCode
                    ? "p-invalid"
                    : ""
                }`}
              />
              <InputNumber
                inputId="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={(e) => {
                  formik.setFieldValue(
                    "phoneNumber",
                    e.value == null ? "" : e.value
                  );
                }}
                mode="decimal"
                useGrouping={false}
                className={`form-item-sub-parts-input ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "p-invalid"
                    : ""
                }`}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <small id="phoneNumber-help" className="p-error block'">
                {formik.errors.phoneNumber}
              </small>
            )}
          </div>
        </div>
      </div>
      <div className="customer-details-form-extra-info">
        <CheckBoxOption
          title="I have GST number (Optional)"
          id={"need-pickup-and-drop"}
          onCheck={() => setIsGSTNumberOptionChecked(!isGSTNumberOptionChecked)}
          state={isGSTNumberOptionChecked}
          showToolTip={false}
        />
        {isGSTNumberOptionChecked && (
          <div className="customer-details-form-group">
            <div className="form-item">
              <label htmlFor="gstNumber" className="form-item-label">
                GST Number
              </label>
              <InputText
                value={formik.values.gstNumber}
                id="gstNumber"
                name="gstNumber"
                onChange={(e: any) =>
                  formik.setFieldValue("gstNumber", e.value)
                }
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

const PaymentSection = ({ formik }: any) => {
  return <></>;
};

// Functions
export async function getServerSideProps({ params }: any) {
  const data = await loadOrderData(params.orderRef);
  return {
    props: { data },
  };
}

export default OrderPage;
