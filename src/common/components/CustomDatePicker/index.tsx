import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

function CustomDatePicker(props: any) {
  const availability = {
    "2022-09-22": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-23": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-24": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-25": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-26": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-27": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-28": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-29": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-09-30": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
    "2022-10-01": {
      time_slots: [
        { "00:00": { pricing_overridden: false, has_surcharges: false } },
      ],
    },
  };
  return (
    <div className="custom-date-picker-container">
      <DatePicker
        {...props}
        minDate={moment().toDate()}
        dayClassName={(date) => {
          if (
            moment(new Date(date)).format("DDMMYY") ===
            moment(new Date()).format("DDMMYY")
          ) {
            return "custom-day";
          }
        }}
        includeDates={Object.keys(availability).map((date) =>
          moment(date).toDate()
        )}
        onMonthChange={(e) => {
          var date = e;
          var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
          var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          console.log(firstDay, lastDay);
        }}
        popperClassName="custom-popper"
      />
    </div>
  );
}

export default CustomDatePicker;
