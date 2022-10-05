import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { floor } from "lodash";

function StarRating({ rating, total = 5 }: { rating: number; total?: number }) {
  const halfStarPresent = floor(rating) !== rating;
  const size = 15;
  return (
    <div className="star-rating">
      {Array(floor(rating))
        .fill(0)
        .map((item, index) => {
          return (
            <BsStarFill
              key={`filled-${index}`}
              size={size}
              className="star star__filled"
            />
          );
        })}

      {halfStarPresent && (
        <BsStarHalf className="star star__filled" size={size} />
      )}

      {Array(floor(total - rating))
        .fill(0)
        .map((item, index) => {
          return (
            <BsStar
              key={`hollow-${index}`}
              size={size}
              className="star star__hollow"
            />
          );
        })}
    </div>
  );
}

export default StarRating;
