import { useSelector } from "react-redux"
import Break from './tools/Break'
import Tab from "./tools/Tab"
import Space from "./tools/Space"
import Submit from "./tools/Submit"
import ErrorBoundary from "./ErrorBoundary"

const CodeSolution = (props) => {
    const { codeId, obj, handleSolution, admin} = props

    if(Object.keys(obj).length === 0){
        throw new Error('CodeSolution crashed. no code obj')
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
            return ele.answer
        }
    }

    return <div>
        <h3>Code Solution</h3>
        <code>
            <b>{obj.title}</b><br />
            <b>{obj.statement}</b><br />
            {
                obj.snippets.slice(0, obj.snippets.length-1).map(ele=>{
                    return <code key={ele._id}>{buildFor(ele)}</code>
                })
            }
        </code>
        <br />{!admin && <button onClick={() => { handleSolution() }}>Close</button>}
    </div>
}
export default CodeSolution