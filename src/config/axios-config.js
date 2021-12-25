import Axios from 'axios'

const axios = Axios.create({
    baseURL:'http://localhost:3044/api/code-snippets'
})
export default axios