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
            <div>
                <button className="btn-flat waves-effect btn-floating left red darken-3"
                    disabled={props.enable}
                    title="Voltar"
                    onClick={props.enableInput}>
                    <i className="material-icons">arrow_back</i>
                </button>
            </div>
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

export const EditButton = () => {
    return (
        <div>
            <button className="btn-flat waves-effect btn-floating blue red darken-3" 
            onClick={openWindow}>
                <i className="material-icons">edit</i>
            </button>
        </div>
    );
}

function openWindow () {
    window.open('/cadastro_emp', '_blank' ,"width=500, height=500, scrollbars=no, resizable=yes,toolbar=no,status=no,location=0,menubar=no")
}