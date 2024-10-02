import dashboardIcon from "../src/assets/dashboard.svg";
import employessIcon from "../src/assets/Employees.svg";
import taskboardIcon from "../src/assets/Taskboard.svg";
import leaveboardIcon from "../src/assets/Leaveboard.svg";
import payrollIcon from "../src/assets/Payroll.svg";
import settingsIcon from "../src/assets/settings.svg";
import activeDashboardIcon from "../src/assets/inactive dash.svg";
import activeEmployeesIcon from "../src/assets/active Employ.svg";
import activeTaskIcon from "../src/assets/active task.svg";
import activeLeaveIcon from "../src/assets/active leave.svg";
import activePayrollIcon from "../src/assets/payroll active.svg";
import activeSettingIcon from "../src/assets/active settings.svg";

export const sidebarLinks = [
  {
    id: 1,
    icon: activeDashboardIcon,
    activeIcon: dashboardIcon,
    name: "Dashboard",
    path: "",
  },
  {
    id: 2,
    icon: employessIcon,
    activeIcon: activeEmployeesIcon,
    name: "Employees",
    path: "/admin-dashboard/employess",
  },
  {
    id: 3,
    icon: taskboardIcon,
    activeIcon: activeTaskIcon,
    name: "TaskBoard",
    path: "/admin-dashboard/taskboard",
  },
  {
    id: 4,
    icon: leaveboardIcon,
    activeIcon: activeLeaveIcon,
    name: "LeaveBoard",
    path: "/admin-dashboard/leaveboard",
  },
  {
    id: 5,
    icon: payrollIcon,
    activeIcon: activePayrollIcon,
    name: "PayRoll",
    path: "/admin-dashboard/payroll",
  },
  {
    id: 6,
    icon: settingsIcon,
    activeIcon: activeSettingIcon,
    name: "Settings",
    path: "/admin-dashboard/settings",
  },
];


// Teams
import teamImg from "../src/assets/team1.svg"
import teamImg2 from "../src/assets/team2.svg"
import teamImg3 from "../src/assets/team3.svg"
import teamImg4 from "../src/assets/team4.svg"
import teamImg5 from "../src/assets/team5.svg"
export const teams = [
  {
    id: 1,
    name: "Aisha Akinwunmi",
    position: "Manager",
    Image: teamImg,
  },
  {
    id: 2,
    name: "Kingsley Ifijie",
    position: "Front-end Developer",
    Image: teamImg2,
  },
  {
    id: 3,
    name: "Kekere-Ekun Tolani",
    position: "Data Analyst",
    Image: teamImg3,
  },
  {
    id: 4,
    name: "Badmus John",
    position: "Manager",
    Image: teamImg4,
  },
  {
    id: 5,
    name: "Oluwatobi Damilola",
    position: "Back-End Developer",
    Image: teamImg5,
  },
];
