import React, { Suspense, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import ScrollGallery from "../ScrollGallery";

function TourBanner(props: { featuredMedia: any; galleryMedia: any }) {
  const { featuredMedia, galleryMedia } = props;

  const SlickArrow = (props: {
    type: string;
    className: string;
    onClick: any;
  }) => {
    const { type, className, onClick } = props;
    return type === "prev" ? (
      <div
        {...props}
        className={`slick-arrow-wrapper ${className}`}
        onClick={onClick}
      >
        <i className="pi pi-angle-left" />
        {/* <GrPrevious color="white" size={20} /> */}
      </div>
    ) : (
      <div
        {...props}
        className={`slick-arrow-wrapper ${className}`}
        onClick={onClick}
      >
        <i className="pi pi-angle-right" />
        {/* <GrNext color="white" size={20} /> */}
      </div>
    );
  };

  const carouselSettings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "60px",
    centerMode: true,
    variableWidth: true,
    // autoplay: true,
    // autoplaySpeed: 5000,
    // cssEase: "linear",
    draggable: true,
    arrows: true,
  };
  const sliderRef = useRef();
  const gotoNext = () => sliderRef.current.slickNext();
  const gotoPrev = () => sliderRef.current.slickPrev();

  const [lightBox, setLightBox] = useState({ opened: false, mediaIndex: 0 });

  const handleLightBoxOpen = (index: number) =>
    setLightBox({ opened: true, mediaIndex: index });

  const handleLightBoxClose = () =>
    setLightBox({
      opened: false,
      mediaIndex: 0,
    });

  return featuredMedia && galleryMedia ? (
    <div className="tour-banner">
      {lightBox.opened && (
        <Suspense fallback={<>Loading..</>}>
          <ScrollGallery
            media={[
              featuredMedia.media_urls.ui_gallery,
              ...galleryMedia.map((media: any) => media.media_urls.ui_gallery),
            ].map((url: string) => ({
              sources: {
                gridGallerySrc: url,
              },
            }))}
            currentMedia={lightBox.mediaIndex}
            onCloseRequest={handleLightBoxClose}
          />
        </Suspense>
      )}

      <div className="tour-banner-highlight-container">
        <button
          className="btn btn__sm btn__white media-gallery-btn"
          onClick={() => handleLightBoxOpen(0)}
        >
          {/* <img src="/icons/image-gallery.svg" alt="img-gallery" />  */}
          View all (114)
        </button>

        <div className="banner-carousel">
          <Slider
            ref={sliderRef}
            {...carouselSettings}
            className="tour-banner-slide"
          >
            {[featuredMedia, ...galleryMedia].map(
              (imageData: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="tour-banner-images-wrapper"
                    onClick={() => handleLightBoxOpen(0)}
                  >
                    <Image
                      src={imageData?.media_urls?.original}
                      layout="fill"
                      className="tour-banner-image"
                      alt="banner-image"
                      placeholder="blur"
                      blurDataURL={imageData?.media_urls?.placeholder}
                      priority={index === 1}
                    />
                  </div>
                );
              }
            )}
          </Slider>
          <div className="banner-slick-arrow-wrapper">
            <SlickArrow
              className="banner-slick-arrow banner-slick-arrow__prev"
              type="prev"
              onClick={gotoPrev}
            />
            <SlickArrow
              className="banner-slick-arrow banner-slick-arrow__right"
              type="next"
              onClick={gotoNext}
            />
          </div>
        </div>
        <div
          className="banner-display-image"
          onClick={() => handleLightBoxOpen(0)}
        >
          <Image
            src={featuredMedia?.media_urls?.original}
            layout="fill"
            className="tour-banner-image"
            placeholder="blur"
            blurDataURL={featuredMedia?.media_urls?.placeholder}
            alt="banner-image"
            priority
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="tour-banner">
      <div className="tour-banner-images-wrapper"></div>
    </div>
  );
}

export default TourBanner;

// media={
//   gallery_media && [featured_media, ...gallery_media].length > 0
//     ? [featured_media, ...gallery_media].map((media: any) => {
//         return {
//           sources: {
//             gridGallerySrc: media.media_urls.ui_gallery,
//             lightboxSrc: isMobile
//               ? media.media_urls.mobile_web_gallery
//               : media.media_urls.ui_gallery,
//           },
//           caption: media.caption,
//         };
//       })
//     : [""]
// }
