import React from "react";
import employeesIcon from "../../assets/TotalEmployeesIcon.svg";
import taskIcon from "../../assets/Task.svg";
import LeavesIcon from "../../assets/Leaves.svg";
import "../../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { table } from "../../tables";
import AdminSummary from "../admin-Dashboard/AdminSummary";
const EmployeeSummary = () => {
  return (
    <>
      <AdminSummary />
    </>
  );
};

export default EmployeeSummary;
