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
import Employees from "./Pages/Employees";
import NewTeams from "./Pages/SubPages/NewTeams";
import Documents from "./Pages/SubPages/Documents";
import AccountAccess from "./Pages/SubPages/AccountAccess";
import PersonalInfo from "./Pages/PersonalInfo";
import Professional from "./Pages/SubPages/Professional";
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
            <Route path="/admin-dashboard/employess/teams" element={<Teams/>}>
            <Route path="/admin-dashboard/employess/teams/new-teams" element={<NewTeams/>}/>
            </Route>
            </Route>
            <Route path="/admin-dashboard/employess/personal-info" element={<PersonalInfo/>}>
            <Route path="/admin-dashboard/employess/personal-info/professional" element={<Professional/>}/>
            <Route path="/admin-dashboard/employess/personal-info/documents" element={<Documents/>}/>
            <Route path="/admin-dashboard/employess/personal-info/account-access" element={<AccountAccess/>}/>
            </Route>
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
