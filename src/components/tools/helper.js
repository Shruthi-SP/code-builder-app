import Break from "./Break"
import Tab from "./Tab"
import Space from "./Space"
import Submit from "./Submit"

export const buildFor = (ele) => {
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
        return <input type='text' disabled={true}  />
    }
}
export const arrToDd = (arr) => {
    const a = arr.map((ele,i)=>{
        return {...ele, id:i}
    })
    console.log('arrtodd=', a)
    return a
}
export const ddToArr = (arr) => {
    let ar = [...arr]
    const a = ar.map(ele=>{
        delete ele.id
        return ele
    })
    console.log('ddtoarr', a)
    return a
}
