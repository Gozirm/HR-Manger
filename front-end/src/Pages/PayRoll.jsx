import React from "react";
import "../Styles/AdminSummary.css";
import Table from "react-bootstrap/Table";
import { leave, table, payroll } from "../tables";
import { Link, Outlet } from "react-router-dom";
import leavelady from "../assets/leavelady.svg";
import tradeUp from "../assets/tradeUp.svg";
import tradeDown from "../assets/tradeDown.svg";
import { useMatch } from "react-router-dom";

const PayRoll = () => {
  const match = useMatch("/admin-dashboard/payroll");
  return (
    <>
      {match ? (
        <main className="mt-lg-5 container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="mt-4">Payroll</h1>
              <p className="title">Dashboard/Payroll</p>
            </div>
            <Link to="/admin-dashboard/payroll/add-payroll">
              <button
                style={{
                  width: "100%",
                  color: "white",
                  backgroundColor: "#3439CA",
                  fontFamily: "Bricolage Grotesque, sans-serif",
                }}
                className="newEmployeebtn"
              >
                Add to Payroll
              </button>
            </Link>
          </div>
          <div className="mt-4 gap-4 d-lg-flex d-md-block  ">
            <div className="section-pay">
              <div className="">
                <h6 className="text-secondary">Total Employees</h6>
                <h2 className="fw-bold">134</h2>
                <p>Since last month</p>
                <div className="d-flex gap-2 align-items-center justify-content-center justify-content-lg-start">
                  <img src={tradeUp} alt="" />
                  <p className="m-0 text-success">17%</p>
                </div>
              </div>
            </div>
            <div className="section-pay">
              <div className="">
                <h6 className="text-secondary">Total Payroll for the month</h6>
                <h2 className="fw-bold">$32,980,604</h2>
                <p>Since last month</p>
                <div className="d-flex gap-2 align-items-center justify-content-center justify-content-lg-start">
                  <img src={tradeDown} alt="" />
                  <p className="m-0 text-success">17%</p>
                </div>
              </div>
            </div>
            <div className="section-pay">
              <div className="">
                <h6 className="text-secondary">Total Deductions</h6>
                <h2 className="fw-bold">$300,000</h2>
                <p>Since last month</p>
                <div className="d-flex gap-2 align-items-center justify-content-center justify-content-lg-start">
                  <img src={tradeUp} alt="" />
                  <p className="m-0 text-success">17%</p>
                </div>
              </div>
            </div>
            <div className="section-pay">
              <div className="">
                <h6 className="text-secondary">Total Net Salary</h6>
                <h2 className="fw-bold">$300,000</h2>
                <p>Since last month</p>
                <div className="d-flex gap-2 align-items-center justify-content-center justify-content-lg-start">
                  <img src={tradeUp} alt="" />
                  <p className="m-0 text-success">17%</p>
                </div>
              </div>
            </div>
          </div>
          {/* Tables */}
          <div className="mt-5 border p-4  rounded-4">
            <h2>Tables</h2>
            <div>
              <Table responsive="lg">
                <thead className="text-white">
                  <tr className="title-tr">
                    <th className="bg-light">Employee</th>
                    <th className="bg-light">Salary</th>
                    <th className="bg-light">Allowance</th>
                    <th className=" bg-light action-1">Deductions</th>
                    <th className=" bg-light action-1">Tax </th>
                    <th className="text-center bg-light action-1">
                      Net Salary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.map((titles) => {
                    const {
                      id,
                      salary,
                      allowance,
                      deductions,
                      tak,
                      netSalary,
                    } = titles;
                    return (
                      <tr key={id}>
                        <td className="title">
                          <div className="d-flex gap-2">
                            <img src={leavelady} alt="" />
                            <p className="mt-3">Oluwatosin Sanya</p>
                          </div>
                        </td>
                        <td className="title">
                          <p className="mt-3">{salary}</p>
                        </td>
                        <td>
                          <div className="mt-3 title">
                            <p className="">{allowance}</p>
                          </div>
                        </td>
                        <td className="title">
                          <p className="mt-3">{deductions}</p>
                        </td>
                        <td className=" pt-4 title">
                          <p>{tak}</p>
                        </td>
                        <td className="text-center pt-3 title ">
                          <p className="mt-2">{netSalary}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </main>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PayRoll;
