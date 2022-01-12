const array = [
    {id: 1, user_name: 'admin1', email:'admin1@dct.com', password:'secret123', role:'admin'},
    {id: 1, user_name: 'student1', email:'student1@dct.com', password:'secret123', role:'student'},
    {id: 1, user_name: 'student2', email:'student2@dct.com', password:'secret123', role:'student'},
]

export const asyncSetUser = (formData, getData) => {
    return (dispatch) => {
        let obj={}
        array.forEach(ele=>{
            if(ele.email === formData.email && ele.password === formData.password){
                console.log('async setuser found', formData, ele)
                obj={...ele}
            }
        })
        if(Object.keys(obj).length === 0){
            const result = {}
                result.errors = 'Invalid email or password'
                console.log('async setuser err res', result.errors)
                alert(result.errors)
        } else {
            dispatch(setUser(obj))
            console.log('async setuser success response', obj)
            alert('Login successful')
            getData(obj)
        }
    }
}
export const setUser = (obj) => {
    return { type: 'SET_USER', payload: obj}
}