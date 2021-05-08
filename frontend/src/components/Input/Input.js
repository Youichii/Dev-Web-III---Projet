import PropTypes from 'prop-types';

const Input = ( { type, name, min, max, placeholder, setFunc, pattern, title, value} ) => {
    return (<input pattern={pattern} title={title} type={type} value={value} name={name} required minLength={min} maxLength={max} placeholder={placeholder} onChange={(e) => {
                                setFunc(e.target.value)
                            }}/>
    )
}

Input.defaultProps = {
    type : 'text',
    min : 4,
    max : 10,
}

export default Input