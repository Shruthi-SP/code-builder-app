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
    } else if (ele.group === 'space') {
        return <Space />
    } else if (ele.group === 'submit') {
        return <Submit />
    } else if (ele.group === 'input') {
        return <input type='text' disabled={true}  />
    }
}
