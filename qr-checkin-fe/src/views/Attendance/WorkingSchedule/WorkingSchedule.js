import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ShiftItem from "./ShiftItem";

const WorkingSchedule = () => {
    const [shiftList, setShiftList] = useState()
    const [shiftState, setShiftState] = useState(true)

    useEffect(() => {
        const getAllShifts = async () => {
            try {
                const response = await axios.get('https://qr-code-checkin.vercel.app/api/admin/manage-shift/get-all', { withCredentials: true });
                // console.log(response.data.message);
                setShiftList(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAllShifts();
    }, []);
    if (shiftList) {
        console.log(shiftList);
    }

    return (
        <div className="relative ml-[260px] h-auto p-5 flex flex-col font-Changa text-textColor gap-5">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl">Employees</h1>
                    <div className="flex flex-row">
                        <Link className="text-xl font-semibold leading-6 hover:underline" to="/">Dashboard</Link>
                        <span className="text-[#6c757d] font-xl">/ Working Schedule</span>
                    </div>
                </div>
            </div>
            <div className="text-xl font-semibold leading-6 hover:underline">Create Working Schedule</div>
            <div className="flex flex-row gap-4 text-xl">
                <div
                    onClick={() => {
                        setShiftState(true)
                    }}
                    className={`hover:text-buttonColor1 cursor-pointer ${shiftState ? "text-buttonColor1 underline decoration-buttonColor1" : ""}`}>Shift Management</div>
            </div>
            
            {/* //----------------------------------------------------------------SHIFT MANAGEMENT------------------------------------------------------------------------------------// */}

            {shiftState && (<div className="block w-full text-base font-Changa mt-5 overflow-y-scroll overflow-x-scroll">
                <table className="w-full table">
                    <thead className="">
                        <tr className="">
                            <th className="p-4 text-left">
                                <span className="font-bold">Name</span>
                            </th>
                            <th className="p-4 text-left">
                                <span className="table-title-id">Shift ID</span>
                            </th>
                            <th className="p-4 text-left">
                                <span className="table-title-email">Shift type</span>
                            </th>
                            <th className="p-4 text-left">
                                <span className="table-title-role">Time</span>
                            </th>
                        </tr>
                    </thead>
                    {Array.isArray(shiftList) && shiftList?.length === 0 ? (
                        <div className="no-result-text">NO RESULT</div>
                    ) : (
                        <tbody className="tbody">
                            {shiftList?.map(({ id, name, code, shift_type, time_slot }) => (
                                <ShiftItem
                                    key={id}
                                    name={name}
                                    code={code}
                                    shift_type={shift_type}
                                    time_slot={time_slot}
                                />
                            ))}
                        </tbody>
                    )}
                </table>
            </div>)}
        </div>
    )
}

export default WorkingSchedule