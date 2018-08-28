import React from 'react';

const AutoComplete = (props) => {

    return (
        <option key={props.data.id}>{props.data.nome}</option>
    )
}

export default AutoComplete;