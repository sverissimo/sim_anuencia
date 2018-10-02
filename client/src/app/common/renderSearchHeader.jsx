import React from 'react';

const renderSearchHeader = (labels) => {

    return (
        <div className="row" style={{
            fontSize: 16,
            fontFamily: 'arial',
            fontWeight: 'bold',
        }}> >
            {labels.map((label, i) =>
                <div className="col s2" key={i}> {(label)} </div>
            )}
        </div>
    );
};

export default renderSearchHeader;