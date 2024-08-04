import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./LeaveCalendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import apis from "../services/api.js";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const LeaveCalendar = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const response = await apis.getLeaves();
    setLeaves(
      response.data.map((leave) => ({
        title: `${leave.employee.firstName} ${leave.employee.lastName}`,
        start: new Date(leave.startDate),
        end: new Date(leave.endDate),
      }))
    );
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={leaves}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default LeaveCalendar;
