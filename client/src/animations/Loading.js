import { motion } from "framer-motion"

const Loading = ({ w = "5rem", h = "5rem" }) => {
    const circleStyle = {
        display: "block",
        width: "auto",
        height: "auto",
        border: "0.5rem solid #e9e9e9",
        borderTop: "0.5rem solid rgb(251 146 60)",
        borderRadius: "50%",
        top: 0,
        left: 0,
    };

    const containerStyle = {
        position: "relative",
        border: "none"
    };

    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 1,
    }

    return (
        <div style={containerStyle}>
            <motion.span
                style={circleStyle}
                animate={{ rotate: [0, 360] }}
                transition={spinTransition}
            />
        </div>
    )
}

export default Loading