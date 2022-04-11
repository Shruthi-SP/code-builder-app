import Axios from 'axios'

const axios = Axios.create({
    baseURL:'http://localhost:3043/api/code-snippets'
})
export default axios