import axios from 'axios'

export const asyncGetAllCodes = () => {
    console.log('inside asyncGetAllCodes')
    return (dispatch) => {
        axios.get('http://localhost:3044/api/code-snippets')
            .then((response) => {
                console.log('inside then')
                const result = response.data
                console.log('axios res=', result)
                if (result.hasOwnProperty('errors')) {
                    console.log(result.errors)
                } else {
                    dispatch(getAllCodes(result))
                }
            })
            .catch((err) => {
                console.log('inside Catch block')
                alert(err.message)
            })
    }
}
export const asyncAddCode = (formData, resetForm) => {
    console.log('inside async add code')
    return (dispatch) => {
        axios.post('http://localhost:3044/api/code-snippets', formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    console.log('errors=', result.errors)
                    alert('fields cannot be empty')
                }
                else {
                    console.log('axios post code=', result)
                    dispatch(addCode(result))
                    resetForm()
                    //redirect(result._id)   
                }
            })
            .catch((err) => {
                console.log('inside Catch block', err)
                alert(err.message)
            })
    }
}
export const asyncGetCode = (_id, getResult) => {
    return (dispatch) => {
        axios.get(`http://localhost:3044/api/code-snippets/${_id}`)
            .then(response=>{
                const result = response.data
                console.log('axios put res result=', result)
                getResult(result)
            })
            .catch(err=>{
                console.log('put err=', err)
                alert(err.message)
            })
    }
}
export const asyncUpdateCode = (obj, resetForm, redirect) => {
    return (dispatch) => {
        axios.put(`http://localhost:3044/api/code-snippets/${obj._id}`)
            .then(response=>{
                const result = response.data
                console.log('axios put res result=', result)
                dispatch(updateCode(result))
            })
            .catch(err=>{
                console.log('put err=', err)
                alert(err.message)
            })
    }
}
export const asyncDeleteCode = (obj, resetForm, redirect) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3044/api/code-snippets/${obj._id}`)
            .then(response=>{
                const result = response.data
                console.log('axios put res result=', result)
                dispatch(deleteCode(result))
            })
            .catch(err=>{
                console.log('put err=', err)
                alert(err.message)
            })
    }
}

export const asyncAddSnippet = (id, formData) => {
    console.log('inside asyncAddSnippet')
    return (dispatch) => {
        axios.post(`http://localhost:3044/api/code-snippets/${id}/snippets`, formData)
            .then(response =>{
                console.log(response)
                const result = response.data
                console.log('adding snippet=', result)
                dispatch(updateCode(result))
            })
            .catch(err=>{
                console.log('inside catch')
                console.log('post snippet err=', err)
                alert(err.message)
            })
    }
}
export const asyncUpdateSnippet = (codeId, snipId, formData) => {
    console.log('inside asyncEditSnippet', codeId, snipId, formData)
    return (dispatch) => {
        axios.put(`http://localhost:3044/api/code-snippets/${codeId}/snippets/${snipId}}`, formData)
            .then(response =>{
                console.log(response)
                const result = response.data
                console.log('editing snippet=', result)
                dispatch(updateCode(result))
            })
            .catch(err=>{
                console.log('inside catch')
                console.log('put snippet err=', err)
                alert(err.message)
            })
    }
}

export const getAllCodes = (codes) => {
    console.log('inside action')
    return { type: 'GET_ALL_CODES', payload: codes }
}
export const addCode = (code) => {
    return { type: 'ADD_CODE', payload: code }
}
export const updateCode = (code) => {
    return { type:'UPDATE_CODE', payload: code }
}
export const deleteCode = (code) => {
    return { type:'DELETE_CODE', payload: code }
}