import { RiShieldStarFill } from "react-icons/ri";

const ProductSubHeading = (props: {
  rating: number;
  reviews: number;
  location?: string;
}) => {
  const { rating, reviews, location } = props;

  return (
    <div className="product-sub-heading">
      <div className="product-rating">
        <img className="rating-star" src="/icons/rating-star.svg" alt="star" />
        <span> {rating?.toFixed(1)}</span>
      </div>
      <div className="product-reviews">{reviews}+ Reviews</div>
      {location && (
        <div className="product-location">
          <img src="/icons/location-icon.svg" alt="location" />
          <span>{location}</span>
        </div>
      )}
    </div>
  );
};

export default ProductSubHeading;
