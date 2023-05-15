const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    sections: [],
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        add: (state, action) => {
            state.sections.push(action.payload)
        },
        update: (state, action) => {
            state.sections = action.payload
        }
    }
})

export const { update, add } = questionSlice.actions
export default questionSlice.reducer