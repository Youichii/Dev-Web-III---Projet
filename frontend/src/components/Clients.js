import Client from './Client'

const Clients = ({clients, onDelete, onToggle}) => {   
    return (
        <>
            {clients.map((client) => (
                <Client key={client.id} client={client} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </> 
    )
}

export default Clients
