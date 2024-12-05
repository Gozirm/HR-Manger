import React, { useEffect, useState } from "react";
import LeavesIcon from "../../assets/Leaves.svg";
import employeesIcon from "../../assets/TotalEmployeesIcon.svg";
import taskIcon from "../../assets/Task.svg";
import "../../Styles/AdminSummary.css";
import axios from "axios";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [active, setisActive] = useState("");
  const token = localStorage.getItem("hr-token");
  const fecthCounts = async () => {
    try {
      setisActive("--");
      const res = await axios.get(
        "http://localhost:4000/api/leave/employee/activitie",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data);
      setCounts(res.data);
      setisActive("");
    } catch (error) {
      console.log("Can't get counts", error);
    } finally {
    }
  };
  useEffect(() => {
    fecthCounts();
  },[]);
  return (
    <>
      <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
        <div className="d-flex justify-content-between align-items-center sections">
          <div>
            <h6 className="title-admin">Planned Tasks</h6>
            <h2 className="num-admin">
              {active}  {counts?.statusCounts?.planned} 
            </h2>
          </div>
          <img src={employeesIcon} alt="" />
        </div>
        <div className="d-flex justify-content-between align-items-center sections">
          <div>
            <h6 className="title-admin">In Progress</h6>
            <h2 className="num-admin">
            {active}  {counts?.statusCounts?.["in-progress"]}
            </h2>
          </div>
          <img src={taskIcon} alt="" />
        </div>
        <div className="d-flex justify-content-between align-items-center sections">
          <div>
            <h6 className="title-admin">Remaining Leaves</h6>
            <h2 className="num-admin">{active}  {counts?.totalLeaves}</h2>
          </div>
          <img src={LeavesIcon} alt="" />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
