import React, { useState, useEffect } from "react";
import EmployeeLayout from "./employee/EmployeeLayout";
import LeaveOverview from "./leave/LeaveOverview";
import apis from "../services/api";

const HomePage = ({ isCollapsed, toggleSidebar }) => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const response = await apis.getLeaves();
    setLeaves(response.data);
  };

  return (
    <EmployeeLayout
      isCollapsed={isCollapsed}
      toggleSidebar={toggleSidebar}
      fetchLeaves={fetchLeaves}
    >
      <LeaveOverview leaves={leaves} fetchLeaves={fetchLeaves} />
    </EmployeeLayout>
  );
};

export default HomePage;
