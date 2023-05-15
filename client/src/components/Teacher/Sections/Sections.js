import { useState } from "react"
import Header from "../../Header"
import { IoCreateOutline } from "react-icons/io5"
import { AiOutlineUnorderedList } from "react-icons/ai"
import Create from "./Create"
import Show from "./Show"

const style = {
    button: "transition duration-500 relative bg-orange-400 p-3 text-center flex items-center rounded-md shadow-md"
}

const Sections = () => {

    const [showCreate, setShowCreate] = useState(true)

    const [createSelected, setCreateSelected] = useState(true)
    const [showSeletected, setShowSelected] = useState(false)

    const onSelectCreate = () => {
        setCreateSelected(true)
        setShowSelected(false)
    }

    const onSelectShow = () => {
        setShowSelected(true)
        setCreateSelected(false)
    }

    return (
        <div className="h-screen bg-[#fafafa]">
            <Header title={"Modify Sections"} />
            <div className="px-10 pt-10">
                <div className="text-sm tracking-wider flex space-x-3 font-semibold text-white">
                    <button
                        onClick={onSelectCreate}
                        className={`${style.button} ${createSelected ? "bg-orange-500 shadow-inner" : ""}`}>
                        <IoCreateOutline className="mr-1" />Create New Section
                    </button>
                    <button
                        onClick={onSelectShow}
                        className={`${style.button} ${showSeletected ? "bg-orange-500 shadow-inner" : ""}`}>
                        <AiOutlineUnorderedList className="mr-1" /> Show Existing Sections
                    </button>
                </div>
            </div>
            {createSelected && <Create />}
            {showSeletected && <Show />}
        </div>
    )
}

export default Sections