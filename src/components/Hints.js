const Hint = (props) => {
    const { hints } = props

    return(
        <div>
            <h4 style={{marginTop:'3px', marginBottom:'0px'}}>Hints</h4>
            <ul>
            {
                hints.map((ele, i)=>{
                    return <li key={i} >{ele}</li>
                })
            }
            </ul>
        </div>
    )
}
export default Hint