const codesInitialValue = []

const codesReducer = (state=codesInitialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_CODES': {
            return [...action.payload]
        }
        case 'ADD_CODE': {
            return [...state, action.payload]
        }
        case 'UPDATE_CODE': {
            return state.map(ele => {
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }
                else {
                    return {...ele}
                }
            })
        }
        case 'DELETE_CODE': {
            return state.filter(ele => {
                return ele._id !== action.payload._id
            })
        }
        default : {
            return [...state]
        }
    }
}
export default codesReducer