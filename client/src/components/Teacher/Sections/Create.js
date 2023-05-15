import { useState } from "react"
import { axiosInstance as axios } from "../../../auth/axiosInsatnce"
import Loading from "../../../animations/Loading"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { add } from "../../../app/features/section/sectionSlice"

const style = {
    input_container: "p-4 flex flex-col w-[30%] space-y-1",
    label: "p-1 font-semibold",
    input: "px-2 py-1 border rounded-md focus:outline-orange-400",
    button: "px-3 py-1 rounded-md shadow-md bg-orange-400 hover:bg-orange-500 transition text-white font-semibold"
}

const Create = () => {

    const [sectionName, setSectionName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const dispatch = useDispatch()

    const onChange = e => {
        setSectionName(e.target.value)
        setError("")
    }
    const onClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post('/admin/createSection', {
                name: sectionName
            })
            //const data = result.data
            //console.log(result)
            setError("")
            toast.success("Section created.", {
                bodyClassName: "success",
                icon: "✔",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            e.target.reset()
            dispatch(add(result.data))

        } catch (error) {
            if (error.response.status === 400)
                setError(error.response.data.message)
            console.log(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={e => onClick(e)} className="p-10 w-full flex flex-col justify-center">
                <div className="w-full items-center flex border border-orange-400 rounded-md shadow-md">
                    <div className={style.input_container}>
                        <span className={style.label}>Enter Section Name</span>
                        <div className="w-full mr-10 flex items-center space-x-3">
                            <input
                                readOnly={loading}
                                onChange={e => onChange(e)}
                                className={style.input} placeholder="Enter section name" required />
                            {loading && <Loading />}
                        </div>
                        <span className="text-red-500 text-xs p-1">{error}</span>
                    </div>
                </div>
                <div className="pt-3">
                    <button
                        disabled={loading}
                        type="submit"
                        className={`${style.button} ${loading ? "bg-gray-400 hover:bg-gray-400" : ""}`}>Create</button>
                </div>
            </form>
        </>

    )
}

export default Create