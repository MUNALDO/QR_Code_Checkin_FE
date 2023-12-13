import { Link } from "react-router-dom"

const EmployeeTodayItem = (props) => {
    const { id, name, role, position, department_name, schedules } = props;
    return (
        <tr className="tr-item">
            <td className="p-2 hover:text-buttonColor2">
                <h2 className="text-left">
                    {/* <Link className="img-table-item-block" to={`viewprofile/${uuid}`}>
                        <img className="img-table-item" src={imageUrl} alt="" />
                    </Link> */}
                    <Link className="cursor-pointer flex flex-col" to={`employee/view-profile/${id}`}>{name}
                        <span className="text-xs text-neutral-400">{role}</span>
                    </Link>
                </h2>
            </td>
            <td className="p-2">{id}</td>
            <td className="p-2">{department_name}</td>
            <td className="p-2">{position}</td>
        </tr>
    )
}

export default EmployeeTodayItem