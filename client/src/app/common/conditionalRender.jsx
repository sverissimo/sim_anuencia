import React from 'react';

const conditionalRender = (props) => {

    const { stylez, onClick } = props

    let div = props.div || 'col s1'

    if (!props.cond) {
        return null
    } else {
        return (
            <div className={div} style={stylez} onClick={onClick}>
                {props.value || props.children}
                {props.children || null}
            </div>
        )
    }
};

export default conditionalRender;