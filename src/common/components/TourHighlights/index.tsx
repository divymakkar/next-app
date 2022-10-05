import React from "react";
import RawHTML from "../RawHTML";

function TourHighlights(props: {
  highlightList: string[];
  toggleHighlightShow: () => void;
  highlightsToShow?: number;
  showViewMore?: boolean;
}) {
  const { highlightList, toggleHighlightShow, highlightsToShow, showViewMore } =
    props;
  return (
    <div className="tour-highlights-card">
      <ul className="highlights-list">
        {highlightList
          .slice(0, highlightsToShow || highlightList.length)
          .map((highlight, index) => {
            return (
              <li key={index} className="brand-li">
                <RawHTML>{highlight}</RawHTML>
              </li>
            );
          })}
        {showViewMore && (
          <span
            className="link-btn link-btn__expand-link"
            onClick={toggleHighlightShow}
          >
            View complete details{" "}
          </span>
        )}
      </ul>
    </div>
  );
}

export default TourHighlights;
