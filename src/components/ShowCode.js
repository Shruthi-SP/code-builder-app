import { useState } from "react"
import Hint from "./Hints"

const ShowCode = (props) => {
    const { array, buildFor, handleSubmitAns, errors, string } = props
    console.log('arr=', array)

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
        const index = array.findIndex(ele => ele.limit === limits + 1)
        console.log('inc by count=', index, limits, count)
        setCount(index)
        setLimits(limits + 1)
        console.log(`going to be l=${limits + 1} c=${index}`)
        const arr = getHints(array, index)
        console.log('hint ele', arr)
        setHints(arr)
    }
    const handlePreviousBtn = () => {
        if (count > 2 && limits > 1) {
            setNxtBtn(true)
            console.log('Curr limits=' + limits, 'count=' + count)
            const index = array.findIndex(ele => ele.limit === limits - 1)
            console.log('dec', index)
            const arr = getHints(array, index)
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
        if (count < array.length) {
            console.log('curr limits=' + limits, 'count=' + count)
            setPrevBtn(true)
            const index = array.findIndex(ele => ele.limit === limits + 1)
            console.log('inc by count', index)
            const arr = getHints(array, index)
            console.log('hint ele', arr)
            console.log('hint ele', arr)
            setHints(arr)

            if (index > 0) {
                console.log(`will be l=${limits + 1} c=${index}`)
                setLimits(limits + 1)
                setCount(index)
            }
            else {
                console.log(`will be l=${limits + 1} c=${array.length}`)
                setCount(array.length)
                setLimits(limits + 1)
                setNxtBtn(false)
            }
        } else {
            setCount(array.length)
            setLimits(limits + 1)
            setNxtBtn(false)
        }
    }

    return <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div>
            <h2>Complete the code {array.length}</h2>
            {
                start ? (<button onClick={handleStartBtn}> Start</button>) : (
                    <div style={{ margin: '5px' }}>
                        <form onSubmit={handleSubmitAns}>
                            {
                                array.slice(0, count).map((ele, i) => {
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
                hints.length > 0 && <Hint hints={hints} />
            }
        </div>
    </div>
}
export default ShowCode