import React from 'react';

const renderSearchHeader = (labels, color, indexSelect) => {

    let select = []
    labels && labels[0] ? indexSelect.map(i => select.push(labels[i].lable)) : void 0
    let divSelect = []
    labels && labels[0] ? indexSelect.map(i => divSelect.push(labels[i].div)) : void 0

    return (
        <div className="row"
            style={{
                fontSize: 16,
                fontFamily: 'arial',
                fontWeight: 'bold',
                backgroundColor: color,
                filter: 'brightness(190%)'
            }}>
            {select.map((label, i) =>
                <div className={divSelect[i]} key={i}> {label} </div>
            )}

        </div>
    );
};

export default renderSearchHeader;