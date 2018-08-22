import React from 'react';

const Tst = (props) => {
    console.log(props.array)
    return (
        <div>
        {
            props.array.map((item, i) => {
                return (
                    <div key={i}>
                        {item.label} : {item.tooltip}
                    </div>
                )
            }) 
        
        }
        
            Hello
        </div>
    );
};

export default Tst;