import Break from '../components/tools/Break'
import Input from '../components/tools/Input'
import Tab from '../components/tools/Tab'
import Space from '../components/tools/Space'
import Submit from '../components/tools/Submit'

const CodeItem = (props) => {
    const { snippets } = props
    console.log('snippets=',snippets)

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
        <div>
            <h5>Code {snippets.length}</h5>
            {
                snippets.map((ele,i)=>{
                    return <code key={i}>{buildFor(ele)}</code>
                })
            }
        </div>
    )
}
export default CodeItem