import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { positionList, departmentList } from "assets/data/data";
import EmployeeItem from "./EmployeeItem";
import "./Employee.css"
import axios from "axios";
// import { response, response } from "express";
function Employee() {
    document.title = "Employee";
    const [selectedPosition, setSelectedPosition] = useState("Select Position")
    const [selectedDepartment, setSelectedDepartment] = useState("Select Department")
    const [positionMenu, setPositionMenu] = useState(false)
    const [departmentMenu, setDepartmentMenu] = useState(false)
    const [userList, setUserList] = useState([])
    const [inputSearch, setInputSearch] = useState("");
    const handlePositionMenu = () => {
        setPositionMenu(!positionMenu)
        setDepartmentMenu(false)
    }

    const handleDepartmetnnMenu = () => {
        setDepartmentMenu(!departmentMenu)
        setPositionMenu(false)
    }

    const handleChangeSelectedPosition = (item) => {
        setSelectedPosition(item)
    }

    const handleChangeSelectedDepartment = (item) => {
        setSelectedDepartment(item)
    }

    const handleSeacrh = async () => {
        try {
            const response = await axios.get('https://qr-code-checkin.vercel.app/api/admin/manage-employee/get-employee-specific',{
                params: {
                    query: inputSearch,
                },
            });
            // console.log(response.data.message);
            setUserList(response.data.message);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get('https://qr-code-checkin.vercel.app/api/admin/manage-employee/get-employee-specific');
                // console.log(response.data.message);
                setUserList(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAllUsers();
    }, []);


    if (userList) {
        console.log(userList);
    }
    return (
        <>
            <div className="ml-[260px] h-auto p-5 flex flex-col font-Changa text-textColor gap-5">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <h1 className="font-bold text-3xl">Employees</h1>
                        <div className="flex flex-row">
                            <Link className="text-xl font-semibold leading-6 hover:underline" to="/">Dashboard</Link>
                            <span className="text-[#6c757d] font-xl">/ Employees</span>
                        </div>
                    </div>
                    <div className="flex flex-row px-4 gap-4">
                        <a href="employee/add-employee" target="__blanket" className="bg-buttonColor1 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid p-2 rounded-md hover:bg-cyan-800">
                            <svg style={{ width: '14px', height: '16px' }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>
                            Add Employee
                        </a>
                        <button className="bg-buttonColor1 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid p-2 rounded-md hover:bg-cyan-800">
                            <svg style={{ width: '14px', height: '16px' }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>
                            Export File
                        </button>
                    </div>
                </div>
                <div className="z-10 flex flex-row mt-10 justify-between h-[50px]">
                    <input
                        className="w-1/3 text-base px-4 py-3 placeholder:text-placeholderTextColor focus:border-2 focus:border-solid focus:border-placeholderTextColor focus:ring-0"
                        type="text"
                        placeholder="Search by name, ID"
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <div
                        onClick={handleDepartmetnnMenu}
                        className="w-1/6 h-[50px] text-base cursor-pointer">
                        <div className="flex flex-col w-full py-3 px-2 border border-solid border-placeholderTextColor text-placeholderTextColor">
                            <div className="flex flex-row items-center justify-around w-full">
                                <div className="ml-4">{selectedDepartment}</div>
                                <div className={`w-4 h-4 flex justify-center items-center ${departmentMenu ? "rotate-180" : ""}`}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-rotate-180 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ color: "rgb(220, 220, 220)" }}><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path></svg>
                                </div>
                            </div>
                        </div>

                        {departmentMenu && (<div className="text-placeholderTextColor border border-solid border-placeholderTextColor border-t-white flex flex-col gap-3 px-2 py-3 justify-center items-center w-full overflow-y-scroll max-h-[200px]">
                            {departmentList.map(({ index, department }) => {
                                return <div onClick={() => handleChangeSelectedDepartment(department)} className="py-1">{department}</div>
                            })}
                        </div>)}
                    </div>

                    <div
                        onClick={handlePositionMenu}
                        className="w-1/6 h-[50px] text-base cursor-pointer">
                        <div className="flex flex-col w-full py-3 px-2 border border-solid border-placeholderTextColor text-placeholderTextColor">
                            <div className="flex flex-row items-center justify-around w-full">
                                <div className="ml-4">{selectedPosition}</div>
                                <div className={`w-4 h-4 flex justify-center items-center ${positionMenu ? "rotate-180" : ""}`}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-rotate-180 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ color: "rgb(220, 220, 220)" }}><path fill="currentColor" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path></svg>
                                </div>
                            </div>
                        </div>

                        {positionMenu && (<div className="z-10 text-placeholderTextColor border border-solid border-placeholderTextColor border-t-white flex flex-col gap-3 px-2 py-3 justify-center items-center w-full overflow-y-scroll max-h-[200px]">
                            {positionList.map(({ index, postition }) => {
                                return <div onClick={() => handleChangeSelectedPosition(postition)} className="py-1">{postition}</div>
                            })}
                        </div>)}
                    </div>
                    <div 
                    onClick={handleSeacrh}
                     className="bg-buttonColor2 text-white text-base flex flex-row gap-1 justify-center items-center border border-solid p-2 rounded-md cursor-pointer hover:bg-emerald-700 w-1/6">
                        <button className="search-btn">Seacrh</button>
                    </div>
                </div>
                <div className="block w-full text-base font-Changa mt-5 overflow-y-scroll overflow-x-scroll">
                    <table className="w-full table">
                        <thead className="">
                            <tr className="">
                                <th className="p-2 text-left">
                                    <span className="font-bold">Name</span>
                                </th>
                                <th className="p-2 text-left">
                                    <span className="table-title-id">Employee ID</span>
                                </th>
                                <th className="p-2 text-left">
                                    <span className="table-title-email">Email</span>
                                </th>
                                <th className="p-2 text-left">
                                    <span className="table-title-role">Department</span>
                                </th>
                                <th className="p-2 text-left">
                                    <span className="table-title-role">Role</span>
                                </th>
                                <th className="p-2 text-left">
                                    <span className="table-title-status">Status</span>
                                </th>
                                <th className="p-2 text-left">
                                    <span className="table-title-action">Action</span>
                                </th>
                            </tr>
                        </thead>
                        {Array.isArray(userList) && userList?.length === 0 ? (
                            <div className="no-result-text">NO RESULT</div>
                        ) : (
                            <tbody className="tbody">
                                {userList?.map(({ id, name, email, status, department_name, role }) => (
                                    <EmployeeItem
                                        key={id}
                                        name={name}
                                        id={id}
                                        email={email}
                                        status={status}
                                        department_name={department_name}
                                        role={role}
                                    />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
}

export default Employee;
