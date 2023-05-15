import { useNavigate } from "react-router-dom"
import logo from "../../images/exam.png"
import { useEffect, useState } from "react";
import { axiosInstance } from "../../auth/axiosInsatnce"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../../app/features/user/userSlice";

const Login = () => {

    const user = useSelector(state => state.userReducer.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async e => {
        e.preventDefault()
        setError("")

        try {
            const result = await axiosInstance.post("/auth/login", {
                email,
                password
            })

            dispatch(update(result.data))

            console.log(result.data)
        } catch (error) {
            setError(error.response.data.message)
            return
        }
    }

    useEffect(() => {
        if (user.isAdmin === true) {
            navigate("/admin/create")
        }
        else if (user.isAdmin === false) {
            navigate("/student/attend")
        }
        else {
            return
        }
    }, [user])

    return (
        <div className="w-screen h-screen flex">
            <div className="flex w-[35%] items-center justify-center">
                <img className="scale-[70%] mb-20" src={logo} alt="" />
            </div>
            <div className="flex flex-col w-[65%] items-center justify-center">
                <form onSubmit={e => onSubmit(e)} className="w-[50%] shadow-md shadow-orange-100 p-10 rounded-md flex flex-col">
                    <h className="mb-5 w-full text-center font-semibold tracking-wider text-2xl">Login</h>
                    <div className="flex flex-col space-y-5">
                        <div className="flex flex-col">
                            <span className="p-1 font-semibold">Email</span>
                            <input
                                name="email"
                                onChange={e => {
                                    setEmail(e.target.value)
                                    setError("")
                                }}
                                className="text-sm border px-3 py-2 rounded-md focus:outline-orange-400"
                                placeholder="Enter your email"
                                type="email"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="p-1 font-semibold">Password</span>
                            <input
                                name="password"
                                onChange={e => {
                                    setPassword(e.target.value)
                                    setError("")
                                }}
                                className="text-sm border px-3 py-2 rounded-md focus:outline-orange-400"
                                placeholder="Enter your password"
                                type="password"
                                required
                            />
                            <span className="p-1 text-xs text-red-500 tracking-wider">{error}</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button className="text-white font-semibold w-full text-center py-2 px-3 bg-orange-400 rounded-md">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login