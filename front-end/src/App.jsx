import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Auth/SignIn";
import ForgotPwd from "./Auth/ForgotPwd";
import CheckEmail from "./Auth/CheckEmail";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminSummary from "./Pages/AdminSummary";
import TaskBoard from "./Pages/TaskBoard";
import LeaveBoard from "./Pages/LeaveBoard";
import PayRoll from "./Pages/PayRoll";
import Settings from "./Pages/Settings";
import Error from "./Pages/Error";
import 'animate.css';
import Teams from "./Pages/SubPages/Teams";
import All from "./Pages/Employees";
import AddEmployees from "./Pages/AddEmployees";
import Employees from "./Pages/Employees";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/forgotpassword" element={<ForgotPwd />} />
          <Route path="/auth/checkemail" element={<CheckEmail />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="" element={<AdminSummary />} />
            {/* Employess Sub Pages */}
            <Route path="/admin-dashboard/employess" element={<Employees/>} >
            <Route path="/admin-dashboard/employess/teams" element={<Teams/>}/>
            </Route>
            <Route path="/admin-dashboard/employess/add-employess" element={<AddEmployees/>}/>
            {/* =================================================== */}
            <Route path="/admin-dashboard/taskboard" element={<TaskBoard />} />
            <Route
              path="/admin-dashboard/leaveboard"
              element={<LeaveBoard />}
            />
            <Route path="/admin-dashboard/payroll" element={<PayRoll />} />
            <Route path="/admin-dashboard/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
