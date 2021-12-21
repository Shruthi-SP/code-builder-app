const Input = (props) => {
    const { ele, handleInputChange } = props
    return <input
        type='text'
        name='inputText'
        value={ele.value}
        onChange={(e) => { handleInputChange(e, ele) }}
        size="2"
    />
}
export default Input