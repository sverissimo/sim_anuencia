import React from 'react';

export const ConfirmButton = (props) => {
    console.log(props.enable)
    return (
        <div className="row">
            <div>
                <button className="btn-flat waves-effect btn-floating right teal"
                    disabled={props.enable}
                    title="Avançar"
                    onClick={props.enableInput}>
                    <i class="material-icons">arrow_forward</i>
                </button>
            </div>
        </div>

    );
};

export const BackButton = (props) => {
    return (
        <div className="input" >
            <div>
                <button className=" btn-flat waves-effect btn-floating left red darken-3"
                    disabled={props.enable}
                    title="Voltar"
                    onClick={props.enableInput}>
                    <i class="material-icons">arrow_back</i>
                </button>
            </div>
        </div>
    )
}