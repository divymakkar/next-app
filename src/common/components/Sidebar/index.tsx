import React, { ReactNode, useState } from "react";
import { Sidebar } from "primereact/sidebar";

function SideBar(props: {
  header: ReactNode;
  className?: string;
  children?: any;
  visibleRight: boolean;
  setVisibleRight: (arg0: boolean) => void;
}) {
  const { header, className, children, visibleRight, setVisibleRight } = props;

  return (
    <div className="custom-sidebar">
      <Sidebar
        className={`sidebar-container ${className || ""}`}
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <div className="custom-sidebar-header">
          <div
            className="custom-close-btn"
            onClick={() => setVisibleRight(false)}
          >
            <img src="/icons/right-arrow.svg" alt="close" />
          </div>
          <div className="header">{header}</div>
        </div>
        <div className="custom-sidebar-content">{children}</div>
      </Sidebar>
    </div>
  );
}

export default SideBar;
