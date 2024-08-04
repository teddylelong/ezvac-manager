import React from "react";
import EmployeeLayout from "./EmployeeLayout";
import LeaveOverview from "./LeaveOverview";

const HomePage = () => {
  return (
    <EmployeeLayout>
      <LeaveOverview />
    </EmployeeLayout>
  );
};

export default HomePage;
