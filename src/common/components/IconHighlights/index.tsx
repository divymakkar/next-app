import { toLower } from "lodash";
import React from "react";

interface IHighlightMap {}
const highlightsMapping: IHighlightMap = {
  "instant confirmation": "/icons/clock.svg",
  "hotel pickup": "/icons/car-pickup.svg",
  "camping included": "/icons/camping.svg",
  "honeymoon freebies": "/icons/freebies.svg",
  "meals included": "/icons/meal.svg",
};

function IconHighlights(props: {
  highlights: string[];
  highlightsToShow?: number;
  toggleHighlightShow?: () => void;
}) {
  const { highlights, highlightsToShow, toggleHighlightShow } = props;
  return (
    <div className="icon-highlights-container">
      {highlights
        ?.slice(0, highlightsToShow || highlights?.length)
        .map((highlight, index: number) => {
          return (
            <div key={index} className="highlight-icon-wrap">
              <img
                className="highlight-icon"
                src={
                  highlightsMapping[highlight as keyof IHighlightMap] ||
                  "/icons/meal.svg"
                }
                alt="highlight"
              />
              <span className="highlight-title">{highlight}</span>
            </div>
          );
        })}

      {highlightsToShow &&
        highlightsToShow > 0 &&
        highlightsToShow < highlights?.length && (
          <div
            className="highlight-icon-wrap see-all"
            onClick={toggleHighlightShow}
          >
            <img
              className="highlight-icon highlight-icon__btn"
              src="/icons/double-down-arrow.svg"
              alt=""
            />
            <span className="highlight-title">See All (28)</span>
          </div>
        )}
    </div>
  );
}

export default IconHighlights;
