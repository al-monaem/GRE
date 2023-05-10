const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
    questions: [{
        id: 1,
        question: "",
        options: [{
            id: 1,
            option: ""
        }, {
            id: 2,
            option: ""
        }, {
            id: 3,
            option: ""
        }, {
            id: 4,
            option: ""
        }],
        correct: []
    }]
}

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        loadQuestions: (state, action) => {
            state.questions = action.payload
        },
        addQuestion: (state) => {
            state.questions.push({
                id: state.questions.length + 1,
                question: "",
                options: [{
                    id: 1,
                    option: ""
                }, {
                    id: 2,
                    option: ""
                }, {
                    id: 3,
                    option: ""
                }, {
                    id: 4,
                    option: ""
                }],
                correct: []
            })
        },
        updateQuestion: (state, action) => {
            state.questions.find(question => question.id === action.payload.id).question = action.payload.question
        },
        deleteQuestion: (state) => {
            if (state.questions.length > 1)
                state.questions.pop()
        },
        addOption: (state, action) => {
            const question = state.questions.find(question => question.id === action.payload.questionId)
            question.options.push({
                id: question.options.length + 1,
                option: ""
            })
        },
        updateOption: (state, action) => {
            const options = state.questions.find(question => question.id === action.payload.questionId).options
            options.find(option => option.id === action.payload.id).option = action.payload.option
        },
        deleteOption: (state, action) => {
            const question = state.questions.find(question => question.id === action.payload.questionId)
            if (question.options.length > 2)
                question.options.pop()
        },
        setAnswer: (state, action) => {
            const correctAnswers = state.questions.find(question => question.id === action.payload.questionId).correct
            if (!correctAnswers.includes(action.payload.value))
                correctAnswers.push(action.payload.value)
        },
        removeAnswer: (state, action) => {
            const array = state.questions.find(question => question.id === action.payload.questionId).correct
            const index = array.indexOf(action.payload.value);
            if (index > -1) {
                array.splice(index, 1);
            }
        }
    }
})

export const { deleteOption, setAnswer, removeAnswer, addQuestion, updateQuestion, addOption, updateOption, loadQuestions, deleteQuestion } = questionSlice.actions
export default questionSlice.reducer