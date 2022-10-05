import { IReview } from "@/interfaces/TourPage.interface";
import { scrollTo } from "@/utils/document";
import Image from "next/image";
import React, { useRef } from "react";
import Slider from "react-slick";
import TourContentCard from "../TourContentCard";

function ReviewsCarousel(props: { reviews: IReview[] }) {
  const { reviews } = props;
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  const ref = useRef();

  const goToNext = () => ref.current?.slickNext();
  const goToPrev = () => ref.current?.slickPrev();

  return (
    <TourContentCard className="tour-reviews-card">
      <div className="tour-reviews-card-top">
        <div className="reviews-carousel">
          <Slider ref={ref} {...carouselSettings}>
            {reviews.map((review: IReview, index: number) => {
              return (
                <div key={index} className="tour-review-card">
                  <div className="tour-review-card-content">
                    <div className="user-avatar">
                      <Image
                        src={review.customer_profile_image_url}
                        layout="fill"
                        alt="user-avatar"
                      />
                    </div>
                    <div className="user-name-wrapper">
                      <div className="user-name-wrapper-left">
                        <div className="username">{review.customer_name}</div>
                        <div className="reviewed-at"></div>
                      </div>
                      <div className="user-name-wrapper-right">
                        <div className="rating-quote"></div>
                        <div className="rating-value rating-value__high">
                          {`${review.rating}/5`}
                        </div>
                      </div>
                    </div>
                    <div className="user-review-wrapper">
                      <div className="user-comment">
                        {review.review_content.substring(0, 200)}

                        {review.review_content.length > 200 && (
                          <>
                            ...
                            {/* <span
                              className="btn link-btn"
                              onClick={() => scrollTo("tour-reviews", 160)}
                            >
                              {" "}
                              read more
                            </span> */}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="carousel-arrows">
          <span onClick={goToPrev}>
            <img src="/icons/angle-left.svg" alt="<" />
          </span>
          <span onClick={goToNext}>
            <img src="/icons/angle-left.svg" alt=">" />
          </span>
        </div>
      </div>
      <div
        className="tour-reviews-view-all btn link-btn link-btn__expand-link"
        onClick={() => scrollTo("tour-reviews", 160)}
      >
        View All Reviews({reviews.length})
      </div>
    </TourContentCard>
  );
}

export default ReviewsCarousel;
