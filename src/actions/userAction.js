const array = [
    {id: 1, user_name: 'admin1', email:'admin1@dct.com', password:'secret123', role:'admin', account_type:'dct'},
    {id: 1, user_name: 'student1', email:'student1@dct.com', password:'secret123', role:'student', account_type:'dct'},
    {id: 1, user_name: 'student2', email:'student2@dct.com', password:'secret123', role:'student', account_type:'dct'},
]

export const asyncRegister = (formData, resetForm, redirect) => {
    return () => {
        array.push(formData)
        resetForm()
        redirect()
        alert('registered successfully')
    }
}

export const asyncSetUser = (formData, getData) => {
    return (dispatch) => {
        let obj={}
        array.forEach(ele=>{
            if(ele.email === formData.email && ele.password === formData.password){
                obj={...ele}
            }
        })
        if(Object.keys(obj).length === 0){
            const result = {}
                result.errors = 'Invalid email or password'
                alert(result.errors)
        } else {
            dispatch(setUser(obj))
            getData(obj)
            if(!localStorage.getItem('user')){
                alert('Login successful')
            }
            localStorage.setItem('user', JSON.stringify(obj))
        }
    }
}
export const setUser = (obj) => {
    return { type: 'SET_USER', payload: obj}
} 
export const removeUser = () => {
    return { type: 'REMOVE_USER'}
}