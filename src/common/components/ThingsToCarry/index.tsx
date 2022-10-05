import { isEmpty } from "lodash";
import React from "react";

interface listItem {
  name: string;
  is_mandatory: boolean;
}

function ThingsToCarry(props: { list: listItem[] }) {
  const { list } = props;
  const mandatoryItems = list.filter(
    (item: listItem) => item.is_mandatory === true
  );
  const optionalItems = list.filter(
    (item: listItem) => item.is_mandatory === false
  );

  return (
    <div className="things-to-carry-container">
      {!isEmpty(mandatoryItems) && (
        <div className="group">
          <div className="group-title">Mandatory</div>
          <div className="group-items">
            {mandatoryItems.map((item: listItem, index: number) => {
              return (
                <div key={index} className="group-item">
                  <div className="group-item-icon">
                    <img src="/icons/TTC/TTC-doc.svg" alt="item" />
                  </div>
                  <div className="group-item-name">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!isEmpty(optionalItems) && (
        <div className="group">
          <div className="group-title">Optional</div>
          <div className="group-items">
            {optionalItems.map((item: listItem, index: number) => {
              return (
                <div key={index} className="group-item">
                  <div className="group-item-icon">
                    <img src="/icons/TTC/TTC-warm-clothes.svg" alt="item" />
                  </div>
                  <div className="group-item-name">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThingsToCarry;
