import React from "react";
import Image from "next/image";
import TourContentCard from "../TourContentCard";
import { isEmpty } from "lodash";
interface IProps {
  startingPoint: any;
  pickupPoints: any;
  dropPoints: any;
}
function TourMap(props: IProps) {
  const { startingPoint, pickupPoints, dropPoints } = props;
  return (
    <TourContentCard
      headerTitle="Maps Know where to go"
      className="tour-map-container"
      headerClassName="maps-title"
      id="tour-map"
    >
      <div className="tour-map-points">
        {!isEmpty(startingPoint) && (
          <div className="tour-map-point-block">
            <div className="point-name">
              <img
                className="mr-1"
                src="/icons/starting-point.svg"
                alt="map-point"
              />{" "}
              <span>Starting Point</span>
            </div>
            <div className="point-details">
              <div className="point-icon">
                <img src="/icons/location-icon.svg" alt="loc" />
              </div>
              <div className="point-location-wrap">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${startingPoint.lat}%2C${startingPoint.long}&query_place_id=${startingPoint.place_id}`}
                  className="point-location"
                >
                  <span>{startingPoint.name}</span>{" "}
                  <img src="/icons/map-icon.svg" alt="map" />
                </a>
                <div className="point-location-desc">
                  {startingPoint?.google_data?.formatted_address ||
                    startingPoint?.long_name}
                </div>
              </div>
            </div>
          </div>
        )}
        {!isEmpty(pickupPoints) && (
          <div className="tour-map-point-block">
            <div className="point-name">
              <img
                className="mr-1"
                src="/icons/pickup-point.svg"
                alt="map-point"
              />{" "}
              <span>Pickup Point</span>
            </div>
            <div className="point-details">
              <div className="point-icon">
                <img src="/icons/round-gps.svg" alt="loc" />
              </div>
              <div className="point-location-wrap">
                <a className="point-location">
                  <span>Leh Airport Travel Terminal</span>{" "}
                  <img src="/icons/map-icon.svg" alt="map" />
                </a>
                <div className="point-location-desc">
                  Leh Airport Travel Terminal, Leh, 194101
                </div>
              </div>
            </div>
          </div>
        )}

        {!isEmpty(dropPoints) && (
          <div className="tour-map-point-block">
            <div className="point-name dropoff-point">
              <img src="/icons/dropoff-point.svg" alt="map-point" />{" "}
              <span>Drop Point</span>
            </div>
            <div className="point-details">
              <div className="point-icon">
                <img src="/icons/map-flag.svg" alt="loc" />
              </div>
              <div className="point-location-wrap">
                <a className="point-location">
                  <span>Leh Airport Travel Terminal</span>{" "}
                  <img src="/icons/map-icon.svg" alt="map" />
                </a>
                <div className="point-location-desc">
                  Leh Airport Travel Terminal, Leh, 194101
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {startingPoint?.directions && (
        <div className="">
          <div className="map-text">
            <img
              src="/icons/location-icon.svg"
              alt="location-icon"
              className="mr-1"
            />
            How to reach
          </div>

          <div className="content-card-item content-card-item__bordered content-card-item__padded how-to-reach-card">
            {startingPoint.directions}
          </div>
        </div>
      )}

      <div className="map-text clickable">
        <img src="/icons/map-icon.svg" alt="location-icon" className="mr-1" />
        Click the Map to see location
      </div>

      <div className="tour-location-map">
        <Image
          className="map"
          src="/images/map-screenshot.png"
          layout="fill"
          alt="location-on-map"
        />

        <Image
          className="round-gps"
          src="/icons/round-gps-lg.svg"
          layout="fill"
          alt="gps"
        />
      </div>
    </TourContentCard>
  );
}

export default TourMap;
