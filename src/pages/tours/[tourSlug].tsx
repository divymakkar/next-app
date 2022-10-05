import AttractionsSection from "@/components/AttractionsSection";
import CustomDatePicker from "@/components/CustomDatePicker";
import DiscountsCard from "@/components/DiscountsCard";
import EntityPicker from "@/components/EntityPicker";
import IconHighlights from "@/components/IconHighlights";
import MoreLinksSection from "@/components/MoreLinksSection";
import MustKnowBeforeYouGo from "@/components/MustKnowBeforeYouGo";
import ProductsCarousel from "@/components/ProductsCarousel";
import ProductSubHeading from "@/components/ProductSubHeading";
import RawHTML from "@/components/RawHTML";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import SideBar from "@/components/Sidebar";
import StickyBookingCard from "@/components/StickyBookingCard";
import ThingsToCarry from "@/components/ThingsToCarry";
import TourBanner from "@/components/TourBanner";
import TourContentCard from "@/components/TourContentCard";
import TourEnquiryCard from "@/components/TourEnquiryCard";
import TourHighlights from "@/components/TourHighlights";
import { TourItinerary } from "@/components/TourItinerary";
import TourMap from "@/components/TourMap";
import TourPackagesSection from "@/components/TourPackagesSection";
import TourPricingCard from "@/components/TourPricingCard";
import TourReviewsSection from "@/components/TourReviewsSection";
import WhatsInTheBoxSection from "@/components/WhatsInTheBoxSection";
import { RequestBooking } from "@/interfaces/Booking.interface";
import { IFaq, IReview } from "@/interfaces/TourPage.interface";
import { loadTourData, getTourRelatedProducts } from "@/lib/load-tour-data";
import { scrollTo } from "@/utils/document";
import { calculateDiscountPercentage, getCalendarType } from "@/utils/tour";
import { useFormik } from "formik";
import { capitalize, isEmpty, sum, toLower } from "lodash";
import moment from "moment";
import Head from "next/head";
import { Accordion, AccordionTab } from "primereact/accordion";
import { TabMenu } from "primereact/tabmenu";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import type { NextPage } from "next";

interface TourPageProps {
  tourData: any;
  relatedProductsData: any;
}

const TourPage: NextPage<TourPageProps> = ({
  tourData,
  relatedProductsData,
}) => {
  // FRAGMENT: FAQs
  const [expandedFAQs, setExpandedFAQs] = useState([0]);
  const handleViewAllFAQ = () => {
    if (expandedFAQs.length === tourData?.faqs?.length) {
      setExpandedFAQs([]);
    } else {
      let newIndexes = tourData?.faqs?.map((i: IFaq, index: number) => index);
      setExpandedFAQs(newIndexes);
    }
  };

  // FRAGMENT: TabHighlights
  const tabHighlights = [
    { label: "Itinerary", icon: "" },
    { label: "Package", icon: "" },
    { label: "Map", icon: "" },
    { label: "Reviews", icon: "" },
    { label: "FAQ", icon: "" },
    { label: "Policies", icon: "" },
  ].filter((tabItem) => {
    if (tabItem.label === "FAQ" && tourData?.faqs?.length === 0) {
      return;
    } else if (tabItem.label === "Reviews" && tourData?.reviews?.length === 0) {
      return;
    } else if (tabItem.label === "Itinerary" && isEmpty(tourData?.itinerary)) {
      return;
    }
    return tabItem;
  });

  const [selectedHighlightTab, setSelectedHighlightTab] = useState(0);
  const handleTabChange = (e: any) => {
    setSelectedHighlightTab(e.index);
    scrollTo(`tour-${toLower(e.value.label)}`);
  };

  // FRAGMENT: Policies
  const [viewAllPolicies, setViewAllPolicies] = useState(false);
  const toggleViewAllPolicies = () => {
    setViewAllPolicies(!viewAllPolicies);
  };

  // FRAGMENT: Highlights
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number[]>([]);

  //NOTE: For collapsing all faqs, change name
  const onClick = (itemIndex = 0) => {
    let _activeIndex: number[] = activeIndex ? [...activeIndex] : [];

    if (_activeIndex.length === 0) {
      _activeIndex.push(itemIndex);
    } else {
      const index = _activeIndex.indexOf(itemIndex);
      if (index === -1) {
        _activeIndex.push(itemIndex);
      } else {
        _activeIndex.splice(index, 1);
      }
    }
    setActiveIndex(_activeIndex);
  };
  const toggleHighlightShow = () => {
    setProductSidebarVisible(true);
    setShowAllHighlights(!showAllHighlights);
    // onClick();
  };

  // FRAGMENT: Sidebar
  const [productSidebarVisible, setProductSidebarVisible] = useState(false);

  // FRAGMENT: Sticky Booking card
  const { ref: bookingCardRef, inView: bookingCardInView } = useInView({
    threshold: 0.5,
  });
  const { ref: enquiryCardRef, inView: enquiryCardInView } = useInView({
    threshold: 0.5,
  });

  // FRAGMENT: Form state

  const Order: RequestBooking = {
    booking_type: tourData?.booking_type,
    product_id: tourData?.id,
    variant_id: null,
    date_of_travel: "",
    time_slot: "",
    inventories: [],
  };

  const formik = useFormik({
    initialValues: {
      bookings: [Order],
      utm_params: {
        utm_campaign: null,
        utm_medium: null,
        utm_source: null,
        utm_term: null,
        utm_content: null,
        client: "",
        referer: "",
      }, //TODO
      booked_from_domain: "", //TODO "www.thrillophilia.com"
      currency: tourData?.currency, //TODO
    },
    onSubmit: (values) => {},
  });

  const handleTourDateChange = (date: any) => {
    console.log(date);

    switch (getCalendarType(tourData?.product_type, tourData?.variants)) {
      case "daterange":
        const [startDate, endDate] = date;
        formik.setFieldValue("bookings", [
          {
            ...formik?.values?.bookings[0],
            date_of_travel: startDate,
            booking_end_date: endDate,
          },
        ]);
        break;
      case "datetime":
        formik.setFieldValue("bookings", [
          {
            ...formik.values.bookings[0],
            date_of_travel: date,
            time_slot: moment(date).format("HH:MM"),
          },
        ]);

        break;
      default:
        formik.setFieldValue("bookings", [
          {
            ...formik.values.bookings[0],
            date_of_travel: date,
          },
        ]);

        break;
    }
  };
  const handleEntityChange = (data: any) => {
    formik.setFieldValue("entityData", data);
  };
  const handleVariantSelection = (variantId: number, bookingType: string) => {
    formik.setFieldValue("bookings", [
      {
        ...formik.values.bookings[0],
        variant_id: variantId,
        booking_type: bookingType,
      },
    ]);

    formik.setFieldValue("booked_from_domain", window?.location?.origin || "");
    console.log(formik.values);
  };

  return (
    <div className="container">
      <Head>
        <title>{tourData?.seo_detail?.meta_title}</title>
        <meta
          name="description"
          content={tourData?.seo_detail?.meta_description}
        />
      </Head>

      {/* SUBSECTION: Product sidebar */}
      <SideBar
        header="Product Details"
        {...{
          visibleRight: productSidebarVisible,
          setVisibleRight: setProductSidebarVisible,
        }}
      >
        {!isEmpty(tourData?.highlights) && (
          <TourContentCard className="icon-highlights-on-sidebar">
            <IconHighlights highlights={tourData?.highlights} />
          </TourContentCard>
        )}

        <TourContentCard
          headerTitle={`${capitalize(tourData?.name)} Highlights`}
        >
          <TourHighlights
            highlightList={tourData?.custom_highlights}
            toggleHighlightShow={toggleHighlightShow}
          />
        </TourContentCard>

        <TourContentCard headerTitle="Overview">
          <div className="tour-overview">
            <RawHTML className="overview">{tourData?.overview}</RawHTML>
            <RawHTML className="long-description">
              {tourData?.long_description}
            </RawHTML>
          </div>
        </TourContentCard>
      </SideBar>

      <TourBanner
        featuredMedia={tourData.featured_media}
        galleryMedia={tourData.gallery_media}
      />

      {/* SUBSECTION: Sticky Booking card */}
      {!bookingCardInView && !enquiryCardInView && (
        <StickyBookingCard
          productData={tourData}
          formik={formik}
          productType={tourData?.product_type}
          strikedPrice={tourData?.strike_through_price}
          startingPrice={tourData?.starting_price}
          leastPricedInventory={tourData?.least_priced_inventory}
          currency={tourData?.currency}
          bookable={tourData?.enable_online_booking}
          enquirable={tourData?.enable_send_enquiry}
          startDate={formik?.values?.bookings[0]?.date_of_travel || ""}
          endDate={formik?.values?.bookings[0]?.booking_end_date || ""}
          onChange={handleEntityChange}
          onDateChange={handleTourDateChange}
          // entities={formik.values.entityData}
        />
      )}

      {/* SECTION: App-Container */}
      <div className="app-container tour-page-container">
        {/* SECTION: Tour-Head */}
        <div className="tour-head">
          <div className="tour-head-left">
            <TourContentCard
              headerTitle={tourData?.name}
              headerClassName="tour-title"
              className="tour-title-card"
            >
              <div className="tour-content">
                <ProductSubHeading
                  rating={tourData?.rating}
                  reviews={tourData?.review_count}
                  location={tourData?.product_location}
                />
              </div>
            </TourContentCard>

            {/* SUBSECTION: Reviews */}
            {!isEmpty(tourData?.reviews) && (
              <ReviewsCarousel reviews={tourData?.reviews} />
            )}

            {/* SUBSECTION: Discounts / Best offers */}
            <DiscountsCard discounts={tourData?.discounts} />

            {/* SUBSECTION: Icon Highlights */}
            {!isEmpty(tourData?.highlights) && (
              <TourContentCard>
                <IconHighlights
                  highlights={tourData?.highlights}
                  toggleHighlightShow={toggleHighlightShow}
                  highlightsToShow={5}
                />
              </TourContentCard>
            )}

            {/* SUBSECTION: Text highlights */}
            <TourContentCard
              headerTitle={`${capitalize(tourData?.name)} Highlights`}
            >
              {!isEmpty(tourData?.custom_highlights) && (
                <TourHighlights
                  highlightList={tourData?.custom_highlights}
                  toggleHighlightShow={toggleHighlightShow}
                  highlightsToShow={4}
                  showViewMore
                />
              )}
            </TourContentCard>
          </div>
          <div className="tour-head-right">
            <div className="sticky-container">
              {/* SUBSECTION: Booking Card */}
              {tourData?.enable_online_booking && (
                <div
                  ref={bookingCardRef}
                  className="tour-content-card tour-booking-details-card"
                >
                  <TourPricingCard
                    productData={tourData}
                    formik={formik}
                    onEntityChange={handleEntityChange}
                    onDateChange={handleTourDateChange}
                  />
                </div>
              )}

              {/* SUBSECTION: Tour Enquiry Form */}
              {tourData?.enable_send_enquiry && (
                <div ref={enquiryCardRef}>
                  <TourEnquiryCard
                    tourData={tourData}
                    discount={calculateDiscountPercentage(
                      tourData?.strike_through_price,
                      tourData?.starting_price
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* !SECTION: Tour-Head */}

        {/* SUBSECTION: Whats in the box */}
        <TourContentCard
          headerTitle="What’s In The Box"
          contentClassName="whats-in-the-box"
        >
          <WhatsInTheBoxSection data={["something"]} />
        </TourContentCard>

        {/* SECTION: Tabhighlights-section */}
        <div className="tab-highlight-section">
          <div className="tabmenu tabmenu__evened highlight-tabmenu">
            <TabMenu
              model={tabHighlights}
              onTabChange={handleTabChange}
              activeIndex={selectedHighlightTab}
            />
          </div>

          {/* SUBSECTION: Tour-Itinerary */}
          {!isEmpty(tourData?.itinerary) && (
            <TourContentCard
              id="tour-itinerary"
              className="tour-itinerary-card"
              headerTitle={
                <>
                  <div className="title-text">Itinerary</div>
                  <button
                    className="btn btn__sm btn__brand-hollow view-all-btn"
                    onClick={handleViewAllFAQ}
                  >
                    {tourData?.faqs?.length !== expandedFAQs.length ? (
                      <span>
                        View all <i className="pi pi-angle-down" />{" "}
                      </span>
                    ) : (
                      <span>
                        Collapse all <i className="pi pi-angle-up" />{" "}
                      </span>
                    )}
                  </button>
                </>
              }
            >
              <TourItinerary itinerary={tourData?.itinerary?.itinerary_days} />
            </TourContentCard>
          )}

          {/* SUBSECTION: Tour-Package-options */}
          <TourPackagesSection
            selectable={tourData?.enable_online_booking}
            selectedPackage={formik.values.bookings[0].variant_id}
            currency={tourData?.currency}
            packageData={tourData?.variants}
            productType={tourData?.product_type}
            onChange={handleVariantSelection}
          />

          {/* SUBSECTION: Must know before you go */}
          {!isEmpty(tourData?.know_before_you_go) && (
            <TourContentCard headerTitle="Must know before you go">
              <MustKnowBeforeYouGo list={tourData?.know_before_you_go} />
            </TourContentCard>
          )}

          {/* SUBSECTION: Things to carry */}
          {!isEmpty(tourData?.things_to_carry) && (
            <TourContentCard headerTitle="Things to carry">
              <ThingsToCarry list={tourData?.things_to_carry} />
            </TourContentCard>
          )}

          {/* SUBSECTION: Tour-Map */}
          <TourMap
            startingPoint={tourData?.starting_point}
            pickupPoints={tourData?.pickup_points}
            dropPoints={tourData?.drop_points}
          />

          {/* SUBSECTION: Tour-Reviews */}
          {!isEmpty(tourData?.reviews) && (
            <TourReviewsSection data={tourData} />
          )}

          {/* SUBSECTION: Tour-FAQs */}
          <TourContentCard
            id="tour-faq"
            className="tour-faq-card"
            headerTitle={
              <>
                <div className="title-text">FAQ's</div>
                <button
                  className="btn btn__sm btn__brand-hollow view-all-btn"
                  onClick={handleViewAllFAQ}
                >
                  {tourData?.faqs?.length !== expandedFAQs.length ? (
                    <span>
                      View all <i className="pi pi-angle-down" />{" "}
                    </span>
                  ) : (
                    <span>
                      Collapse all <i className="pi pi-angle-up" />{" "}
                    </span>
                  )}
                </button>
              </>
            }
          >
            {tourData?.faqs?.length > 0 && (
              <div className="tour-faqs-wrapper">
                <Accordion
                  multiple
                  activeIndex={expandedFAQs}
                  expandIcon="pi pi-plus"
                  collapseIcon="pi pi-minus"
                >
                  {tourData?.faqs?.map((faq: IFaq, index: number) => {
                    return (
                      <AccordionTab
                        key={index}
                        header={faq.question}
                        headerClassName="faq-accordion-tab"
                      >
                        <ul className="faq-answer-list">
                          <RawHTML>{faq.answer}</RawHTML>
                        </ul>
                      </AccordionTab>
                    );
                  })}
                </Accordion>
              </div>
            )}
          </TourContentCard>

          {/* SUBSECTION: Tour-Policies */}
          <TourContentCard
            id="tour-policies"
            className="tour-policies-card"
            collapsible={true}
            headerTitle="Policies"
            headerClassName="policy-accordion-tab"
          >
            {tourData?.confirmation_policy && (
              <div className="policy-wrapper">
                <div className="policy-name">Confirmation Policy</div>
                <div className="policy-details">
                  <RawHTML>{tourData?.confirmation_policy}</RawHTML>
                </div>
              </div>
            )}

            {viewAllPolicies && (
              <>
                {tourData?.refund_policy && (
                  <div className="policy-wrapper">
                    <div className="policy-name">Refund Policy</div>
                    <div className="policy-details">
                      <RawHTML>{tourData?.refund_policy}</RawHTML>
                    </div>
                  </div>
                )}

                {tourData?.cancellation_policy && (
                  <div className="policy-wrapper">
                    <div className="policy-name">Cancellation Policy</div>
                    <div className="policy-details">
                      {tourData?.cancellation_policy.map(
                        (policy: string, index: number) => {
                          return (
                            <li key={index} className="policy-item">
                              {policy}
                            </li>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}

                {tourData?.payment_term_policy && (
                  <div className="policy-wrapper">
                    <div className="policy-name">Payment Terms Policy</div>
                    <div className="policy-details">
                      {tourData?.payment_term_policy.map(
                        (policy: string, index: number) => {
                          return (
                            <li key={index} className="policy-item">
                              {policy}
                            </li>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            <div
              className="link-btn link-btn__expand-link"
              onClick={toggleViewAllPolicies}
            >
              {viewAllPolicies ? `Collapse Policies` : `View all policies (5)`}
            </div>
          </TourContentCard>

          {/* SUBSECTION: Top Attractions */}
          {!isEmpty(tourData?.attractions_data) && (
            <TourContentCard
              headerTitle={`Top ${tourData?.product_location} Attractions`}
            >
              <AttractionsSection
                data={tourData?.attractions_data}
                location={tourData?.product_location}
              />
            </TourContentCard>
          )}

          {/* SUBSECTION: More Attractions */}
          {(!isEmpty(tourData?.sub_categories_data) ||
            !isEmpty(tourData?.attractions_data) ||
            !isEmpty(tourData?.listing_types_data)) && (
            <TourContentCard
              className="more-links-section"
              headerTitle={`More on ${tourData?.product_location}`}
              headerClassName="policy-accordion-tab"
              contentClassName="policy-accordion-content"
              collapsible={true}
            >
              <MoreLinksSection
                productLocation={tourData?.product_location}
                data={{
                  sub_categories_data: tourData?.sub_categories_data,
                  attractions_data: tourData?.attractions_data,
                  listing_types_data: tourData?.listing_types_data,
                }}
              />
            </TourContentCard>
          )}

          {/* SUBSECTION: Destination cards */}
          {!isEmpty(relatedProductsData?.related_products) &&
            relatedProductsData?.related_products.length >= 4 && (
              <TourContentCard
                className="destinations-card"
                headerTitle="Related Products"
              >
                <ProductsCarousel data={relatedProductsData.related_products} />
              </TourContentCard>
            )}
        </div>

        {/* !SECTION: Tabhighlights-section */}
      </div>

      {/* !SECTION: App-Container */}
    </div>
  );
};

export async function getStaticPaths() {
  const paths = [{ params: { tourSlug: "skydiving" } }];
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: any) {
  const res = await loadTourData(params.tourSlug);
  const relatedProductsData = await getTourRelatedProducts();

  return {
    props: { tourData: res.data, relatedProductsData },
  };
}

export default TourPage;

// Activity
//   {
//     "bookings": [
//         {
//             "booking_type": "product",
//             "product_id": 91344,
//             "variant_id": 89848,
//             "date_of_travel": "2022-09-16",
//             "time_slot": "Invalid date",
//             "inventories": [
//                 {
//                     "id": 93031,
//                     "no_of_passengers": 2
//                 }
//             ]
//         }
//     ],
//     "utm_params": {
//         "utm_campaign": null,
//         "utm_medium": null,
//         "utm_source": null,
//         "utm_term": null,
//         "utm_content": null,
//         "client": "",
//         "referer": "https://www.thrillophilia.com/cities/paris/tags/cruises-boat-tours"
//     },
//     "booked_from_domain": "www.thrillophilia.com",
//     "currency": "INR"
// }

// STAYCATION
// {
//   "bookings": [
//       {
//           "booking_type": "product",
//           "product_id": 16794,
//           "variant_id": 1369,
//           "date_of_travel": "2022-09-22",
//           "booking_end_date": "2022-09-25",
//           "inventories": [
//               {
//                   "id": 1407,
//                   "no_of_passengers": 1,
//                   "no_of_adults": 1,
//                   "no_of_children": 0
//               }
//           ]
//       }
//   ],
//   "utm_params": {
//       "utm_campaign": null,
//       "utm_medium": null,
//       "utm_source": null,
//       "utm_term": null,
//       "utm_content": null,
//       "client": "",
//       "referer": ""
//   },
//   "booked_from_domain": "www.thrillophilia.com",
//   "currency": "INR"
// }
