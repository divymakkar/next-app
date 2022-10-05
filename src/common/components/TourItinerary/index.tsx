import { DateFormat } from "@/utils/constants";
import { formattedDay } from "@/utils/tour";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import Collapsible from "../Collapsible";
import RawHTML from "../RawHTML";

// import Gallery from "../Gallery";

export const TourItinerary = (props: any) => {
  const itinerary = props.itinerary;

  return (
    <div className="product-itinerary normal">
      {itinerary.map((data: any) => {
        return (
          <div key={data.day_number} className="main-card">
            <div className={`content ${itinerary.length > 1 ? "" : "single"}`}>
              <TourItineraryCard data={data}>
                <div className="text-itinerary">
                  <div className="ql-editor ql-snow">
                    <RawHTML className="itinerary-description">
                      {data.description}
                    </RawHTML>
                  </div>
                </div>
                <div className="itinerary-gallery">
                  {data?.media.map((mediaObj: any, index: number) => {
                    return (
                      <div className="gallery-image">
                        <Image
                          src={mediaObj?.media_urls?.thumbnail}
                          placeholder="blur"
                          blurDataURL={mediaObj?.media_urls?.placeholder}
                          layout="fill"
                        />
                      </div>
                    );
                  })}
                </div>
                {/* <Gallery
                  images={data.media.map((media: any) => {
                    return media.media_urls.thumbnail;
                  })}
                ></Gallery> */}
                <div className="horizontal-divider"></div>
                {data.events.map((evt: any, idx: number) => (
                  <ProductitineraryEvent
                    data={evt}
                    key={idx}
                    line={idx !== data.events.length - 1}
                  ></ProductitineraryEvent>
                ))}
              </TourItineraryCard>
            </div>
            {itinerary.length > 1 && (
              <div className="main">
                <span className="circle"></span>
                <span className="line"></span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ProductitineraryEvent = (props: any) => {
  const data = props.data;
  const { start_time, description, event_type, duration } = data;
  const time_num = start_time.split(" ")[0];
  const time_text = start_time.split(" ")[1];
  return (
    <>
      <Card muted>
        <div className="itinerary-card">
          {props.line && <span className="line"></span>}
          <div>
            <div className="event-time">
              <div className="time-num">{time_num}</div>
              <div className="time-text">{time_text}</div>
            </div>
          </div>
          <div className="itinerary-card__event-details">
            <div className="duration">
              <i className="tours-icon-duration" />
              <span>Duration:</span>
              {` ${duration[0]} Hour${duration[0] === 1 ? "" : "s"}, ${
                duration[1]
              } Minute${duration[1] === 1 ? "" : "s"}`}
            </div>
            <div className="event-type">{event_type}</div>
            <div className="description">{description}</div>
            {/* <Gallery
              images={data.media.map((media: any) => {
                return media.media_urls.thumbnail;
              })}
            ></Gallery> */}
          </div>
        </div>
      </Card>
    </>
  );
};

const TourItineraryCard = (props: any) => {
  const data = props.data;
  const children = props.children;
  const [isOpen, setIsOpen] = useState(false);
  const { day_number, title, description, updated_at, location } = data;
  return (
    <>
      <Card>
        <div className="itinerary-card">
          <div>
            <div className="day">
              <div>Day</div>
              <div className="day-num">{formattedDay(day_number)}</div>
            </div>
          </div>
          <div className="itinerary-card__details">
            <div className="dot">
              <i className="tours-icon-Calendar" />
              {/* {moment(updated_at).format(DateFormat)} */}
            </div>
            <div className="title clickable" onClick={() => setIsOpen(!isOpen)}>
              {title}
              <i className={`pi pi-angle-${isOpen ? "up" : "down"}`} />
            </div>
            {!isEmpty(location) && (
              <div className="location">
                <a href={location.google_map_url} target="_blank">
                  <img src="/icons/location-icon.svg" alt="loc" />
                  {location.name}
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="itinerary-card__show-more">
          <Collapsible isOpen={isOpen}>
            <div className="product-itinerary-description">{children}</div>
          </Collapsible>
        </div>
      </Card>
    </>
  );
};

const Card = (props: any) => {
  const {
    children,
    title,
    muted,
    height,
    color,
    background,
    outerBorder,
    fullWidth,
    borderRadius,
    boxShadow,
  } = props;
  let cardStyle = {
    height: height,
    color: color,
    border: `1px solid ${color}`,
    background: background,
    marginTop: `${color ? "20px" : ""}`,
    borderRadius: `${borderRadius ? borderRadius : ""}`,
    boxShadow: `${boxShadow ? boxShadow : ""}`,
  };
  fullWidth ? Object.assign(cardStyle, { flex: "100%" }) : null;
  return (
    <>
      <div className={muted ? "" : "profile-card"} style={cardStyle}>
        {children}
      </div>
    </>
  );
};
