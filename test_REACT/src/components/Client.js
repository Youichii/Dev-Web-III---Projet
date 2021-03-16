import { FaTimes } from 'react-icons/fa'

const Client = ({ client, onDelete, onToggle }) => {
    return (  //changing className if reminder = true or not
        <div className={`client ${client.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(client.id)}> 
            <h3>
               {client.text}<FaTimes style= {{ color : 'red', cursor: 'pointer'}} onClick={() => onDelete(client.id)} />
            </h3> 
           <p>{client.day}</p>
           <p>{client.reminder ? ("Blacklist") : ("Clear")}</p>
        </div>
    )
}

export default Client
