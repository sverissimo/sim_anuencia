import React from 'react';

const Loading = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '25%',
            right: '15%',
            left: '15%',
            height: '50%',
            marginBottom: '25px',
            marginTop: '25px',
            textAlign: 'center',
            zIndex: 1
        }}>
            <img src="/images/loading.gif" alt="" height="70px" width="70px" />
        </div>
    );
};

export default Loading