import React from 'react'
import Dropdown from './components/DropDown'

const Modification = () => {
    require('./modification.css')
    return (
        <div>
            <Dropdown title="Horaire" />
            <Dropdown title= "Coordonées" />
        </div>
    )    
}

export default Modification