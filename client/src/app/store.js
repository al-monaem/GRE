import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./features/question/questionSlice"

const store = configureStore({
    reducer: {
        questionReducer: questionReducer
    }
})

export default store