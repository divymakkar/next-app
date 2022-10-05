import React from "react";
import MoreInfoCard from "../MoreInfoCard";
import { isEmpty } from "lodash";
import { Checkbox } from "primereact/checkbox";

const CheckBoxOption = (props: {
  title: string;
  id: string;
  onCheck: () => void;
  state: boolean;
  showToolTip?: boolean;
  moreInfo?: string[];
  className?: string;
}) => {
  const { title, className, moreInfo, id, showToolTip } = props;
  return (
    <div className={`check-box-option ${className || ""}`}>
      <div className="field-checkbox">
        <Checkbox
          inputId={id}
          name={id}
          value={id}
          onChange={props.onCheck}
          checked={props.state}
        />
        <label htmlFor={id}>
          <div className="check-box-option-text">
            <div className="check-box-option-text-content">{title}</div>
            {showToolTip && !isEmpty(moreInfo) && (
              <>
                <img
                  src="/icons/more-info.svg"
                  alt="more-info"
                  className={`check-box-option-text-more-info ${id}`}
                />
                <MoreInfoCard
                  targetClass={`${id}`}
                  content={moreInfo}
                  isBulleted={false}
                />
              </>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default CheckBoxOption;
