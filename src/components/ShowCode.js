import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Hints from "./Hints"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"
import CodeSolution from "./CodeSolution"

const ShowCode = (props) => {
    const { isSubmitted, handleIsSubmit, codeId, handleInputChange, handleInputBlur, handleSubmitAns, errors, string } = props

    console.log('showCode props=', props)

    const codeSnippet = useSelector(state => {
        console.log('total questions', state.codes)
        const obj = state.codes.data.find(ele => ele._id === codeId)
        console.log('selected question snippets', obj)
        return obj
    })

    const getHints = (a) => {
        const ar = []
        a.forEach(ele => {
            if (ele.hasOwnProperty('hint')) {
                if (ele.hint !== '') {
                    ar.push(ele.hint)
                }
            }
        })
        return ar
    }

    const [code, setCode] = useState(codeSnippet || {})
    const [hints, setHints] = useState([])
    const [solution, setSolution] = useState(false)

    useEffect(() => {
        if (codeSnippet) {
            setCode(codeSnippet)
            const a = getHints(codeSnippet.snippets)
            setHints(a)
        }
    }, [codeSnippet])

    const handleSolution = () => {
        handleIsSubmit()
        setSolution(!solution)
    }

    const buildFor = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return <Break />
        } else if (ele.group === 'tab') {
            return <Tab />
        } else if (ele.group === 'doubleTab') {
            return <><Tab /><Tab /></>
        } else if (ele.group === 'space') {
            return <Space />
        } else if (ele.group === 'submit') {
            return <Submit />
        } else if (ele.group === 'input') {
            return <Input ele={ele} isSubmitted={isSubmitted} handleInputChange={handleInputChange} handleInputBlur={handleInputBlur} />
        }
    }

    return <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div>
            <h3>Code View</h3>
            <code>
                <b>{code.title}</b><br />
                <b>{code.statement}</b><br />
            </code>
            {
                <div style={{ margin: '5px' }}>
                    <form onSubmit={(e) => { handleSubmitAns(e) }}>
                        {code.hasOwnProperty('snippets') &&
                            code.snippets.map((ele, i) => {
                                return <code key={i}>{buildFor(ele)}</code>
                            })
                        }
                    </form>
                    <br />
                </div>
            }
            {errors.length > 0 && <ul>{
                errors.map((ele, i) => {
                    return <li style={{ color: 'red' }} key={i}>{ele}</li>
                })
            }</ul>}
            <h3>{string}</h3>
            {isSubmitted && <button onClick={() => { handleSolution() }}>See Solution</button>}
            {solution && <CodeSolution codeId={props.codeId} handleSolution={handleSolution} />}
        </div>
        <div>
            {
                hints.length > 0 && <Hints hints={hints} />
            }
        </div>
    </div>
}
export default ShowCode