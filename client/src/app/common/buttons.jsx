import React from 'react';

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

    );
};

export const BackButton = (props) => {

    return (
        <div className="input" >
            <button className= {`btn-flat waves-effect btn-floating left red darken-3 ${props.size}`}
                disabled={props.disabled}
                title="Voltar"
                onClick={() => props.onClick()}>
                <i className="material-icons">{props.icon}</i>
            </button>
        </div>
    )
}

export const DeleteButton = (props) => {
    return (
        <div>
            <button className="btn-flat waves-effect btn-floating right red darken-1"
                onClick={() => props.delete(props.id)}>
                <i className="material-icons">delete_outline</i>
            </button>
        </div>
    );
}

export const EditButton = (props) => {

    return (
        <div>
            <button className={"btn-flat waves-effect btn-floating right blue darken-3"}
                onClick={() => props.edit(props.id)}>
                <i className="material-icons">edit</i>
            </button>
        </div>

    );
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


/* renderButtons = () => {
    if (this.state.edit === true) {
        return (
            <div>
                <button className="btn-flat waves-effect btn-floating left red darken-3"
                    title="Voltar"
                    onClick={this.disableEdit}>
                    <i className="material-icons">arrow_back</i>
                </button>

            </div>
        )
    } else {
        return null
    }

} */

