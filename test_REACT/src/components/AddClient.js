import { useState } from 'react'

const AddClient = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

const onSubmit = (e) => {
    e.preventDefault()

    if(!text) {
        alert('please add a client')

    }
    onAdd({ text, day, reminder })
    setText('')
    setDay('')
    setReminder(false)
}

    return (
        <form className='add-client' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Name</label>
                <input type='text' placeholder='Client Name' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Birthdate</label>
                <input type='text' placeholder='Enter Birthdate' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control for form-control-check'>
                <label>Blacklist ?</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input className='btn btn-block' type='submit' value='Save Client' />
        </form>
    )
}

export default AddClient
