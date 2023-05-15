import { NavLink, Outlet, useNavigate } from "react-router-dom"
import exam from "../../images/exam.png"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { BiHistory, BiHomeAlt2 } from "react-icons/bi"
import { IoCreateOutline, IoPersonAddOutline } from "react-icons/io5"
import { HiUserGroup } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { reset } from "../../app/features/user/userSlice"

const style = {
    link: "w-[80%] py-2 px-3 rounded-lg hover:bg-[#ff9248] hover:text-white tracking-wide flex items-center transition",
    link_selected: "w-[80%] py-2 px-3 rounded-lg bg-[#ff9248] text-white font-bold tracking-wide flex items-center"
}

const Navbar = () => {

    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = e => {
        dispatch(reset())
    }

    return (
        <div className="flex h-screen w-screen">
            <div className="w-[15%] h-full flex flex-col">
                <div className="flex items-center justify-center"><img className="p-5 w-[70%]" src={exam} alt="" /></div>
                <div className="flex flex-col items-center space-y-1 text-sm">
                    {user.isAdmin &&
                        <>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/dashboard"} exact><BiHomeAlt2 />&nbsp;Dashboard</NavLink>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/register"}><IoPersonAddOutline />&nbsp;Register</NavLink>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/sections"}><HiUserGroup />&nbsp;Section</NavLink>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/create"}><IoCreateOutline />&nbsp;Create</NavLink>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/admin/upload"}><AiOutlineCloudUpload />&nbsp;Upload</NavLink>
                        </>
                    }
                    {!user.isAdmin &&
                        <>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/student/dashboard"}><BiHomeAlt2 />&nbsp;Dashboard</NavLink>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/student/attend"}><BiHistory />&nbsp;Attend Exam</NavLink>
                            <NavLink className={({ isActive }) => isActive ? `${style.link_selected}` : `${style.link}`} to={"/student/history"}><BiHomeAlt2 />&nbsp;Exam History</NavLink>
                        </>
                    }
                    <NavLink onClick={logout} className={`${style.link}`} to={"/login"}><AiOutlineCloudUpload />&nbsp;Logout</NavLink>
                </div>
            </div>
            <div className="w-[85%] bg-[#fafafa]">
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar