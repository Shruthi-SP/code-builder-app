const Input = (props) => {
    const {isChecked, ele, handleInputChange, handleInputBlur } = props
    return <input
        type='text'
        name='inputText'
        value={ele.value}
        onChange={(e) => { handleInputChange(e, ele) }}
        onBlur={(e)=>{handleInputBlur(e, ele)}}
        size="2"
        disabled={isChecked}
    />
}
export default Input