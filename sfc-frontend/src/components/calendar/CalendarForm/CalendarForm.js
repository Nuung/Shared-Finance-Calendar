import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarForm = () => {
  const [events, setEvents] = useState([]);
  const { userId } = JSON.parse(localStorage.getItem("userInfo")).result;
  const date = moment().format("YYYY/M/D").split("/");

  useEffect(() => {
    axios
      .get(`/api/schedule/${userId}?year=${date[0]}&month=${date[1]}`)
      .then((res) => {
        const events = res.data.result.map((event) => {
          const eventObj = {
            title: event.memo,
            start: event.startTime,
            end: event.endTime,
            allDay: false,
            // resource: "1234",
          };
          return eventObj;
        });
        setEvents(events);
      });
  }, []);
  return (
    <div className="Calendar__wrapper">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        events={events}
        views={["day", "week", "month"]}
        defaultView="month"
        style={{ width: "100%", height: "100vh" }}
      />
    </div>
  );
};

export default CalendarForm;
