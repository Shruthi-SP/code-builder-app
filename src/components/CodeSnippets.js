import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import CodeSnippetForm from "./CodeSnippetForm"
import { buildFor } from "./tools/helper"
import { asyncDeleteCode, asyncGetCode } from "../actions/codesAction"
import EditCode from "./EditCode"

const CodeSnippets = (props) => {
    console.log('code snippet compt props=', props, props.match.params.id)
    const _id = props.match.params.id

    const dispatch = useDispatch()

    const getResult = (object) => setObj(object)

    useEffect(() => {
        console.log('useEffect CodeSnip compt')
        dispatch(asyncGetCode(_id, getResult))
    }, [])

    const [codeToggle, setCodeToggle] = useState(false)
    const [snippetToggle, setSnippetToggle] = useState(false)
    const [obj, setObj] = useState({})

    const redirect = () => {
        console.log('redirecting from code snippets to codes list')
        props.history.push('/codes')
    }

    const handleEditSnippets = () => {
        setSnippetToggle(!snippetToggle)
    }
    const handleEditCode = (e) => {
        setCodeToggle(!codeToggle)
    }
    const handleCancelCode = () => {
        setCodeToggle(false)
    }
    const handleRemoveCode = (e) => {
        dispatch(asyncDeleteCode(_id, redirect))
    }

    return (
        <div>
            <h3>Edit code or Create a snippet</h3>
            {snippetToggle ? <><CodeSnippetForm codeId={_id} handleEditSnippets={handleEditSnippets} {...props} /></> : <>
                {
                    Object.keys(obj).length > 0 ? <div>
                        {
                            codeToggle ? <EditCode code={obj} handleEditCode={handleEditCode} handleCancelCode={handleCancelCode} /> : <>
                                <code><b>Title: {obj.title}</b><br /></code>
                                <code><b>Statement: {obj.statement}</b></code><br />
                            </>
                        }
                        {
                            obj.snippets.length > 0 && obj.snippets.map((ele, i) => {
                                return <code key={i}>
                                    {buildFor(ele)}
                                </code>
                            })
                        }
                        <br /><button style={{ margin: '2px' }} onClick={handleEditCode}>Edit Code</button>
                        <button style={{ margin: '2px' }} onClick={handleRemoveCode}>Remove Code</button>

                        <button style={{ margin: '2px' }} onClick={handleEditSnippets}>Edit/Add Snippets</button>
                    </div> : <div>
                        <p>No Object</p>
                    </div>
                }
            </>
            }

        </div>
    )
}
export default CodeSnippets 