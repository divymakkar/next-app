import type { NextPage } from "next";
import { loadOrderData } from "@/lib/load-order-data";
import CollectionBannerSection from "@/components/CollectionBanner";
import CollectionCard from "@/components/CollectionCard";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { uniqWith } from "lodash";
import {
  getCountryCallingCode,
  getCountries,
} from "react-phone-number-input/input";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import collection from "@/utils/collection";
import EnquiryForm from "@/components/EnquiryForm";

interface CollectionData {
  name: string;
  collection_tours: any[];
  popular_tags?: any[];
  new_ui_images: any;
}
const CollectionPage: NextPage<{}> = ({ params }: any) => {
  const [openMobileEnquiryForm, setMobileOpenEnquiryForm] = useState(false);
  const [openEnquiryForm, setOpenEnquiryForm] = useState(false);
  const [openSubmitPopup, setOpenSubmitPopup] = useState(false);
  const [collectionData, setCollectionData] = useState<CollectionData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.screen.width <= 720) {
      setIsMobile(!isMobile);
    }
    console.log(params);
    collection.get(params.collectionsSlug).then((response: any) => {
      console.log(response.data);
      setCollectionData(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      const firstCard = document
        .querySelectorAll(".tour-main-card")[0]
        ?.getBoundingClientRect();
      const lastCard = Array.from(document.querySelectorAll(".tour-main-card"))
        .pop()
        ?.getBoundingClientRect();
      const element = document.querySelector(".sidebar-sticky-element");
      if (firstCard && firstCard.top + 500 >= 0) {
        element?.classList.remove("stickyMode");
      } else if (lastCard && lastCard.top < 100) {
        element?.classList.remove("stickyMode");
        element?.classList.add("stickBottom");
      } else {
        element?.classList.add("stickyMode");
        element?.classList.remove("stickBottom");
      }
    });
  });

  return (
    // WRAP: Collection Page
    <div className="page-container">
      {!isLoading && 
       <div>
          {collectionData && (
            <CollectionBannerSection
              title={collectionData.name}
              imageSrc={
                collectionData?.new_ui_images?.new_ui_main_card_full_width
                  ?.fallback_img_src
              }
            />
          )}
          <section className="section main-content-section">
            <div className="container">
              <div className="content tour-section">
                {collectionData &&
                  collectionData.collection_tours.map(
                    (collection_tour: any) => {
                      return (
                        <CollectionCard
                          tour={collection_tour}
                          onButtonClick={() => {
                            isMobile
                              ? setMobileOpenEnquiryForm(!openMobileEnquiryForm)
                              : setOpenEnquiryForm(!openEnquiryForm);
                          }}
                        />
                      );
                    }
                  )}
              </div>
              <aside className="sidebar-container mobile-hidden">
                <div
                  className="sidebar-sticky-element"
                  id="sidebar-sticky-element"
                >
                  <div
                    className="aside-item lead-form-container with-image"
                    id="sidebar-lead-form-container"
                  >
                    <div className="base-block-head aside-form-head">
                      <span className="form-head">
                        Enquire &amp; Get Upto 40% Off On International Tours
                      </span>
                    </div>
                    <img
                      className="lazy-image lead-form-img lazy-image-loaded"
                      sizes="100vw"
                      data-src="https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg"
                      data-srcset="https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg 1024w, https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg 768w, https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg 320w"
                      src="https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg"
                      srcSet="https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg 1024w, https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg 768w, https://images.thrillophilia.com/image/upload/s--pS2hkmHJ--/c_fill,g_center,h_150,q_auto,w_300/f_auto,fl_strip_profile/v1/images/photos/000/173/923/original/1570812906_christopher-alvarenga-IibRZfGCM10-unsplash.jpg.jpg 320w"
                    />
                    <EnquiryForm
                      collectionSlug={params.collectionsSlug}
                      onSubmitForm={() => {
                        setOpenSubmitPopup(!openSubmitPopup);
                      }}
                    />
                  </div>
                </div>
              </aside>
            </div>
          </section>

          <section className="section more-things-section">
            {collectionData?.popular_tags && (
              <div className="container">
                <div className="main-caption-section">
                  <h2 className="section-heading h6">
                    Popular on Thrillophilia
                  </h2>
                </div>
                <div className="base-block">
                  <div className="base-block-body">
                    <div className="btn-holder">
                      {collectionData?.popular_tags &&
                        collectionData?.popular_tags
                          .sort((a, b) => b.priority - a.priority)
                          .map((tag) => {
                            return (
                              <a
                                href={tag.redirect_url}
                                target="_blank"
                                className="btn transparent"
                              >
                                {tag.title}
                              </a>
                            );
                          })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <Dialog
            visible={openMobileEnquiryForm}
            style={{ width: "80vw" }}
            modal
            onHide={() => {
              setMobileOpenEnquiryForm(!openMobileEnquiryForm);
            }}
          >
            <div className="enquiry-form">
              <div className="form-col">
                <div className="customer-details-form-group">
                  <EnquiryForm
                    collectionSlug={params.collectionsSlug}
                    onSubmitForm={() => {
                      setMobileOpenEnquiryForm(!openMobileEnquiryForm);
                      setOpenSubmitPopup(!openSubmitPopup);
                    }}
                  />
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            header="Superb Choice!"
            visible={openEnquiryForm}
            style={{ width: "45vw" }}
            modal
            onHide={() => {
              setOpenEnquiryForm(!openEnquiryForm);
            }}
            className="enquiry-popup"
          >
            <div className="enquiry-form">
              <div className="form-col">
                <form className="new_lead_form_enquiry">
                  <div className="customer-details-form-group">
                    <EnquiryForm
                      collectionSlug={params.collectionsSlug}
                      onSubmitForm={() => {
                        setOpenEnquiryForm(!openEnquiryForm);
                        setOpenSubmitPopup(!openSubmitPopup);
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
      <Dialog
        visible={true}
        style={{ width: "28vw" }}
        modal
        onHide={() => {
          setOpenEnquiryForm(!openEnquiryForm);
        }}
      >
       <div className="popup-msg">
      <div className="logo-holder">
        <span className="icon-checked"></span>
      </div>
      <div className="thank-header">Thank You!</div>
      <p className="thank-text">Your enquiry has been received successfully. Our destination expert will reach out to you soon!</p>
      <a href="javascript:void(0)" className="close icon-cancel-music"></a>
    </div> 
      </Dialog>
      
      </div>};
    </div>)
};

// Functions
export async function getServerSideProps({ params }: any) {
  return {
    props: { params },
  };
}

export default CollectionPage;
