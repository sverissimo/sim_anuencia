import React from 'react';

const Role = (props) => {
    return (
        <select className='browser-default'>
            <option value={props.presentValue}>{props.presentValue}</option>
            <option value="admin">Administrador</option>
            <option value="tecnico">Técnico da Agência</option>
            <option value="prefeitura">Técnico da Prefeitura</option>
        </select>
    )
}

const UserTemplate = (props) => {

    let { users } = props
    
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
                                            presentValue={user.role}
                                        />

                                    </td>
                                    <td className='center'>
                                        <input id={i} type="checkbox" name="myTextEditBox" value="checked" />
                                        <label htmlFor={i}></label>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr></tr>
                    }

                    <tr>
                        <td></td><td></td><td></td><td></td>
                        <td  className='center'>
                            <i style={{ color: 'teal' }} value='salvar' className="material-icons small">save</i>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
    )


};

export default UserTemplate;