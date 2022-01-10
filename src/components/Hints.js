const Hint = (props) => {
    const { hints } = props

    return(
        <div style={{marginTop:'3px'}}>
            <h4 style={{marginBottom:'0px'}}>Hints</h4>
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