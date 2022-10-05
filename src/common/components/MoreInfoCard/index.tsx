import React from "react";
import { Tooltip } from "primereact/tooltip";

const MoreInfoCard = ({ targetClass, content, isBulleted = true }: {
  targetClass: string,
  content?: string[],
  isBulleted?: boolean,
}) => {
  return (
    <div className="more-info-card-container">
      <Tooltip
        target={`.${targetClass}`}
        position="top"
      >
        <div className="more-info-card">
          {isBulleted ? (
            <ul>
              {content && content.map((contentData, index) => {
                return (
                  <li key={index} className="more-info-card-content">
                    {contentData}
                  </li>
                )
              }
              )}
            </ul>
          ) : (
            <div>

              <div className="more-info-card-content">
                {content?.join(" ")}
              </div>
            </div>
          )}
        </div>
      </Tooltip >
    </div>
  );
};

export default MoreInfoCard;

