import Header from "../../Header"

const Schedule = () => {
    return (
        <div className="w-full h-screen bg-[#fafafa]">
            <Header title={"Schedule Exam"} />
            <div className="flex items-center justify-center w-full">
                <div className="flex bg-white p-10 rounded-lg shadow-md w-[70%] justify-between">
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-1">
                            <span className="p-1 font-semibold">Enter Exam ID</span>
                            <input required className="border px-2 py-1 rounded focus:outline-orange-400" placeholder="Enter exam id" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <span className="p-1 font-semibold">Select Section</span>
                            <select className="border px-2 py-1 rounded-md">
                                <option value="" selected disabled hidden>Choose here</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="p-1 font-semibold">Set Schedule</span>
                        <input required className="border px-2 p-1 rounded-md" type="datetime-local" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule