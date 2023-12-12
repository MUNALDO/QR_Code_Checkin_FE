import { Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "views/Dashboard/Dashboard";
import Attendance from "views/Attendance/Attendance";
import Employee from "views/Employee/Employee";
import Department from "views/Employee/Department/Department";
import Position from "views/Position/Position";
import ProfileEmployee from "views/ProfileEmployee/ProfileEmployee";
import WorkingSchedule from "views/Attendance/WorkingSchedule/WorkingSchedule";
import DayOffManagement from "views/Attendance/DayOffManagement/DayOffManagement";
// import AddEmployee from "views/Employee/AddEmployee/AddEmployee";
import Login from "views/Login/Login";
// import { AuthContextProvider } from "context/AuthContext";
import Layout from "components/Layout";
import RequireAuth from "components/RequireAuth";
const titles = {
    '/': 'QR Checkin',
    '/attendance': 'Attendance',
    '/employee': 'Employee',
}


const Router = () => {
    // const location = useLocation()
    // useEffect(
    //     async () => (document.title = titles[location.pathname]),
    //     [location],
    // )  
    return (
        // <AuthContextProvider>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="employee" element={<Employee />} />
            <Route path="employee/departments" element={<Department />} />
            <Route path="employee/position" element={<Position />} />
            <Route path="employee/view-profile/:id" element={<ProfileEmployee />} />
            <Route path="working-schedule" element={<WorkingSchedule />} />
            <Route path="working-schedule/day-off-management" element={<DayOffManagement />} />
            {/* <Route path="employee/add-employee" element={<AddEmployee />} /> */}
            <Route path="login" element={<Login />} />
        </Routes>
    );
};

export default Router;
