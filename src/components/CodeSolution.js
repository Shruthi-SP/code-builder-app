import { useSelector } from "react-redux"
import Break from './tools/Break'
import Tab from "./tools/Tab"
import Space from "./tools/Space"
import Submit from "./tools/Submit"

const CodeSolution = (props) => {
    //console.log('Solution props ', props)
    const {admin, handleSolution, code} = props

    // const code = useSelector((state) => {
    //     console.log(state.codes)
    //     return state.codes.data.find(ele => ele._id === props.codeId)
    // })

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
            <b>{code.title}</b><br />
            <b>{code.statement}</b><br />
            {
                code.snippets.slice(0, code.snippets.length-1).map(ele=>{
                    return <code key={ele._id}>{buildFor(ele)}</code>
                })
            }
        </code>
        <br />{!admin && <button onClick={() => {handleSolution() }}>Close</button>}
    </div>
}
export default CodeSolution