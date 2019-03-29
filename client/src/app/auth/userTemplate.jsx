import React from 'react';

const Role = (props) => {
    let { id, presentValue, handleChange } = props
    return (
        <select id={id} className='browser-default' onChange={handleChange}>
            <option value={presentValue}>{presentValue}</option>
            <option value="admin">Administrador</option>
            <option value="tecnico">Técnico da Agência</option>
            <option value="prefeitura">Técnico da Prefeitura</option>
        </select>
    )
}

const UserTemplate = (props) => {

    let { users, handleChange, verifyUser } = props    

    return (

        <div>
            <table className="resposive-table highlight" >
                <thead>
                    <tr>
                        <th>Usuário</th>
                        <th>E-mail</th>
                        <th>Origem</th>
                        <th>Permissões</th>
                        <th className='center'>Verificado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users[0] ?
                            users.map((user, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                    <td>{user.name} {user.surName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Role 
                                        id={user._id}
                                            presentValue={user.role}
                                            handleChange={handleChange}
                                        />
                                    </td>
                                    <td className='center'>
                                        <input id={`v_${user._id}`}
                                        type="checkbox" 
                                        checked={user.verified ? 'checked' : ''} 
                                        onChange={verifyUser}
                                        />
                                        <label htmlFor={`v_${user._id}`}></label>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr></tr>
                    }

                    <tr>
                        <td></td><td></td><td></td><td></td>
                        <td className='center'>
                            <i style={{ color: 'teal' }} value='salvar' className="material-icons small">save</i>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
    )


};

export default UserTemplate;