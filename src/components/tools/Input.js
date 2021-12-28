const Input = (props) => {
    const { isSubmitted, ele, handleInputChange } = props
    return <input
        // style={{border: 'none', borderBottom: isSubmitted ? (ele.answer===ele.value? '2px solid green' : '2px solid red') : '1px solid blue'}}
        style={{ border: isSubmitted ? (ele.answer===ele.value? '2px solid green' : '2px solid red') : '1px solid black' }}
        type='text'
        name='inputText'
        value={ele.value}
        onChange={(e) => { handleInputChange(e, ele) }}
        size="2"
    />
}
export default Input