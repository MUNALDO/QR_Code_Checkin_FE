import "./EmployeeItem.css"
import { Link } from "react-router-dom"
const EmployeeItem = (props) => {
    const { id, name, email, status, department_name, role } = props
    return (
        <tr className="tr-item">
            <td className="p-2">
                <h2 className="">
                    {/* <Link className="img-table-item-block" to={`viewprofile/${uuid}`}>
                        <img className="img-table-item" src={imageUrl} alt="" />
                    </Link> */}
                    <Link className="cursor-pointer flex flex-col">{name}
                        <span className="text-xs text-neutral-400">{role}</span>
                    </Link>
                </h2>
            </td>
            <td className="p-2">{id}</td>
            <td className="p-2">{email}</td>
            <td className="p-2">{department_name}</td>
            <td className="p-2">{role}</td>
            <td className="p-2">{status}</td>
        </tr>
    )
}

export default EmployeeItem