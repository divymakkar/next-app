import { IReview } from "@/interfaces/TourPage.interface";
import { isEmpty, sum } from "lodash";
import moment from "moment";
import Image from "next/image";
import { ProgressBar } from "primereact/progressbar";
import React, { Suspense, useState } from "react";
import ScrollGallery from "../ScrollGallery";
import StarRating from "../StarRating";
import TourContentCard from "../TourContentCard";
import { IGalleryMediaObj } from "@/interfaces/TourPage.interface";
import Collapsible from "../Collapsible";

function TourReviewsSection(props: { data: any }) {
  const { data } = props;
  const [lightBox, setLightBox] = useState({ opened: false, mediaIndex: 0 });

  const handleLightBoxOpen = (index: number) =>
    setLightBox({ opened: true, mediaIndex: index });
  const handleLightBoxClose = () =>
    setLightBox({
      opened: false,
      mediaIndex: 0,
    });

  const reviewImages: IGalleryMediaObj[] = [];

  data?.reviews?.forEach((review: IReview) => {
    if (!isEmpty(review?.gallery_media))
      reviewImages.push(...review?.gallery_media);
  });

  const totalRatings = sum(
    data && Object.values(data.reviews_with_rating_count)
  );

  const [imagesToView, setImagesToView] = useState<IGalleryMediaObj[]>([]);
  const handleImagePreview = (imageDataArray: IGalleryMediaObj[]) => {
    setImagesToView(imageDataArray);
    handleLightBoxOpen(0);
  };

  return (
    <>
      {lightBox.opened && (
        <Suspense fallback={<>Loading..</>}>
          <ScrollGallery
            media={
              imagesToView &&
              imagesToView.map((imageObj: IGalleryMediaObj) => ({
                sources: {
                  gridGallerySrc: imageObj?.media_urls?.ui_gallery,
                },
              }))
            }
            currentMedia={lightBox.mediaIndex}
            onCloseRequest={handleLightBoxClose}
          />
        </Suspense>
      )}
      <TourContentCard
        id="tour-reviews"
        className="tour-reviews-card"
        headerTitle={`Ratings & Reviews (${data.review_count})`}
      >
        <div className="tour-reviews-wrapper">
          <div className="review-head">
            <div className="review-head-left">
              <div className="rating-stats">
                <div className="rating-box">
                  <div className="rating-number">
                    <span className="current-rating">{data.rating} </span>
                    <span className="total-rating">/5</span>
                  </div>
                  <div className="rating-stars">
                    <StarRating rating={data.rating} />
                  </div>
                  <div className="rating-vs-reviews">
                    <div className="stat">
                      <p className="stat-name">Ratings</p>
                      <div className="stat-count">Todo</div>
                    </div>
                    <div className="stat">
                      <p className="stat-name">Reviews</p>
                      <div className="stat-count">{data.review_count}</div>
                    </div>
                  </div>
                </div>
                <div className="rating-bars">
                  {Array(5)
                    .fill(0)
                    .map((i, index: number) => {
                      return (
                        <div key={index} className="rating-progress-line">
                          <div className="side-value">
                            {5 - index}
                            <i className="pi pi-star-fill" />
                          </div>
                          <ProgressBar
                            value={
                              (data.reviews_with_rating_count[5 - index] /
                                totalRatings) *
                              100
                            }
                            showValue={false}
                          />
                          <div className="side-value">
                            {data.reviews_with_rating_count[5 - index] || 0}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="review-head-right">
              <TourContentCard
                headerTitle="Share your experience"
                className="write-a-review-card"
              >
                <div className="content">
                  Got feedback? We’d love to hear it! You can leave us a review.
                </div>
                <button className="btn btn__lg btn__brand-filled">
                  Write a review
                </button>
              </TourContentCard>
            </div>
          </div>

          <div className="review-image-gallery">
            {reviewImages?.length > 0 && (
              <div className="content-card-item">
                <div className="title">Traveller Image Gallery</div>
                <div className="review-gallery-wrapper">
                  <div
                    className="review-image-container display-image"
                    onClick={() => handleImagePreview(reviewImages)}
                  >
                    <Image
                      src={reviewImages[0]?.media_urls?.ui_gallery}
                      alt="review-image"
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={reviewImages[0]?.media_urls?.placeholder}
                    />
                  </div>
                  <div className="column-prop-image-wrap">
                    {reviewImages
                      .slice(1, 3)
                      .map((imageData: IGalleryMediaObj, index: number) => {
                        return (
                          <div
                            key={index}
                            className="review-image-container column-prop-image"
                            onClick={() => handleImagePreview(reviewImages)}
                          >
                            <Image
                              src={imageData?.media_urls?.ui_gallery}
                              placeholder="blur"
                              blurDataURL={imageData?.media_urls?.placeholder}
                              alt="review-image"
                              layout="fill"
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div
                    className="row-prop-image-wrap"
                    onClick={() => handleLightBoxOpen(0)}
                  >
                    {reviewImages
                      .slice(1, reviewImages.length)
                      .map((imageData: IGalleryMediaObj, index: number) => {
                        return (
                          <div
                            key={index}
                            className="review-image-container row-prop-image"
                          >
                            <Image
                              src={imageData?.media_urls?.ui_gallery}
                              placeholder="blur"
                              blurDataURL={imageData?.media_urls?.placeholder}
                              alt="review-image"
                              layout="fill"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="content-card-item review-highlights-card">
            <div className="title">Hear From Travellers</div>
            <div className="review-highlights-wrapper">
              <div className="review-highlight review-highlight__green">
                Good Experience (67)
              </div>
              <div className="review-highlight review-highlight__yellow">
                Stay was okay (45)
              </div>
              <div className="review-highlight review-highlight__red">
                No Travel Guide (7)
              </div>
              <div className="review-highlight review-highlight__green">
                Amazing Food (56)
              </div>
              <div className="review-highlight review-highlight__green">
                Good Staff (26)
              </div>
              <div className="review-highlight review-highlight__green">
                Best in Goa (96)
              </div>
              <div className="review-highlight review-highlight__green">
                Clean rooms (57)
              </div>
              <div className="review-highlight review-highlight__green">
                Good Hotel Location (256)
              </div>
            </div>
          </div>

          <div
            id="all-reviews"
            className="content-card-item all-reviews-wrapper"
          >
            <div className="all-reviews-head">
              <div className="title">Total Reviews: {data.review_count}</div>
              <div className="all-reviews-cta">
                <button className="btn btn__sm btn__basic">
                  <i className="pi pi-filter" />
                  Filter
                </button>
                <button className="btn btn__sm btn__basic">
                  <i className="pi pi-sort-amount-down" />
                  Sort
                </button>
              </div>
            </div>
            <div className="all-reviews-cards">
              <div className="left-column">
                {data.reviews
                  .filter((review: IReview, index: number) => index % 2 === 1)
                  .map((review: IReview, index: number) => {
                    return (
                      <ReviewCard
                        key={`left-${index}`}
                        review={review}
                        handleImagePreview={handleImagePreview}
                      />
                    );
                  })}
              </div>
              <div className="right-column">
                {data.reviews
                  .filter((review: IReview, index: number) => index % 2 === 0)
                  .map((review: IReview, index: number) => {
                    return (
                      <ReviewCard
                        key={`right-${index}`}
                        review={review}
                        handleImagePreview={handleImagePreview}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </TourContentCard>
    </>
  );
}

const ReviewCard = (props: { review: IReview; handleImagePreview?: any }) => {
  const { review, handleImagePreview } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="all-review-card tour-review-card tour-review-card__sm">
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
            <div className="reviewed-at">
              Reviewed: {moment(review.created_at).format("DD MMM YYYY")}
            </div>
          </div>
          <div className="user-name-wrapper-right">
            <div className="rating-quote"></div>
            <div className="rating-value rating-value__high">
              {`${review.rating}/5`}
            </div>
          </div>
        </div>
        <div className="user-review-wrapper">
          <div className="user-comment">{review.review_content}</div>
          <div className="user-posts-wrapper">
            {review.gallery_media
              .slice(0, 4)
              .map((imageData: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="user-post clickable"
                    onClick={() => handleImagePreview(review?.gallery_media)}
                  >
                    <Image
                      src={imageData?.media_urls?.thumbnail}
                      placeholder="blur"
                      blurDataURL={imageData?.media_urls?.placeholder}
                      layout="fill"
                      alt="user-post"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourReviewsSection;
