import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
const SalaryCounting = () => {
    const [inputEmployeeId, setInputEmployeeId] = useState("")
    const [inputMonth, setInputMonth] = useState("")
    const [inputYear, setInputYear] = useState("")

    const [userSalarybyMonth, setUserSalaryByMonth] = useState()

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    const handleSeacrh = async () => {
        if (userObject.role === 'Admin' && inputEmployeeId !== "" && inputMonth !== "" && inputYear !== "") {
            try {
                const { data } = await axios.get(
                    "https://qr-code-checkin.vercel.app/api/auth/manage-admin/register-inhaber",
                    { withCredentials: true }
                );
                console(data)
            } catch (error) {
                // Handle error
                console.error("Error submitting form:", error);
            }
        }
    }


    return (
        <div className="relative ml-[260px] h-auto p-5 flex flex-col font-Changa text-textColor gap-5">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl">Salary Counting</h1>
                    <div className="flex flex-row">
                        <Link className="text-xl font-semibold leading-6 hover:underline" to="/">Dashboard</Link>
                        <span className="text-[#6c757d] font-xl">/ Salary</span>
                        <Link className="text-[#6c757d] font-xl leading-6 hover:underline" to="/salary/counting">/ Salary Couting</Link>
                    </div>
                </div>
            </div>
            <div className="border border-solid border-t-[#6c757d]"></div>

            <div className="z-10 flex flex-row mt-10 justify-between h-[50px]">
                <input
                    className="w-1/5 text-base px-4 py-3 placeholder:text-placeholderTextColor focus:border-2 focus:border-solid focus:border-placeholderTextColor focus:ring-0"
                    type="text"
                    placeholder="Enter employee's ID"
                    value={inputEmployeeId}
                    onChange={(e) => setInputEmployeeId(e.target.value)}
                />
                <input
                    className="w-1/5 text-base px-4 py-3 placeholder:text-placeholderTextColor focus:border-2 focus:border-solid focus:border-placeholderTextColor focus:ring-0"
                    type="text"
                    placeholder="Enter month"
                    value={inputMonth}
                    onChange={(e) => setInputMonth(e.target.value)}
                />
                <input
                    className="w-1/5 text-base px-4 py-3 placeholder:text-placeholderTextColor focus:border-2 focus:border-solid focus:border-placeholderTextColor focus:ring-0"
                    type="text"
                    placeholder="Enter year"
                    value={inputYear}
                    onChange={(e) => setInputYear(e.target.value)}
                />
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
                                <span className="table-title-role">Position</span>
                            </th>
                            <th className="p-2 text-left">
                                <span className="table-title-status">Status</span>
                            </th>
                        </tr>
                    </thead>
                    {/* {Array.isArray(allUsers) && allUsers?.length === 0 ? (
                            <div className="no-result-text text-center">NO RESULT</div>
                        ) : (
                            <tbody className="tbody">
                                {allUsers?.map(({ id, name, email, status, department_name, role, position }) => (
                                    <EmployeeItem
                                        key={id}
                                        name={name}
                                        id={id}
                                        email={email}
                                        status={status}
                                        department_name={department_name}
                                        role={role}
                                        position={position}
                                        checkAdmin={checkAdmin}
                                        checkInhaber={checkInhaber}
                                        checkManager={checkManager}
                                    />
                                ))}
                            </tbody>
                        )} */}
                </table>
            </div>

        </div>
    )
}

export default SalaryCounting