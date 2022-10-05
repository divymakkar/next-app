import React, { useEffect, useRef, useState } from "react";
import { Collapse } from "react-collapse";
import { delay, isEmpty, union } from "lodash";
import CopyToClipboard from "react-copy-to-clipboard";
import { AllDiscountsType, DiscountType } from "./interface";
import { dateFormatter, DateParseFormat, useMediaQuery } from "./helper";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";

const DiscountsCard = (props: {
  discounts: AllDiscountsType;
  selectedDiscount?: DiscountType | null;
  setSelectedDiscount?: (discount: DiscountType | null) => void;
  showRadioBtn?: boolean;
  showPromoInput?: boolean;
}) => {
  const allDiscounts = props.discounts;

  // Get all the types of discounts
  const thrillophiliaDiscounts: DiscountType[] = union(
    allDiscounts?.deduction_discounts,
    allDiscounts?.thrillcash_discounts,
    allDiscounts?.thrillcash_plus_discounts
  );
  const bankDiscounts: DiscountType[] = [];
  const discounts = union(thrillophiliaDiscounts, bankDiscounts);

  // If ModalOpen State - Modal (For Mobile)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // If PromocodeOpen State
  const [isEnterPromoCodeOpen, setIsEnterPromoCodeOpen] = useState(false);

  // Functions
  const setModalState = (res: boolean) => {
    setIsModalOpen(res);
  };

  const handleEnterPromoCode = () => {};

  // Discounts Component
  return (
    <>
      {!isEmpty(discounts) && (
        <div className="discounts-card-container">
          <div className="discounts-card">
            <div className="discounts-card-title">
              <div className="discounts-card-title-header">Best Offers</div>
              {props?.showPromoInput && (
                <div className="discounts-card-title-use-promo">
                  <img src="/icons/promocode.svg" alt="use promo code" />
                  <div
                    onClick={() =>
                      setIsEnterPromoCodeOpen(!isEnterPromoCodeOpen)
                    }
                  >
                    Have Promocode?
                  </div>
                </div>
              )}
            </div>
            {isEnterPromoCodeOpen && (
              <div className="discounts-card-enter-promo-code">
                <div className="p-inputgroup">
                  <InputText placeholder="PROMOCODE" />
                  <button
                    className="p-inputgroup-addon"
                    onClick={handleEnterPromoCode}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
            <div className="discounts-card-items">
              {discounts
                .slice(0, 2)
                .map((discount: DiscountType, index: number) => (
                  <DiscountsCardDiscountItem
                    key={index}
                    id={index}
                    discount={discount}
                    selected={props.selectedDiscount?.code === discount.code}
                    setSelectedDiscount={props.setSelectedDiscount}
                    showRadioBtn={props.showRadioBtn}
                  />
                ))}
            </div>
            {discounts.length > 2 && (
              <div
                className="discounts-card-offers"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
              >
                <img
                  className="tours-icon-price-tag"
                  src="/icons/tag.svg"
                  alt="tag"
                ></img>
                <div className="discounts-card-offers-expand">
                  {" "}
                  All Offers{" "}
                  {discounts.length - 2 >= 1 ? `(${discounts.length - 2})` : ""}
                </div>
                <img src="/icons/down-arrow-single.svg" alt="down arrow"></img>
              </div>
            )}

            {/* Discounts Modal - Only if Modal is Open */}
            {isModalOpen && (
              <DiscountsCardModal
                discounts={discounts}
                setModalState={setModalState}
                selectedDiscount={props.selectedDiscount}
                setSelectedDiscount={props.setSelectedDiscount}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Discounts Card Modal
const DiscountsCardModal = (props: {
  discounts: DiscountType[];
  setModalState: (res: boolean) => void;
  selectedDiscount?: DiscountType | null;
  setSelectedDiscount?: (discount: DiscountType | null) => void;
  showRadioBtn?: boolean;
}) => {
  // Use Effect to block the body from scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  // Get the Discounts from the props
  const { discounts, setModalState, selectedDiscount, setSelectedDiscount } =
    props;

  // Media Query Listener to check for Phone
  const isNotMobile = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="discounts-card-modal-wrapper">
      <div className="discounts-card-container">
        <div className="discounts-card">
          <div className="discounts-card-title">
            <span>Best Offers</span>
            <img
              src="/icons/close.svg"
              alt="close button"
              className="discounts-card-title-close-icon"
              onClick={() => {
                document.body.style.overflow = "auto";
                setModalState(false);
              }}
            ></img>
          </div>
          <div className="discounts-card-items">
            {discounts.map((discount: DiscountType, index: number) => (
              <DiscountsCardDiscountItem
                key={index}
                id={index}
                discount={discount}
                selected={selectedDiscount?.code === discount.code}
                setSelectedDiscount={setSelectedDiscount}
                showRadioBtn={props.showRadioBtn}
              />
            ))}
          </div>
          {isNotMobile && (
            <div className="discounts-card-footer">
              <img src="/icons/double-down-arrow.svg" alt="down arrow"></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Discount Card Item
const DiscountsCardDiscountItem = ({
  id,
  discount,
  selected,
  setSelectedDiscount,
  showRadioBtn,
}: {
  id: number;
  discount: DiscountType;
  selected?: boolean;
  setSelectedDiscount?: (discount: DiscountType | null) => void;
  showRadioBtn?: boolean;
}) => {
  // If Open State for code description
  const [isOpen, setIsOpen] = useState(false);

  // State to copy text
  const tooltipRef: any = useRef();
  const initialTooltipText = "Click to copy";
  const [tooltipText, setTooltipText] = useState(initialTooltipText);
  const updateTooltipText = () => {
    setTooltipText("Copied!");
    delay(() => {
      setTooltipText(initialTooltipText);
    }, 3200);
  };

  return (
    <div className={`discounts-card-items-item ${selected ? "selected" : ""}`}>
      {showRadioBtn && (
        <div className="field-radiobutton">
          <RadioButton
            inputId={`discount-${id}`}
            name={`discount-${id}`}
            value={discount}
            onChange={(e) =>
              setSelectedDiscount && setSelectedDiscount(e.value)
            }
            checked={selected}
          />
        </div>
      )}
      <div
        className="discount-item-heading clickable"
        onClick={() => {
          setSelectedDiscount && setSelectedDiscount(discount);
        }}
      >
        <div className="discount-item-heading-icon">
          <img
            className="discount-badge"
            src="/icons/offer-icon.svg"
            alt="discount badge"
          ></img>
        </div>
        <div className="discount-item-heading-title">
          <div className="discount-item-heading-title-description">
            {discount.discount_string}
          </div>
          <div className="discount-item-heading-title-code">
            Use Code: {discount.code}
          </div>
        </div>
      </div>
      <div className="discount-item-content">
        <Collapse isOpened={isOpen}>
          <div className="discount-item-content-details">
            <div className="discount-item-content-details-copy-box">
              <img src="/icons/tag.svg" alt="tag" />
              <div className="copy-box-code">{discount.code}</div>
              <CopyToClipboard text={discount.code} onCopy={updateTooltipText}>
                <div className="copy-box-copy-icon">
                  <img src="/icons/copy.svg" alt="copy button" />
                  <span className="copy-box-copy-icon-onhover" ref={tooltipRef}>
                    {tooltipText}
                  </span>
                </div>
              </CopyToClipboard>
            </div>
            {!isEmpty(discount.terms_and_conditions) && (
              <div className="discount-item-content-details-description">
                <div className="description-amounts">
                  {discount.terms_and_conditions.min_booking_amt && (
                    <div className="description-title">
                      Minimum Booking Amount:{" "}
                      <span className="description-detail">
                        {discount.terms_and_conditions.min_booking_amt}
                      </span>
                    </div>
                  )}
                  {discount.terms_and_conditions.max_discount_amt && (
                    <div className="description-title">
                      Maximum Discount:{" "}
                      <span className="description-detail">
                        {discount.terms_and_conditions.max_discount_amt}
                      </span>
                    </div>
                  )}
                </div>
                {!isEmpty(discount.terms_and_conditions.date_of_booking) && (
                  <div className="description-dates">
                    {!isEmpty(
                      discount.terms_and_conditions.date_of_booking
                        .start_date_of_booking
                    ) && (
                      <div className="description-title">
                        {" "}
                        Valid From:{" "}
                        <span className="description-detail">
                          {dateFormatter(
                            discount.terms_and_conditions.date_of_booking
                              .start_date_of_booking
                          ).format(DateParseFormat)}
                        </span>
                      </div>
                    )}
                    {!isEmpty(
                      discount.terms_and_conditions.date_of_booking
                        .end_date_of_booking
                    ) && (
                      <div className="description-title">
                        Valid Till:{" "}
                        <span className="description-detail">
                          {dateFormatter(
                            discount.terms_and_conditions.date_of_booking
                              .end_date_of_booking
                          ).format(DateParseFormat)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </Collapse>
        <div
          className="discount-item-content-more"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "less" : "more"}
        </div>
      </div>
    </div>
  );
};

export default DiscountsCard;
