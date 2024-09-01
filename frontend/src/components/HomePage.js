import React from "react";
import EmployeeLayout from "./EmployeeLayout";
import LeaveOverview from "./LeaveOverview";

const HomePage = ({ isCollapsed, toggleSidebar }) => {
  return (
    <EmployeeLayout isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
      <LeaveOverview />
    </EmployeeLayout>
  );
};

export default HomePage;
