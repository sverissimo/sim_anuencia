import React from 'react';

const Role = (props) => {
    let { id, presentValue, handleChange, municipio } = props
    return (
        <select id={id} className='browser-default' onChange={handleChange}>
            <option value={presentValue}>{presentValue}</option>
            <option value="admin">Administrador</option>
            <option value="tecnico">Técnico da Agência</option>
            <option value="prefeitura">{`Prefeitura de ${municipio}`}</option>
            <option value="empreend">Empreendedor</option>
            <option value="rt">Responsável Técnico</option>
        </select>
    )
}

const format = (field) => {
    return field
        .replace('Usuário', 'name')
        .replace('Permissões', 'role')
        .replace('E-mail', 'email')
        .replace('í', 'i')
        .toLowerCase()
}

const UserTemplate = (props) => {

    let { users, handleChange, editUsers, deleteUser, editTec, showVerified, verified, sort, reverse } = props

    return (
        <div>
            <div className='row right'
            >
                <input
                    id='showVerified'
                    type="checkbox"
                    checked={verified === true}
                    onChange={showVerified}
                />
                <label style={{ fontSize: '0.9rem' }} htmlFor="showVerified">Mostrar usuários verificados</label>
            </div>

            <table className="resposive-table highlight" >
                <thead>
                    <tr>
                        {
                            ['Usuário', 'E-mail', 'Município'].map((th, i) =>
                                <th key={i} name={format(th)}>
                                    <span> {th} </span>
                                    <span style={{ cursor: 'pointer' }} onClick={() => sort(format(th))}>
                                        {reverse ? '▼' : '▲'}
                                     </span>
                                </th>
                            )
                        }
                        {['Permissões', 'Opções', 'Editar Técnico'].map((th, i) => <th key={i} name={format(th)} className='center'>{th}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        users[0] ?
                            users.map((user, i) => (
                                <tr id={user._id} key={i} style={{ borderBottom: '1px solid #eee' }}>
                                    <td>{user.name} {user.surName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.municipio || ''}</td>
                                    <td>
                                        <Role
                                            id={user._id}
                                            presentValue={user.role}
                                            handleChange={handleChange}
                                            municipio={user.municipio}
                                        />
                                    </td>
                                    <td className='center' style={{ paddingLeft: '3%' }}>
                                        <input id={`v_${user._id}`}
                                            name='v_'
                                            type="checkbox"
                                            checked={user.verified ? 'checked' : ''}
                                            onChange={handleChange}
                                            title='Confirmar usuário'
                                        />
                                        <label htmlFor={`v_${user._id}`}></label>
                                        <i id={`d_${user._id}`}
                                            className='material-icons red-text click'
                                            onClick={deleteUser}
                                            title='Apagar'
                                        >delete_outlined</i>
                                    </td>
                                    <td className='center'>
                                        {user.role === 'tecnico' && <i id={`t_${user._id}`}
                                            className='material-icons grey-text click'
                                            onClick={editTec}
                                            title='Editar Técnico'
                                        >settings</i>
                                        }
                                    </td>



                                </tr>
                            ))
                            :
                            <tr></tr>
                    }
                    <tr>
                        <td></td><td></td><td></td><td></td>
                        <td className='center'>
                            <i style={{ color: 'teal' }} onClick={editUsers} title='Salvar' className="material-icons small click">save</i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserTemplate;