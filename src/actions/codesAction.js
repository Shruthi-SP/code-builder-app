import axios from '../config/axios-config'

export const asyncGetAllCodes = () => {
    return (dispatch) => {
        axios.get()
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.errors)
                } else {
                    dispatch(getAllCodes(result))
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
export const asyncAddCode = (formData, resetForm, redirect) => {
    return (dispatch) => {
        axios.post('',formData)
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    alert('fields cannot be empty')
                }
                else {
                    dispatch(addCode(result))
                    resetForm()
                    redirect(result._id)  
                }
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
export const asyncGetCode = (_id, getResult) => {
    return (dispatch) => {
        axios.get(`/${_id}`)
            .then(response=>{
                const result = response.data
                getResult(result)
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}
export const asyncUpdateCode = (obj, formData) => {
    return (dispatch) => {
        axios.put(`/${obj._id}`, formData)
            .then(response=>{
                const result = response.data
                dispatch(updateCode(result))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}
export const asyncDeleteCode = (id, redirect) => {
    return (dispatch) => {
        axios.delete(`/${id}`)
            .then(response=>{
                const result = response.data
                dispatch(deleteCode(result))
                redirect()
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}

export const asyncAddSnippet = (id, formData) => {
    return (dispatch) => {
        axios.post(`/${id}/snippets`, formData)
            .then(response =>{
                const result = response.data
                dispatch(updateCode(result))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}
export const asyncUpdateSnippet = (codeId, snipId, formData) => {
    return (dispatch) => {
        axios.put(`/${codeId}/snippets/${snipId}`, formData)
            .then(response =>{
                const result = response.data
                dispatch(updateCode(result))
            })
            .catch(err=>{
                alert(err.message)
            })
    }
}
export const asyncDeleteSnippet = (codeId, snipId) => {
    return (dispatch) => {
        axios.delete(`/${codeId}/snippets/${snipId}`)
            .then(response=>{
                const result = response.data
                dispatch(updateCode(result))
            })
            .catch(err=>{
                alert('delete snippet err=', err)
            })
    }
}

export const getAllCodes = (codes) => {
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