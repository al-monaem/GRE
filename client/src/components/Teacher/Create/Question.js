import { useDispatch, useSelector } from "react-redux"
import { addOption, deleteOption, removeAnswer, setAnswer, updateOption, updateQuestion } from "../../../app/features/question/questionSlice"
import "./Question.css"

import { IoMdAddCircle } from "react-icons/io"
import { AiFillMinusCircle } from "react-icons/ai"

import { motion } from "framer-motion"

const Question = ({ questionId, questionText }) => {

    const question = useSelector((state) => state.questionReducer.questions.find(qid => qid.id === questionId))
    const dispatch = useDispatch()

    const onChangeQuestion = e => {
        dispatch(updateQuestion({
            id: questionId,
            question: e.target.value
        }))
    }

    const onChangeOption = (e, id) => {
        dispatch(updateOption({
            id: id,
            questionId: questionId,
            option: e.target.value
        }))
    }

    const handleCheck = e => {
        if (e.target.checked)
            dispatch(setAnswer({
                questionId: questionId,
                value: e.target.value
            }))
        else {
            dispatch(removeAnswer({
                questionId: questionId,
                value: e.target.value
            }))
        }
    }

    const onAdd = e => {
        dispatch(addOption({
            questionId: questionId
        }))
    }
    const onDelete = e => {
        dispatch(deleteOption({
            questionId: questionId
        }))
    }

    return (
        <div
            className="w-full flex flex-col bg-white p-5 rounded-lg shadow-md border border-orange-400">
            <div className="flex">
                <span className="font-semibold text-lg">{questionId})</span>&nbsp;&nbsp;
                <textarea value={questionText} onChange={e => onChangeQuestion(e)} className="w-full border px-2 py-1" placeholder="Enter a question" />
            </div>
            <div className="p-3 flex flex-col space-y-1">
                {question.options.map((option, index) => {
                    return <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 100, y: 0 }}
                        className="flex items-center">
                        {option.id}.&nbsp;&nbsp;
                        <input
                            onChange={e => onChangeOption(e, option.id)}
                            value={option.option}
                            className="px-2 py-1 rounded-md w-50% border focus:outline-none" placeholder="Enter option" />
                        <div className="checkbox-container">
                            <input
                                className="ml-2"
                                onClick={e => handleCheck(e)}
                                value={option.id} type="checkbox"
                                checked={question.correct.includes(option.id.toString())}
                            />
                        </div>
                    </motion.div>
                })}
            </div>
            <div className="flex space-x-3">
                <div
                    onClick={e => onAdd(e)}
                    className="flex w-[30px] rounded-full bg-gray-100 hover:bg-lime-500 transition cursor-pointer text-orange-400 hover:text-white">
                    <IoMdAddCircle className="p-1 h-[30px] w-[30px]" />
                </div>
                <div
                    onClick={e => onDelete(e)}
                    className="flex w-[30px] rounded-full bg-gray-100 hover:bg-red-500 transition cursor-pointer text-orange-400 hover:text-white">
                    <AiFillMinusCircle className="p-1 h-[30px] w-[30px]" />
                </div>
            </div>
        </div>

    )
}

export default Question