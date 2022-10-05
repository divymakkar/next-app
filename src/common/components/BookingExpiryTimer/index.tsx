import React, { useEffect, useState } from "react";

import moment, { Moment } from "moment";
import Countdown, { zeroPad } from "react-countdown";
import { ProgressBar } from "primereact/progressbar";

interface BookingExpiryTimerProps {
  bookingCreatedTime: Moment;
  expirySeconds: number;
  redirectProductSlug: string;
}

const BookingExpiryTimer = ({ bookingCreatedTime, expirySeconds, redirectProductSlug }: BookingExpiryTimerProps) => {
  const expiryTime = moment(bookingCreatedTime).add(expirySeconds, "seconds");
  return (
    <div className="booking-expiry-timer-container">
      <Countdown
        date={expiryTime.toDate()}
        renderer={(props: any) => {
          const progress = ((props.minutes * 60 + props.seconds) * 100) / expirySeconds;
          return <BookingExpiryRenderer
            minutes={props.minutes}
            seconds={props.seconds}
            progress={progress}
            completed={props.completed}
            productSlug={redirectProductSlug}
          />
        }}
        zeroPadTime={2}
      />
    </div>
  )
}

const BookingExpiryRenderer = ({ minutes, seconds, completed, progress, productSlug }: any) => {
  if (completed) {
    return <BookingExpiredRenderer slug={productSlug} />;
  }
  else {
    return (
      <>
        <div className="booking-expiry-timer-container-text">
          <div className="booking-expiry-timer-container-text-title">
            We are holding special price for you!
          </div>
          <div className="booking-expiry-timer-container-text-content">
            Complete your booking in the next
          </div>
        </div>
        <div className="booking-expiry-timer-container-countdown">
          <div className="booking-expiry-timer-container-countdown-time">
            <div>
              {zeroPad(minutes)}:{zeroPad(seconds)}
            </div>
            <div>
              <span>Min</span><span>Sec</span>
            </div>
          </div>
          <ProgressBar showValue={false} value={progress}></ProgressBar>
        </div>
      </>
    );
  }
};

const BookingExpiredRenderer = ({ slug }: any) => {
  const handleTimerEnd = () => {
    setTimeout(() => {
      window.location.href = `/tours/${slug}?bookingExpired=true`;
    }, 5000);
  };

  handleTimerEnd();

  return (
    <></>
  );
};

export default BookingExpiryTimer;