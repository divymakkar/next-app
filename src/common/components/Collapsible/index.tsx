import { Accordion, AccordionTab } from "primereact/accordion";
import React, { useState, useEffect } from "react";

function Collapsible(props: { children: any; isOpen: boolean }) {
  const { children, isOpen } = props;
  const [activeIndex, setActiveIndex] = useState<number | number[] | null>(
    null
  );
  useEffect(() => {
    setActiveIndex(isOpen ? [0] : []);
  }, [isOpen]);

  return (
    <div className="collapsible-container">
      <Accordion
        multiple
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <AccordionTab>{children}</AccordionTab>
      </Accordion>
    </div>
  );
}

export default Collapsible;
