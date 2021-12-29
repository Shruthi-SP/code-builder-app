//const codesInitialValue = []
const codesInitialValue = {
    data: [],
    isLoading: false
}

const codesReducer = (state=codesInitialValue, action) => {
    switch (action.type) {
        case 'GET_ALL_CODES': {
            //return [...action.payload]
            return {data:[...action.payload], isLoading:true}
        }
        case 'ADD_CODE': {
            //return [...state, action.payload]
            return {data:[...state.data, action.payload], isLoading:true}
        }
        case 'UPDATE_CODE': {
            // return state.map(ele => {
            //     if(ele._id === action.payload._id){
            //         return {...ele, ...action.payload}
            //     }
            //     else {
            //         return {...ele}
            //     }
            // })
            const result = state.data.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                } else {
                    return {...ele}
                }
            })
            return {isLoading:true, data: result}
        }
        case 'DELETE_CODE': {
            // return state.filter(ele => {
            //     return ele._id !== action.payload._id
            // })
            const result = state.data.filter(ele => {
                return ele._id !== action.payload._id
            })
            return {isLoading:true, data:result}
        }
        default : {
            return {...state}
        }
    }
}
export default codesReducer