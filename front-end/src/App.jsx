import "animate.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Auth/SignIn";
import AdminDashboard from "./Pages/admin-Dashboard/AdminDashboard";
import ForgotPwd from "./Auth/ForgotPwd";
import CheckEmail from "./Auth/CheckEmail";
import AdminSummary from "./Pages/admin-Dashboard/AdminSummary";
import TaskBoard from "./Pages/admin-Dashboard/TaskBoard";
import LeaveBoard from "./Pages/admin-Dashboard/LeaveBoard";
import PayRoll from "./Pages/admin-Dashboard/PayRoll";
import Settings from "./Pages/admin-Dashboard/Settings";
import Error from "./Pages/Error";
import Teams from "./Pages/admin-Dashboard/Teams";
import Employees from "./Pages/admin-Dashboard/Employees";
import NewTeams from "./Pages/admin-Dashboard/NewTeams";
import Documents from "./Pages/admin-Dashboard/Documents";
import AccountAccess from "./Pages/admin-Dashboard/AccountAccess";
import PersonalInfo from "./Pages/admin-Dashboard/PersonalInfo";
import Professional from "./Pages/admin-Dashboard/Professional";
import EditTeams from "./Pages/admin-Dashboard/EditTeams";
import NewTask from "./Pages/admin-Dashboard/NewTask";
import AddPayroll from "./Pages/admin-Dashboard/AddPayroll";
import EmployeeDashboard from "./Pages/employee-Dashboard/EmployeeDashboard";
import EmployeeSummary from "./Pages/employee-Dashboard/EmployeeSummary";
import EmployeeSettings from "./Pages/employee-Dashboard/EmployeeSettings";
import EmployeeTaskBoard from "./Pages/employee-Dashboard/EmployeeTaskBoard";
import EmployeeNewTask from "./Pages/employee-Dashboard/EmployeeNewTask";
import EmployeeLeaveBoard from "./Pages/employee-Dashboard/EmployeeLeaveBoard";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./context/PrivateRoute";
import RoleBasedRoute from "./context/RoleBasedRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* Admin Dashboard Routes Section */}
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/auth/forgotpassword" element={<ForgotPwd />} />
          <Route path="/auth/checkemail/:resetToken" element={<CheckEmail />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute>
                <RoleBasedRoute requiredRole={["admin", "super-admin"]}>
                  <AdminDashboard />
                </RoleBasedRoute>
              </PrivateRoute>
            }
          >
            <Route path="" element={<AdminSummary />} />
            {/* Employess Sub Pages */}
            <Route path="/admin-dashboard/employess" element={<Employees />}>
              <Route
                path="/admin-dashboard/employess/teams"
                element={<Teams />}
              >
                <Route
                  path="/admin-dashboard/employess/teams/new-teams"
                  element={<NewTeams />}
                />
                <Route
                  path="/admin-dashboard/employess/teams/edit-teams"
                  element={<EditTeams />}
                />
              </Route>
            </Route>
            <Route
              path="/admin-dashboard/employess/personal-info"
              element={<PersonalInfo />}
            >
              <Route
                path="/admin-dashboard/employess/personal-info/professional"
                element={<Professional />}
              />
              <Route
                path="/admin-dashboard/employess/personal-info/documents"
                element={<Documents />}
              />
              <Route
                path="/admin-dashboard/employess/personal-info/account-access"
                element={<AccountAccess />}
              />
            </Route>
            {/* =================================================== */}
            <Route path="/admin-dashboard/taskboard" element={<TaskBoard />} />
            <Route
              path="/admin-dashboard/taskboard/new-task"
              element={<NewTask />}
            />
            <Route
              path="/admin-dashboard/leaveboard"
              element={<LeaveBoard />}
            ></Route>
            <Route path="/admin-dashboard/payroll" element={<PayRoll />}>
              <Route
                path="/admin-dashboard/payroll/add-payroll"
                element={<AddPayroll />}
              />
            </Route>
            <Route path="/admin-dashboard/settings" element={<Settings />} />
          </Route>
          {/* Employee Dashboard Routes Section */}
          <Route path="/employee-dashboard" element={<EmployeeDashboard />}>
            <Route path="/employee-dashboard" element={<EmployeeSummary />} />
            <Route
              path="/employee-dashboard/leaveboard"
              element={<EmployeeLeaveBoard />}
            />
            <Route
              path="/employee-dashboard/settings"
              element={<EmployeeSettings />}
            />
            <Route
              path="/employee-dashboard/taskboard"
              element={<EmployeeTaskBoard />}
            ></Route>
            <Route
              path="/employee-dashboard/taskboard/new-task"
              element={<EmployeeNewTask />}
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
