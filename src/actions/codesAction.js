import axios from '../config/axios-config'

export const asyncGetAllCodes = () => {
    console.log('inside asyncGetAllCodes')
    return (dispatch) => {
        axios.get()
            .then((response) => {
                console.log('inside then')
                const result = response.data
                console.log('axios get all codes res=', result)
                if (result.hasOwnProperty('errors')) {
                    console.log(result.errors)
                } else {
                    dispatch(getAllCodes(result))
                }
            })
            .catch((err) => {
                console.log('inside Catch block', err)
                alert(err.message)
            })
    }
}
export const asyncAddCode = (formData, resetForm, redirect) => {
    console.log('inside async add code')
    return (dispatch) => {
        axios.post('',formData)
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
                    redirect(result._id)  
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
        axios.get(`/${_id}`)
            .then(response=>{
                const result = response.data
                console.log('axios get 1 code res =', result)
                getResult(result)
            })
            .catch(err=>{
                console.log('put err=', err)
                alert(err.message)
            })
    }
}
export const asyncUpdateCode = (obj, formData) => {
    return (dispatch) => {
        axios.put(`/${obj._id}`, formData)
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
export const asyncDeleteCode = (id, redirect) => {
    console.log('deleteCode id=', id)
    return (dispatch) => {
        axios.delete(`/${id}`)
            .then(response=>{
                const result = response.data
                console.log('axios delete res result=', result)
                dispatch(deleteCode(result))
                redirect()
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
        axios.post(`/${id}/snippets`, formData)
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
    console.log('inside asyncUpdateSnippet', codeId, snipId, formData)
    return (dispatch) => {
        axios.put(`/${codeId}/snippets/${snipId}`, formData)
            .then(response =>{
                console.log(response)
                const result = response.data
                console.log('editing snippet=', result)
                dispatch(updateCode(result))
            })
            .catch(err=>{
                console.log('inside catch.put snippet err=', err)
                alert(err.message)
            })
    }
}
export const asyncDeleteSnippet = (codeId, snipId) => {
    console.log('inside delete snippet', codeId, snipId)
    return (dispatch) => {
        axios.delete(`/${codeId}/snippets/${snipId}`)
            .then(response=>{
                console.log(response)
                const result = response.data
                console.log('deleting snippet', result)
                dispatch(updateCode(result))
            })
            .catch(err=>{
                console.log('delete snippet err=', err)
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