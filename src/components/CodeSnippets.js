import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import CodeSnippetForm from "./CodeSnippetForm"
import { buildFor } from "./tools/helper"
import { asyncDeleteCode, asyncGetCode } from "../actions/codesAction"
import EditCode from "./EditCode"
import { Button, ButtonGroup, Typography } from "@mui/material"
import {Delete, Edit, Add} from "@mui/icons-material"
import ErrorBoundary from "./ErrorBoundary"

const CodeSnippets = (props) => {
    console.log('code snippet compt props=', props, props.match.params.id)
    const { admin } = props
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
    console.log('code Snippet cmpt=', obj)

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
            {
                admin ? <div style={{ margin: '5px' }}>
                    <Typography variant="h5" color="primary.dark">Code and Snippets</Typography>
                    {snippetToggle ? <><ErrorBoundary><CodeSnippetForm admin={admin} codeId={_id} {...props} /></ErrorBoundary></> : <>
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
                                <br /><br />
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button sx={{ mr: 1 }} startIcon={<Edit />} onClick={handleEditCode}>Edit Code</Button>
                                    <Button sx={{ mr: 1 }} startIcon={<Delete />} onClick={handleRemoveCode}>Remove Code</Button>
                                    <Button startIcon={<><Edit /><Add /></>} onClick={handleEditSnippets}>Snippets</Button>
                                </ButtonGroup>
                            </div> : <div>
                                <p>No Object</p>
                            </div>
                        }
                    </>
                    }

                </div> : <><ErrorBoundary><CodeSnippetForm admin={admin} codeId={_id} {...props} /></ErrorBoundary></>
            }
            <h2>Error Boundaries. Sibling of CodeSnippetForm component</h2>
            <p>Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.</p>
        </div>
    )
}
export default CodeSnippets 