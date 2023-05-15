const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    user: {
        id: "",
        name: "",
        email: "",
        sectionId: "",
        examsTaken: [],
        isAdmin: ""
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        update: (state, action) => {
            state.user = action.payload
        },
        reset: (state) => {
            return initialState
        }
    }
})

export const { update, reset } = userSlice.actions
export default userSlice.reducer