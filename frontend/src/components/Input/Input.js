import PropTypes from 'prop-types';

const Input = ( { type, name, min, max, placeholder, setFunc, pattern, title, step} ) => {
    return (<input className="input_modif" step={step} pattern={pattern} required title={title} type={type} name={name} minLength={min} maxLength={max} placeholder={placeholder} onChange={(e) => {
                                setFunc(e.target.value)
                            }}/>
    )
}

Input.defaultProps = {
    type : 'text',
    min : 4,
    max : 10,
    placeholder : 'texte'
}

export default Input