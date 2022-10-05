import { useState } from "react";

interface CollectionCardProps {
  tour: any;
  onButtonClick(): void;
}
function CollectionCard(props: CollectionCardProps) {
  return (
    <div className="base-block main-card-container tour-main-card">
      <div
        className="base-block main-card-container tour-main-card"
        data-id="71824"
      >
        <div className="base-block-head info-head">
          <div className="left-side">
            <span className="number">01</span>
            <div className="half-width">
              <h3 className="tour-title">
                <a target="_blank" href="/tours/glimpse-of-switzerland">
                  {props.tour?.name}
                </a>
              </h3>
            </div>
          </div>
          <div className="right-side mobile-hidden">
            <div className="reviews-holder text-center mobile-hidden">
              <span className="">Superb</span>
              <span className="reviews-numb">
                {props.tour?.reviews_count} Ratings
              </span>
            </div>
            <div className="mobile-display">
              <div className="value-holder mobile-hidden">
                <span>{props.tour?.average_rating}</span>
              </div>
              <div className="raiting-holder mobile-hidden">
                <ul className="raiting-list">
                  {[1, 2, 3, 4, 5].map((index) => {
                    return (
                      <li className="icon-star-empty">
                        <img
                          src={
                            index < props.tour?.average_rating
                              ? "/icons/star-filled-collection.svg"
                              : "/icons/star-collection.svg"
                          }
                          alt=""
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="base-block-image onclick-link">
          {props.tour?.new_ui_images?.new_ui_main_card_full_width
            ?.fallback_img_srcset ? (
            <img
              className="lazy-picture lazy-picture-loaded"
              srcSet={
                props.tour?.new_ui_images?.new_ui_main_card_full_width
                  ?.fallback_img_srcset
              }
            />
          ) : (
            <img
              className="lazy-picture lazy-picture-loaded"
              srcSet="https://assets.traveltriangle.com/blog/wp-content/uploads/2015/09/Scuba-Diving-in-Tarkarli.jpg"
            />
          )}
        </div>
        <div className="base-block-info line">
          <ul className="additional-list-info mobile-hidden">
            <li className="trip-duration">
              <img src="/icons/clock-collection.svg" alt="" />
              {props.tour?.days > 0 && (
                <span>
                  {props.tour?.days}D
                  {props.tour?.nights && `/${props.tour?.nights}N`}
                </span>
              )}
              {props.tour?.hours > 0 && <span>{props.tour?.hours}H</span>}
            </li>
            <li className="trip-location">
              <img src="/icons/location-pin-collection.svg" />
              <span>{props.tour?.location?.name}</span>
            </li>
          </ul>
          <div className="price-holder">
            <div className="mobile-holder">
              <ul className="additional-list-info desktop-hidden">
                <li className="trip-duration">
                  <img src="/icons/clock-collection.svg" alt="" />
                  {props.tour?.days > 0 && (
                    <span>
                      {props.tour?.days}D
                      {props.tour?.nights && `/${props.tour?.nights}N`}
                    </span>
                  )}
                  {props.tour?.hours > 0 && <span>{props.tour?.hours}H</span>}
                </li>
              </ul>
            </div>
            <div className="right-side desktop-hidden">
              <span className="rating-holder mobile-rating desktop-hidden">
                <ul className="rating-list mobile-rating-list">
                  {[1, 2, 3, 4, 5].map((index) => {
                    return (
                      <li className="icon-star-empty">
                        <img
                          src={
                            index < props.tour?.average_rating
                              ? "/icons/star-filled-collection.svg"
                              : "/icons/star-collection.svg"
                          }
                          alt=""
                        />
                      </li>
                    );
                  })}
                </ul>
                <span className="reviews-numb mobile-rating-num desktop-hidden">
                  {props.tour?.reviews_count} Ratings
                </span>
              </span>
            </div>
            <div className="services-price">
              <span className="cut-off-price">
                <s>
                  <span
                    className="th-currency-tag"
                    data-currency="INR"
                    data-amount="1400.0"
                  >
                    ₹ {props.tour?.price}
                  </span>
                </s>
              </span>
              <span className="big-size">
                <span
                  className="th-currency-tag"
                  data-currency="INR"
                  data-amount="1150.0"
                >
                  ₹ {props.tour?.discounted_price}
                </span>
                <span className="current-price-inventory-name">
                  per {props.tour?.least_priced_inventory}
                </span>
              </span>
            </div>
          </div>
          <div className="btn-holder">
            {props.tour?.show_book_now && <a
              className="btn btn-sm radius-md"
              target="_blank"
              href={props.tour?.url_path}
            >
              Book Now
            </a>}
            {props.tour?.show_enquiry &&
              <a
                className="btn btn-sm radius-md"
                target="_blank"
                onClick={props.onButtonClick}
              >
                Send Enquiry
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
