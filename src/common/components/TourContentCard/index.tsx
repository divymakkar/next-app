import { Accordion, AccordionTab } from "primereact/accordion";
import React, { ReactNode } from "react";

function TourContentCard(props: {
  children: ReactNode;
  collapsible?: boolean;
  ref?: any;
  id?: string;
  className?: string;
  headerTitle?: string | ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  showCollapsed?: boolean;
}) {
  const {
    children,
    collapsible,
    id,
    ref,
    className,
    headerTitle,
    headerClassName,
    contentClassName,
    showCollapsed,
  } = props;
  return children ? (
    <div
      id={id}
      ref={ref}
      className={`${
        collapsible ? "collapsible-accordion" : ""
      } tour-content-card ${className || ""}`}
    >
      {collapsible ? (
        <Accordion
          activeIndex={showCollapsed ? [-1] : [0]}
          expandIcon="pi pi-angle-down"
          collapseIcon="pi pi-angle-up"
          multiple
        >
          <AccordionTab header={headerTitle} headerClassName={headerClassName}>
            <div className={contentClassName}> {children}</div>
          </AccordionTab>
        </Accordion>
      ) : (
        <>
          <div className={`card-title ${headerClassName || ""}`}>
            {headerTitle}
          </div>
          <div className={contentClassName}> {children}</div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}

export default TourContentCard;
