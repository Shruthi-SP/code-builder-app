import Break from '../components/tools/Break'
import Input from '../components/tools/Input'
import Tab from '../components/tools/Tab'
import Space from '../components/tools/Space'
import Submit from '../components/tools/Submit'
import { Typography } from '@mui/material'

const CodeItem = (props) => {
    const { snippets } = props

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
            return <input type='text' disabled={true}  />
        }
    }

    return (
        <>
            <h5 style={{margin:'0px'}}>Code</h5>
            {
                snippets.map((ele,i)=>{
                    return <code key={i}>{buildFor(ele)}</code>
                })
            }
        </>
        // <div>
        //     <h5>Code {snippets.length}</h5>
        //     {
        //         snippets.map((ele,i)=>{
        //             return <code key={i}>{buildFor(ele)}</code>
        //         })
        //     }
        // </div>
    )
}
export default CodeItem