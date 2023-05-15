import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit";

import questionReducer from "./features/question/questionSlice"
import sectionReducer from "./features/section/sectionSlice"
import userReducer from "./features/user/userSlice"
import examReducer from "./features/exam/examSlice"

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const reducer = combineReducers({
    questionReducer: questionReducer,
    sectionReducer: sectionReducer,
    userReducer: userReducer,
    examReducer: examReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export default store