import { formattedPrice } from "@/utils/tour";
import React from "react";

function PriceTag(props: {
  currency: string;
  striked?: number;
  current: number;
  leastPricedInventory?: string;
  size?: "md" | "lg";
}) {
  const { currency, striked, current, leastPricedInventory, size } = props;
  return (
    <div
      className={`price-tag-container price-tag-container__${
        size ? size : "md"
      }`}
    >
      {striked && (
        <div className="price price__striked">{`${currency} ${formattedPrice(
          striked
        )}`}</div>
      )}
      <div className="price price__current">{`${currency} ${formattedPrice(
        current
      )}`}</div>
      {leastPricedInventory && (
        <div className="price price__least-priced-inventory">
          {`Per ${leastPricedInventory}`}
        </div>
      )}
    </div>
  );
}

export default PriceTag;
