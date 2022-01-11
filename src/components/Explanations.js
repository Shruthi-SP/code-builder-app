const Explanations = (props) => {
    const { explanations } = props

    return(
        <div style={{maginTop:'5px'}}>
            <h4 style={{marginBottom:'0px'}}>Explanations</h4>
            <ul>
            {
                explanations.map((ele, i)=>{
                    return <li style={{listStyleType: "none"}} key={i} >{ele}</li>
                })
            }
            </ul>
        </div>
    )
}
export default Explanations