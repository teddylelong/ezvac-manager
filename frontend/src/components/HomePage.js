import React, { useState, useEffect } from "react";
import EmployeeLayout from "./employee/EmployeeLayout";
import LeaveOverview from "./leave/LeaveOverview";
import apis from "../services/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      <DndProvider backend={HTML5Backend}>
        <LeaveOverview leaves={leaves} fetchLeaves={fetchLeaves} />
      </DndProvider>
    </EmployeeLayout>
  );
};

export default HomePage;
