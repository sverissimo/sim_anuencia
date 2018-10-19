import React from 'react';

const RenderButtons = (props) => {

    let { id, type, name, value, title, disabled, className, defaultChecked, label, icon, onClick } = props

    return (
        <div>
            <button 
            id={id} 
            name={name}
            value={value}
            disabled={disabled}
            title={title}
            className={className}
            onClick={() => onClick(id)}>
                <i className="material-icons">{icon}</i>
            </button>

        </div>
    );
};

export default RenderButtons;