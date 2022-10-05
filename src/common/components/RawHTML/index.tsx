import React from "react";
import DOMPurify from "isomorphic-dompurify";

const RawHTML = ({
  children,
  className,
  itemProp,
}: {
  children: string;
  className?: string;
  itemProp?: string;
}): JSX.Element => (
  <div
    itemProp={itemProp}
    className={`raw-html-container ${className || ""}`}
    /* eslint-disable react/no-danger */
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(children)
        .replace("<img src", "<img loading='lazy' src")
        .replace(/\n/g, "<br />"),
    }}
    /* eslint-enable */
  />
);

export default RawHTML;
