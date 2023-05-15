import "./Schedule.css"
import "./Question.css"

import Header from "../../Header"
import Loading from "../../../animations/Loading"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "../../../auth/axiosInsatnce"
import { update } from "../../../app/features/section/sectionSlice"
import { types } from "../../../data/ExamTypes"
import { toast } from "react-toastify"
import { reset } from "../../../app/features/question/questionSlice"
import { useNavigate } from "react-router-dom"

const Schedule = () => {

    const dispatch = useDispatch()
    const sections = useSelector((state) => state.sectionReducer.sections)
    const questions = useSelector((state) => state.questionReducer.questions)
    const navigate = useNavigate()

    const [data, setData] = useState({
        questions: questions,
        sections: []
    })

    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [dateError, setDateError] = useState("")
    const [error, setError] = useState("")

    const load = async () => {
        setLoading(true)
        try {
            const result = await axiosInstance.get("/admin/getSections")
            console.log(result.data)
            dispatch(update(result.data))
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    const onStartDateChange = e => {
        let date = e.target.value.split("T")
        date[1] = date[1] + ":00"
        date = date.join(',')

        setStartDate(new Date(date))
        setData({
            ...data,
            startDate: date
        })
    }

    const onEndDateChange = e => {
        let date = e.target.value.split("T")
        date[1] = date[1] + ":00"
        date = date.join(',')

        setEndDate(new Date(date))
        setData({
            ...data,
            endDate: date
        })
    }

    const schedule = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await axiosInstance.post("/admin/scheduleExam", data)
            toast.success("Exam scheduled.", {
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
            setLoading(false)
            e.target.reset()
            dispatch(reset())
            navigate("/admin/create")

        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
            setLoading(false)
        }
        console.log(data)
    }

    const onChange = e => {
        if (e.target.checked && !(data.sections.includes(e.target.value))) {
            setData(prevData => {
                const arr = [...prevData.sections]
                arr.push(e.target.value)

                return {
                    ...prevData,
                    sections: arr
                }
            })
        }
        else if (!e.target.checked) {
            const index = data.sections.indexOf(e.target.value);
            setData(prevData => {
                const arr = [...prevData.sections]
                arr.splice(index, 1)

                return {
                    ...prevData,
                    sections: arr
                }
            })
        }
        else {
            return
        }
    }

    useEffect(() => {
        if (startDate < endDate) {
            setDateError("")
        }
        else {
            setDateError("Ending date-time has to be higher than starting date-time")
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (sections.length === 0) {
            load()
        }
    }, [])

    return (
        <div className="w-full flex flex-col h-screen bg-[#fafafa]">
            <Header title={"Schedule Exam"} />
            <div className="flex justify-center mt-10 w-full">
                <form onSubmit={e => schedule(e)} className="flex bg-white p-10 rounded-lg shadow-md w-[70%]">
                    <div className="flex flex-col space-y-8 w-[50%]">
                        <div className="flex flex-col space-y-8 w-[70%]">
                            <div className="flex flex-col space-y-1">
                                <span className="p-1 font-semibold">Enter Exam Name</span>
                                <input
                                    onChange={e => {
                                        setData({
                                            ...data,
                                            examName: e.target.value
                                        })
                                    }}
                                    required
                                    className="border px-2 py-1 rounded focus:outline-orange-400"
                                    placeholder="Enter exam name" />
                            </div>
                            <div className="w-full flex flex-col space-y-1">
                                <span className="p-1 font-semibold">Select Sections</span>
                                <div className="flex flex-wrap items-center justify-start">
                                    {sections.map((section) => {
                                        return <div className="flex items-center mr-3">
                                            <div className="checkbox-container mr-1 flex items-center">
                                                <input onChange={e => onChange(e)} type="checkbox" key={section._id} value={section._id} />
                                            </div>
                                            {section.name}
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="p-1 font-semibold">Select Exam Type</span>
                                <select
                                    onChange={e => {
                                        setData({
                                            ...data,
                                            examType: e.target.value
                                        })
                                    }}
                                    required
                                    className="border px-2 py-1 rounded-md focus:outline-orange-400">
                                    <option value="" selected disabled hidden>Choose here</option>
                                    {types.map((type, index) => {
                                        return <option key={index} value={type}>{type}</option>
                                    })}
                                </select>
                            </div>
                            <span className={`text-red-500 text-xs tracking-wider ${error.length > 0 ? "" : "hidden"}`}>
                                {error}
                            </span>
                            <div>
                                <button
                                    type="submit"
                                    className="flex items-center px-3 py-1 transition bg-orange-400 hover:bg-orange-500 text-white rounded-md font-semibold">Schedule</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-8 w-[50%]">
                        <div className="flex flex-col space-y-8 w-[70%]">
                            <div className="flex flex-col space-y-1">
                                <span className="p-1 font-semibold">Starting time</span>
                                <input
                                    onChange={e => onStartDateChange(e)}
                                    required
                                    className="border px-2 p-1 rounded-md focus:outline-orange-400"
                                    type="datetime-local" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="p-1 font-semibold">Closing time</span>
                                <input
                                    onChange={e => onEndDateChange(e)}
                                    required
                                    className="border px-2 p-1 rounded-md focus:outline-orange-400"
                                    type="datetime-local" />
                                <span className="text-red-500 text-xs tracking-wider">{dateError}</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Schedule