import Image from "next/image";
import React, { useState } from "react";
import PriceTag from "../PriceTag";
import RawHTML from "../RawHTML";
import SideBar from "../Sidebar";
import TourContentCard from "../TourContentCard";
import { getVariantDuration } from "@/utils/tour";

function TourPackagesSection(props: {
  currency: string;
  selectable: boolean;
  selectedPackage: number | null;
  packageData: any;
  productType: string;
  onChange: (variantId: number, bookingType: string) => void;
}) {
  const {
    currency,
    selectable,
    selectedPackage,
    packageData,
    productType,
    onChange,
  } = props;

  const [packageSidebarVisible, setPackageSidebarVisible] = useState(false);
  const [packageToViewInSidebar, setPackageToViewInSidebar] = useState(0);
  const handlePackageView = (id: number) => {
    setPackageSidebarVisible(true);
    setPackageToViewInSidebar(id);
  };

  return (
    <div className="tour-packages-card">
      <SideBar
        header="Package Details"
        className="packages-sidebar"
        {...{
          visibleRight: packageSidebarVisible,
          setVisibleRight: setPackageSidebarVisible,
        }}
      >
        <TourContentCard
          headerTitle={packageData && packageData[packageToViewInSidebar]?.name}
          headerClassName="package-title"
        >
          <RawHTML className="overview">
            {packageData && packageData[packageToViewInSidebar]?.overview}
          </RawHTML>
        </TourContentCard>

        <TourContentCard headerClassName="room-details-header">
          <div className="package-sidebar-item">
            <strong className="title">Room Amenities</strong>
            <div>
              {packageData &&
                packageData[packageToViewInSidebar]?.amenities?.map(
                  (aminity: string, index: number) => {
                    return (
                      <p>
                        <i className="pi pi-check-circle"></i> {aminity}
                      </p>
                    );
                  }
                )}
            </div>
          </div>

          {packageData &&
            packageData[packageToViewInSidebar]?.room_details
              ?.room_size_in_sq_meters && (
              <div className="package-sidebar-item">
                <strong className="title">Room size:</strong>
                <p className="room-size">
                  {packageData &&
                    packageData[packageToViewInSidebar]?.room_details
                      ?.room_size_in_sq_meters}{" "}
                  m<sup>2</sup>
                </p>
              </div>
            )}

          {packageData &&
            packageData[packageToViewInSidebar]?.inclusions?.length > 0 && (
              <div className="package-sidebar-item">
                <strong className="title">Inclusions</strong>
                <div className="inclusions">
                  {packageData &&
                    packageData[packageToViewInSidebar]?.inclusions.map(
                      (
                        inclusion: { name: string; description: string },
                        index: number
                      ) => {
                        return (
                          <div key={index} className="inclusion">
                            <strong className="inclusion__name">
                              <i className="pi pi-check" /> {inclusion?.name}
                            </strong>
                            <RawHTML className="inclusion__desc">
                              {inclusion?.description}
                            </RawHTML>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            )}

          {packageData &&
            packageData[packageToViewInSidebar]?.room_details?.about_meals && (
              <div className="package-sidebar-item">
                <strong className="title">Meals</strong>
                <div>
                  <RawHTML>
                    {
                      packageData[packageToViewInSidebar]?.room_details
                        ?.about_meals
                    }
                  </RawHTML>
                </div>
              </div>
            )}

          {packageData &&
            packageData[packageToViewInSidebar]?.room_details?.child_policy && (
              <div className="package-sidebar-item">
                <strong className="title">View Child/baby policy</strong>
                <div>
                  <RawHTML>
                    {
                      packageData[packageToViewInSidebar]?.room_details
                        ?.child_policy
                    }
                  </RawHTML>
                </div>
              </div>
            )}

          {packageData &&
            packageData[packageToViewInSidebar]?.room_details
              ?.extra_guest_policy && (
              <div className="package-sidebar-item">
                <strong className="title">Extra Guest Policy</strong>
                <div>
                  <RawHTML>
                    {
                      packageData[packageToViewInSidebar]?.room_details
                        ?.extra_guest_policy
                    }
                  </RawHTML>
                </div>
              </div>
            )}
        </TourContentCard>
      </SideBar>
      <TourContentCard
        headerTitle="Package Options"
        headerClassName="tour-package-title"
        id="tour-package"
      >
        {packageData &&
          packageData.map((variant: any, index: number) => {
            return (
              <PackageCard
                key={index}
                index={index}
                currency={currency}
                productType={productType}
                variant={variant}
                isSeleted={variant.id === selectedPackage}
                handlePackageSelect={onChange}
                selectable={selectable}
                onViewPackageDetails={handlePackageView}
              />
            );
          })}
      </TourContentCard>
    </div>
  );
}

const PackageCard = (props: {
  index: number;
  currency: string;
  selectable: boolean;
  productType: string;
  variant: any;
  isSeleted: boolean;
  handlePackageSelect: (id: number, bookingType: string) => void;
  onViewPackageDetails: (arg0: number) => void;
}) => {
  const {
    index,
    currency,
    selectable,
    productType,
    variant,
    isSeleted,
    handlePackageSelect,
    onViewPackageDetails,
  } = props;

  switch (productType) {
    case "staycation":
    case "resort_deal":
      return (
        <div
          className={`package-card package-card__staycation ${
            isSeleted ? "package-card__active" : ""
          }`}
        >
          <div className="package-card-item package-card-head">
            <div className="package-card-title">{variant.name}</div>
            <div className="package-card-images">
              {variant.gallery_media
                .slice(0, 4)
                .map((imageSrcs: any, index: number) => {
                  return (
                    <div key={index} className="package-card-image">
                      <Image
                        src={imageSrcs.media_urls.ui_gallery}
                        alt="tour-image"
                        layout="fill"
                      />
                      {index === 3 && variant.gallery_media.length > 4 && (
                        <div className="view-all-cover">
                          <span>
                            {`View All (${variant.gallery_media.length - 4})`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          {variant?.amenities && (
            <div className="package-card-item package-card-inclusives">
              <ul className="inclusion-list">
                {variant.amenities
                  .slice(0, 4)
                  .map((aminity: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`inclusion-item ${
                          !aminity.available && "inclusion-item__unavailable"
                        }`}
                      >
                        <img src="/icons/breakfast.svg" alt="inclusion" />{" "}
                        {aminity}{" "}
                        {aminity.available && (
                          <img src="/icons/double-tick.svg" alt="checked" />
                        )}
                      </li>
                    );
                  })}

                <li
                  className="inclusion-item inclusion-item__link"
                  onClick={() => onViewPackageDetails(index)}
                >
                  View Package Details
                </li>
              </ul>
            </div>
          )}
          <div className="package-card-item package-card-pricing">
            <div className="package-card-pricing-content">
              <PriceTag
                currency="INR"
                striked={variant.strike_through_price}
                current={variant.starting_price}
                leastPricedInventory={variant.least_priced_inventory}
                size="md"
              />

              {selectable &&
                (isSeleted ? (
                  <div className="select-btn selected-text">
                    <img src="/icons/select-check.svg" alt="selected" />
                    Selected
                  </div>
                ) : (
                  <button
                    className="btn btn__brand-filled btn__md"
                    onClick={() =>
                      handlePackageSelect(variant?.id, variant?.booking_type)
                    }
                  >
                    Select Option
                  </button>
                ))}
            </div>
          </div>
        </div>
      );

    case "activity":
    case "tour":
      return (
        <div
          className={`package-card package-card__activity ${
            isSeleted ? "package-card__active" : ""
          }`}
        >
          <div className="package-card-item package-card-head">
            <div className="package-card-title">{variant.name}</div>
            <div className="activity-card-details">
              <div className="activity-item activity-item__duration">
                {getVariantDuration(variant)}
              </div>
              {variant?.has_slots && (
                <div className="activity-item activity-item__slots">
                  M T W T F S S
                </div>
              )}
              <div
                className="activity-item activity-item__view-all link-btn"
                onClick={() => onViewPackageDetails(index)}
              >
                View Package Details
              </div>
            </div>
          </div>

          <div className="package-card-item package-card-pricing">
            <div className="package-card-pricing-content">
              <div className="strike-through-price">
                {`${currency} ${variant?.strike_through_price}`}
              </div>
              <div className="current-price">{`${currency} ${variant?.starting_price}`}</div>
              <div className="price-unit">{`Per ${variant?.least_priced_inventory}`}</div>
              {selectable &&
                (isSeleted ? (
                  <div className="select-btn selected-text">
                    <img src="/icons/select-check.svg" alt="selected" />
                    Selected
                  </div>
                ) : (
                  <button
                    className="btn btn__brand-filled btn__md"
                    onClick={() =>
                      handlePackageSelect(variant?.id, variant?.booking_type)
                    }
                  >
                    Select Option
                  </button>
                ))}
            </div>
          </div>
        </div>
      );
  }
  return <></>;
};

export default TourPackagesSection;
