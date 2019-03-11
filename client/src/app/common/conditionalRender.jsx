import React from 'react';

const conditionalRender = (props) => {
    
    let div = props.div || 'col s1'
    
    if (!props.cond) {
        return null
    } else {
        return (
            <div className={div}>
                {props.value || props.children}
            </div>
        )
    }
};

export default conditionalRender;