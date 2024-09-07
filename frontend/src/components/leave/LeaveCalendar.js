import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./LeaveCalendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import apis from "../../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import EmployeeLayout from "../employee/EmployeeLayout.js";

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

const LeaveCalendar = ({ isCollapsed, toggleSidebar }) => {
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
    <EmployeeLayout isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
      <h2 className="p-4 text-xl font-bold dark:text-gray-200">
        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
        Leave Calendar
      </h2>
      <Calendar
        localizer={localizer}
        events={leaves}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "calc(100vh - 12rem)",
          minHeight: "500px",
        }}
        className="px-4 mt-2"
      />
    </EmployeeLayout>
  );
};

export default LeaveCalendar;
