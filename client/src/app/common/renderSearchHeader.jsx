import React from 'react';

const renderSearchHeader = (labels) => {

    return (
        <div className="row" style={{
            fontSize: 16,
            fontFamily: 'arial',
            fontWeight: 'bold',
        }}> >
            {labels.map(label =>
                <div className="col s2"> {(label)} </div>
            )}
        </div>
    );
};

export default renderSearchHeader;