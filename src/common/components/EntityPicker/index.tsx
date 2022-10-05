import { capitalize } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export interface ICustomer {
  title: string;
  count?: number;
  offset?: number;
  description?: string;
  lowerLimit?: number;
  upperLimit?: number;
  showLimits?: boolean;
  onChange?: (arg0: any) => void;
}
export interface IStickyBookingCardItems {
  adult?: ICustomer;
  couple?: ICustomer;
  kids?: ICustomer;
}
export interface IEntityItem {
  item: ICustomer;
  onChange: (arg0: any) => void;
}
export interface IEntityPicker {
  data: IStickyBookingCardItems;
  onChange: (data: any) => void;
}

function EntityItem(props: IEntityItem) {
  const {
    item: { title, description, count, lowerLimit, upperLimit, offset },
    onChange,
  } = props;
  const [itemCount, setItemCount] = useState(count || lowerLimit || 0);

  const increment = (offset: number = 1) => {
    let newValue = itemCount + offset;

    if (upperLimit && newValue > upperLimit) return;
    setItemCount(newValue);
    handleOnChange();
  };

  const decrement = (offset: number = 1) => {
    let newValue = itemCount - offset;
    if (newValue < (lowerLimit || 0)) return;
    setItemCount(newValue);
    handleOnChange();
  };

  const handleOnChange = () => {
    onChange({
      title,
      description,
      count: itemCount,
      lowerLimit,
      upperLimit,
      offset,
    });
  };

  return (
    <div className="entity-item">
      <div className="entity-item-left">
        <div className="entity-name">{capitalize(title)}</div>
        {description && <div className="entity-description">{description}</div>}
      </div>
      <div className="entity-item-right">
        <div className="entity-counter">
          <span
            className={`count-op ${
              itemCount > (lowerLimit || 0) ? "count-op__active" : ""
            }`}
            onClick={() => decrement(offset)}
          >
            <AiOutlineMinus size={20} />
          </span>
          <span className="entity-count">{itemCount}</span>
          <span
            className={`count-op ${
              upperLimit && itemCount >= upperLimit ? "" : "count-op__active"
            }`}
            onClick={() => increment(offset)}
          >
            <AiOutlinePlus size={20} />
          </span>
        </div>
      </div>
    </div>
  );
}

function EntityPicker(props: IEntityPicker) {
  const { data, onChange } = props;
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => {
    setFocused(false);
    document.removeEventListener("mousedown", checkForOutsideClick);
  };

  const checkForOutsideClick = (e: any) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setFocused(false);
    }
  };

  const handleEntityItemChange = (entityItemData: any) => {
    data[entityItemData.title] = entityItemData;
    onChange(data);
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkForOutsideClick);
    return () => {
      document.removeEventListener("mousedown", checkForOutsideClick);
    };
  }, [data, handleEntityItemChange]);

  return (
    <div ref={containerRef} className="entity-picker-container">
      {/* <input
        ref={inputRef}
        className="entity-picker-input"
        type="text"
        onClick={onFocus}
        onFocus={onFocus}
        value={Object.keys(data)
          .map((key: any) => `${data[key].count} ${data[key].title}`)
          .join(" ")}
        disabled
        // onBlur={onBlur}
      /> */}
      <div
        ref={inputRef}
        className="entity-picker-input clickable"
        onClick={onFocus}
        onBlur={onBlur}
      >
        {data &&
          Object.keys(data)
            .filter((item) => data[item].count)
            .map(
              (key: any) => `${data[key].count} ${capitalize(data[key].title)}`
            )
            .join(" ")}
      </div>

      {focused && (
        <div className="entity-picker-wrapper">
          <div className="entity-items-wrapper" onClick={onFocus}>
            {data &&
              Object.keys(data).map((dataItem: string, index: number) => {
                return (
                  <EntityItem
                    key={index}
                    item={data[dataItem]}
                    onChange={handleEntityItemChange}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default EntityPicker;
