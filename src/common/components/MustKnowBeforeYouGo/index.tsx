import { isEmpty } from "lodash";
import React, { useState } from "react";
import Collapsible from "../Collapsible";

function MustKnowBeforeYouGo(props: { list: string[] }) {
  const { list } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="must-know__container">
      {!isEmpty(list) && (
        <ul className="must-know__ul">
          {list.slice(0, 4).map((listItem: string, index: number) => {
            return (
              <li key={index} className="must-know__li brand-li">
                {listItem}
              </li>
            );
          })}
        </ul>
      )}
      {!isEmpty(list) && (
        <Collapsible isOpen={isOpen}>
          <ul className="must-know__ul">
            {list
              .slice(4, list.length)
              .map((listItem: string, index: number) => {
                return (
                  <li key={index} className="must-know__li brand-li">
                    {listItem}
                  </li>
                );
              })}
          </ul>
        </Collapsible>
      )}
      <span
        className="link-btn link-btn__expand-link"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            Hide details <i className="pi pi-angle-up" />
          </>
        ) : (
          <>
            View all details <i className="pi pi-angle-down" />
          </>
        )}
      </span>
    </div>
  );
}

export default MustKnowBeforeYouGo;
