import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { isEmpty } from "lodash";
import { AttractionsTilesToShow } from "@/utils/constants";

function MoreLinksSection(props: {
  productLocation: string;
  data: {
    sub_categories_data?: any; //TODO
    attractions_data?: any; //TODO
    listing_types_data?: any; //TODO
  };
}) {
  const { sub_categories_data, attractions_data, listing_types_data } =
    props.data;
  const tabHighlights = [
    { label: `More Things to do in ${props?.productLocation}`, icon: "" },
    { label: `More on ${props?.productLocation} Tourism`, icon: "" },
    { label: `More ${props?.productLocation} Attractions`, icon: "" },
  ].filter((i, index: number) => {
    if (index === 0) return !isEmpty(sub_categories_data);
    else if (index === 1) return !isEmpty(listing_types_data);
    else if (index === 2) return !isEmpty(attractions_data);
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleTabChange = (e: any) => {
    setActiveIndex(e.index);
  };

  return (
    <div
      className="tabmenu tabmenu__left-aligned"
      style={{ marginTop: "1rem" }}
    >
      <TabMenu
        model={tabHighlights}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
      <div className="links-wrapper">
        {(() => {
          switch (activeIndex) {
            case 0:
              return (
                <>
                  {sub_categories_data?.map(
                    (sub_category: any, index: number) => {
                      //TODO
                      return (
                        <a
                          key={index}
                          href={sub_category.url_path}
                          className="link"
                        >
                          {sub_category.name}
                        </a>
                      );
                    }
                  )}
                </>
              );

            case 1:
              return (
                <>
                  {listing_types_data?.map(
                    (sub_category: any, index: number) => {
                      //TODO
                      return (
                        <a
                          key={index}
                          href={sub_category.url_path}
                          className="link"
                        >
                          {sub_category.name}
                        </a>
                      );
                    }
                  )}
                </>
              );

            case 2:
              return (
                <>
                  {attractions_data
                    ?.slice(AttractionsTilesToShow, attractions_data?.length)
                    .map((sub_category: any, index: number) => {
                      //TODO
                      return (
                        <a
                          key={index}
                          href={sub_category.url_path}
                          className="link"
                        >
                          {sub_category.name}
                        </a>
                      );
                    })}
                </>
              );
          }
        })()}
      </div>
    </div>
  );
}

export default MoreLinksSection;
