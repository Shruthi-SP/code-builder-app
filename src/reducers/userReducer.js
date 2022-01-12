const userInitialValue = {}

const userReducer = (state=userInitialValue, action) => {
    switch (action.type) {
        case 'SET_USER' : {
            return {...action.payload}
        }
        // case 'REMOVE_USER' :{
        //     return {...userInitialValue}
        // } 
        default : {
            return {...state}
        }
    }
}
export default userReducer