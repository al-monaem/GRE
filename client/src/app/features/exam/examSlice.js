const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    exams: []
}

const examSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {
        update: (state, action) => {
            state.exams = action.payload
        }
    }
})

export const { update } = examSlice.actions
export default examSlice.reducer