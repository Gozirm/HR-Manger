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
    name: "Employess",
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
