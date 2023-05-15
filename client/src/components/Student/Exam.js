import React from 'react'

const Exam = ({ exam, index, onClick }) => {

    const startDate = exam.startDate.split("T")[0]
    const startTime = exam.startDate.split("T")[1].split(".")[0]

    const endDate = exam.endDate.split("T")[0]
    const endTime = exam.endDate.split("T")[1].split(".")[0]

    const dt1 = new Date(exam.startDate)
    const dt2 = new Date(exam.endDate)

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    var text = ""

    diff /= 60;
    diff /= 60;
    text = "hrs"

    if (diff < 1) {
        diff *= 60
        text = "minutes"
    }
    diff = Math.round(diff)


    return (
        <tr className='text-center h-[50px] bg-white rounded-md shadow-md shadow-orange-50'>
            <td>{index + 1}</td>
            <td>
                {exam.name}
            </td>

            <td>
                {startTime}
            </td>
            <td>
                {startDate}
            </td>

            <td>
                {endTime}
            </td>
            <td>
                {endDate}
            </td>
            <td>
                {diff} {text}
            </td>
            <td>
                <button
                    onClick={e => onClick(exam._id)}
                    className='font-semibold bg-orange-400 rounded-md shadow-md px-3 py-1 text-white hover:bg-orange-500 transition'>Start</button>
            </td>
        </tr>
    )
}

export default Exam