import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Hints from "./Hints"
import Input from "./tools/Input"
import Break from "./tools/Break"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import Tab from "./tools/Tab"

const CodePreview = (props) => {
    console.log('Code preview of props=', props)
    
    const { codeId, handleInputChange, handleSubmitAns, errors, string } = props
    console.log('showCode props=', props)
    const dispatch = useDispatch()

    const codeSnippet = useSelector(state => {
        console.log('total questions', state.codes)
        const obj = state.codes.find(ele => ele._id == codeId)
        console.log('selected question snippets', obj)
        return obj
    })

    const [code, setCode] = useState(codeSnippet)

    useEffect(() => {
        setCode(codeSnippet)
    }, [codeSnippet])

    const [start, setStart] = useState(true)
    const [count, setCount] = useState(0)
    const [limits, setLimits] = useState(0)
    const [prevBtn, setPrevBtn] = useState(false)
    const [nxtBtn, setNxtBtn] = useState(true)
    const [hints, setHints] = useState([])

    const getHints = (a, i) => {
        const ar = []
        a.slice(0, i).forEach(ele => {
            if (ele.hasOwnProperty('hint')) {
                console.log(ele)
                if (ele.hint !== '') {
                    ar.push(ele.hint)
                }
            }
        })
        return ar
    }

    const handleStartBtn = () => {
        setStart(!start)
        const index = code.snippets.findIndex(ele => ele.limit === limits + 1)
        console.log('inc by count=', index, limits, count)
        setCount(index)
        setLimits(limits + 1)
        console.log(`going to be l=${limits + 1} c=${index}`)
        const arr = getHints(code.snippets, index)
        console.log('hint ele', arr)
        setHints(arr)
    }
    const handlePreviousBtn = () => {
        if (count > 2 && limits > 1) {
            setNxtBtn(true)
            console.log('Curr limits=' + limits, 'count=' + count)
            const index = code.snippets.findIndex(ele => ele.limit === limits - 1)
            console.log('dec', index)
            const arr = getHints(code.snippets, index)
            console.log('hint ele', arr)
            setHints(arr)
            console.log('hint ele', arr)
            if (index > 0 && limits - 1 !== 1 && index !== 2) {
                console.log(`going to be l=${limits - 1} c=${index}`)
                setLimits(limits - 1)
                setCount(index)
            } else {
                setCount(2)
                setLimits(1)
                setPrevBtn(false)
            }
        } else {
            setCount(2)
            setLimits(1)
            setPrevBtn(false)
        }
    }
    const handleNextBtn = () => {
        if (count < code.snippets.length) {
            console.log('curr limits=' + limits, 'count=' + count)
            setPrevBtn(true)
            const index = code.snippets.findIndex(ele => ele.limit === limits + 1)
            console.log('inc by count', index)
            const arr = getHints(code.snippets, index)
            console.log('hint ele', arr)
            console.log('hint ele', arr)
            setHints(arr)

            if (index > 0) {
                console.log(`will be l=${limits + 1} c=${index}`)
                setLimits(limits + 1)
                setCount(index)
            }
            else {
                console.log(`will be l=${limits + 1} c=${code.snippets.length}`)
                setCount(code.snippets.length)
                setLimits(limits + 1)
                setNxtBtn(false)
            }
        } else {
            setCount(code.snippets.length)
            setLimits(limits + 1)
            setNxtBtn(false)
        }
    }
    const buildFor = (ele) => {
        if (ele.group === 'texts') {
            return ele.value
        } else if (ele.group === 'break') {
            return <Break />
        } else if (ele.group === 'tab') {
            return <Tab />
        } else if (ele.group === 'space') {
            return <Space />
        } else if (ele.group === 'submit') {
            return <Submit />
        } else if (ele.group === 'input') {
            return <Input ele={ele} handleInputChange={handleInputChange} />
        }
    }

    return <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div>
            {code.snippets.length > 0 && <code>
                <b>{code.title}</b><br />
                <b>{code.statement}</b>           
            </code>}
            {
                start ? (<button onClick={handleStartBtn}> Start</button>) : (
                    <div style={{ margin: '5px' }}>
                        <form onSubmit={handleSubmitAns}>
                            {
                                code.snippets.slice(0, count).map((ele, i) => {
                                    return <code key={i}>{buildFor(ele)}</code>
                                })
                            }
                        </form>
                        <br />
                        {prevBtn && <button style={{ margin: '5px' }} onClick={handlePreviousBtn}>previous</button>}
                        {nxtBtn && <button style={{ margin: '5px' }} onClick={handleNextBtn}>next</button>}
                    </div>
                )
            }
            {errors.length > 0 && <ul>{
                errors.map((ele, i) => {
                    return <li key={i}>{ele}</li>
                })
            }</ul>}
            <h3>{string}</h3>
        </div>
        <div>
            {
                hints.length > 0 && <Hints hints={hints} />
            }
        </div>
    </div>

}
export default CodePreview