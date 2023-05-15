import { useEffect, useState } from "react"
import Header from "../Header"
import { axiosInstance } from "../../auth/axiosInsatnce"
import { useDispatch, useSelector } from "react-redux"
import { update } from "../../app/features/exam/examSlice"
import Exam from "./Exam"

import { successToast, errorToast } from "../../utils/toast"

const ScheduledExam = () => {

    const exams = useSelector(state => state.examReducer.exams)
    const student = useSelector(state => state.userReducer.user)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const load = async () => {
        try {
            const result = await axiosInstance.post("/student/getExams", { sectionId: student.sectionId })
            //console.log(result.data)
            dispatch(update(result.data))
            setLoading(false)

        } catch (error) {
            setError(error.responce.data.message)
            setLoading(false)
        }
    }

    const onClick = async (examId) => {
        console.log(examId)

        try {

            const result = await axiosInstance.get(`/student/attendExam/${examId}`)
            console.log(result)
            if (result.data.error.message) {
                errorToast(result.data.error.message)
                return
            }

        } catch (error) {
            setError(error.responce.data.message)
        }

    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div className="flex flex-col h-full">
            <Header title={"Attend Exam"} />
            <div className="p-10 h-full">
                {exams.length === 0 &&
                    <div className="flex justify-center items-center h-full">
                        <span className="text-2xl font-semibold tracking-wider">No available exams to attend</span>
                    </div>
                }
                {exams.length > 0 &&
                    <div>
                        <table className='w-full border-spacing-4 border-collapse'>
                            <tr className='h-[50px] border-b bg-white rounded-md shadow-md shadow-orange-50'>
                                <th>SL No.</th>
                                <th>Exam Name</th>
                                <th>Start Time</th>
                                <th>Start Date</th>
                                <th>End Time</th>
                                <th>End Date</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                            {exams.map((exam, index) => {
                                return <Exam exam={exam} index={index} onClick={onClick} />
                            })}
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default ScheduledExam