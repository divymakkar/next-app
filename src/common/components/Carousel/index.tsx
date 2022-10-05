import { classNames } from "primereact/utils";
import React, { ReactNode, useRef, useState } from "react";
import Slider from "react-slick";

function Carousel(props: {
  className?: string;
  settings?: {
    infinite?: boolean;
    initialSlide?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    centerMode?: boolean;
    centerPadding?: string;
  };
  children: ReactNode;
  childrenCount: number;
}) {
  const { className, settings, children, childrenCount } = props;

  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [showNext, setShowNext] = useState<boolean>(true);

  const slidesToShow = settings?.slidesToShow || 3;
  const carouselSettings = {
    infinite: false,
    initialSlide: 0,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    ...settings,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setShowPrev(true);
      setShowNext(true);
      if (newIndex === 0) setShowPrev(false);
      if (newIndex === childrenCount - slidesToShow) {
        setShowNext(false);
      }
    },
  };

  const sliderRef = useRef<any>();
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };
  const gotoPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className={`carousel-container ${className || ""}`}>
      <Slider ref={sliderRef} {...carouselSettings}>
        {children}
      </Slider>
      <div className="carousel-arrows">
        {showPrev && (
          <div
            className="carousel-arrow carousel-arrow__prev"
            onClick={gotoPrev}
          >
            <img
              className="carousel-arrow-img"
              src="/icons/slick-arrow-right.svg"
              alt="prev"
            />
          </div>
        )}

        {showNext && (
          <div>
            <div
              className="carousel-arrow carousel-arrow__next"
              onClick={gotoNext}
            >
              <img
                className="carousel-arrow-img"
                src="/icons/slick-arrow-right.svg"
                alt="next"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carousel;
