import React from 'react'

export const ConfirmButton = (props) => {

    return (
        <div className="row">
            <div>
                <button className="btn-flat waves-effect btn-floating right teal"
                    disabled={props.enable}
                    title="Avançar"
                    onClick={props.enableInput}>
                    <i className="material-icons">arrow_forward</i>
                </button>
            </div>
        </div>
    )
}

export const BackButton = (props) => {
    let { disabled, icon } = props
    return (
        <div className="input" >
            <button className={`btn-floating left red darken-3 ${props.size}`}
                disabled={disabled}
                title="Voltar"
                onClick={() => props.onClick()}>
                <i className="material-icons">{icon}</i>
            </button>
        </div>
    )
}

export const DeleteButton = (props) => {

    if (props.userRole === 'admin') {
        return (
            <div>
                <i className="material-icons"
                    style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                    title='Apagar'
                    onClick={() => props.delete(props.id)}
                >
                    delete_outline
            </i>
            </div>
        )
    } else return <span></span>
}

export const EditButton = (props) => {

    if (props.userRole === 'admin') {
        return (
            <div>
                <i className="material-icons"
                    style={{ fontSize: '20px', color: 'teal', cursor: 'pointer' }}
                    title='Editar'
                    onClick={() => props.edit(props.id)}
                >edit</i>
            </div>
        )
    } else return <span></span>
}

export const UpdateButton = (props) => {

    if (props.display) {
        return (
            <button className="btn-flat waves-effect btn-floating right teal darken-2"
                title="Salvar"
                form={props.form}
                type="submit" >
                <i className="material-icons">save</i>
            </button>
        )
    } else {
        return null
    }
}

export const CloseWindow = props => (
    <div>
        <i className="material-icons right" title="Fechar" style={{ cursor: 'pointer', color: 'red' }} onClick={props.close}>close</i>
    </div>
)

export const InfoButton = props => {
    const { showInfo, id } = props
    return (
        <div>
            <i className="material-icons"
                id={id}
                onClick={showInfo}
                style={{ fontSize: '20px', color: '#1D90EE', cursor: 'pointer' }}
                title='Informações'
            >
                info
            </i>
        </div>
    )
}

export const ArchieveButton = (props) => {

    let { id, archieve, archieved } = props
    if (props.userRole === 'admin') {
        return (
            <div>
                <i className="material-icons"
                    style={{ fontSize: '20px', color: archieved ? 'blue' : 'darkorange', cursor: 'pointer' }}
                    title={archieved ? 'Desarquivar' : 'Arquivar'}
                    onClick={() => archieve(id, archieved)}
                >
                    {archieved ? 'unarchive' : 'archive'}
                </i>
            </div>
        )
    } else return <span></span>
}


export const MapButton = props => (
    <div>
        <i className="material-icons"
            style={{ fontSize: '20px', color: 'grey', cursor: 'pointer' }}
            title='Ver no mapa'
            onClick={() => props.showMap(props.id)}
        >
            map
        </i>
    </div>
)