import Header from "../../Header"

import { useDispatch, useSelector } from "react-redux"
import Question from "./Question"

import { AiOutlineQuestionCircle } from "react-icons/ai"
import { addQuestion, deleteQuestion, loadQuestions } from "../../../app/features/question/questionSlice"
import { useEffect } from "react"
import { MdDelete, MdNavigateNext } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const Create = () => {

    const dispatch = useDispatch()
    const questions = useSelector((state) => state.questionReducer.questions)
    const navigate = useNavigate()

    const onClick = e => {
        dispatch(addQuestion())
    }

    useEffect(() => {
        const ques = JSON.parse(localStorage.getItem("questions"))
        if (ques) {
            dispatch(loadQuestions(ques))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("questions", JSON.stringify(questions))
    }, [questions])

    return (
        <div className="w-full h-screen bg-[#fafafa]">
            <Header title={"Create Exam"} />
            <div className="w-full h-auto flex pb-5 justify-center">
                <div className="w-[85%] flex">
                    <button
                        onClick={onClick}
                        className="hover:bg-[#bb703f] transition ml-auto bg-[#ff9248] px-2 py-1 rounded-md shadow-md text-white flex items-center font-semibold">
                        <AiOutlineQuestionCircle />&nbsp;Add New Question
                    </button>
                </div>
            </div>
            <div className="flex-col flex w-full items-center h-[75%]">
                <div className="flex w-[85%] px-1 flex-col space-y-5 items-center overflow-y-scroll rounded-lg">
                    {questions.map((question) => {
                        return (
                            <Question questionId={question.id} questionText={question.question} />
                        )
                    })}
                </div>
                <div className="w-full h-auto flex pb-5 mt-3 justify-center">
                    <div className="w-[85%] flex">
                        <button
                            onClick={() => navigate("./schedule")}
                            className="flex items-center px-2 py-1 transition bg-orange-400 hover:bg-orange-500 text-white rounded-md font-semibold">
                            <MdNavigateNext className="" />
                            Next
                        </button>
                        <button
                            onClick={() => {
                                dispatch(deleteQuestion())
                            }}
                            className="flex items-center ml-auto px-2 py-1 transition bg-[#CC0202] hover:bg-[#8f1313] text-white rounded-md font-semibold">
                            <MdDelete className="mr-1" />
                            Delete Question
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Create