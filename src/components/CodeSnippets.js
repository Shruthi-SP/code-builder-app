import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CodeSnippetForm from "./CodeSnippetForm"
import { buildFor } from "./tools/helper"
import { asyncGetCode } from "../actions/codesAction"

const CodeSnippets = (props) => {
    console.log('code snippet compt props=', props)
    const _id = props.match.params.id
    console.log(_id)

    const dispatch = useDispatch()

    const getResult = (object) => setObj(object)

    useEffect(() => {
        console.log('useEffect CodeSnip compt')
        dispatch(asyncGetCode(_id, getResult))
    }, [])

    const [snippetToggle, setSnippetToggle] = useState(false)
    const [obj, setObj] = useState({})

    const handleEditSnippets = () => {
        setSnippetToggle(true)
    }
    const handleEditCode = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h3>Edit code or Create a snippet</h3>
            {snippetToggle && <CodeSnippetForm codeId={_id} />}
            {
                Object.keys(obj).length > 0 ? <div>
                <code><b>Title: {obj.title}</b></code><br />
                <code>Statement: {obj.statement}</code><br />
                {
                    obj.snippets.length > 0 && obj.snippets.map((ele, i) => {
                        return <code key={i}>
                            {buildFor(ele)}
                        </code>
                    })
                }
                <br /><button style={{ margin: '2px' }} onClick={handleEditCode}>Edit Code</button>
                <button style={{ margin: '2px' }}>Remove Code</button>
                
                <button style={{ margin: '2px' }} onClick={handleEditSnippets}>Edit/Add Snippets</button>
                </div> : <div>
                    <p>No Object</p>
                </div>
            }
        </div>
    )
}
export default CodeSnippets 