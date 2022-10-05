import Image from "next/image";
import React from "react";
import Router from "next/router";
import { AttractionsTilesToShow } from "@/utils/constants";
import dotenv from "dotenv";
import Link from "next/link";
dotenv.config();

function AttractionsSection(props: { data: any; location: string }) {
  const { data, location } = props;

  return (
    <div className="attractions-container">
      {data
        .slice(0, AttractionsTilesToShow)
        .map((dataItem: any, index: number) => {
          //TODO

          return (
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/${dataItem?.url_path}`}
            >
              <a target="_blank">
                <div key={index} className="attraction-card">
                  <Image
                    src={
                      dataItem?.new_ui_images?.new_ui_attraction_grid_tile
                        ?.fallback_img_src || ""
                    }
                    layout="fill"
                    alt="attraction-img"
                  />
                  {
                    <div className="attraction-location">
                      {location ? (
                        <>
                          <img src="/icons/location-icon.svg" alt="location" />{" "}
                          <span>{location}</span>
                        </>
                      ) : (
                        <span>{dataItem?.name}</span>
                      )}
                    </div>
                  }
                  <div className="attraction-options-count"></div>
                </div>
              </a>
            </Link>
          );
        })}
    </div>
  );
}

export default AttractionsSection;
