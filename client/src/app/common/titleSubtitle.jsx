import React from 'react';

const titleSubtitle = (props) => {

    let { title, subtitle, color } = props
    const hype = (hy) => {
        if (hy) return <a href={'mailto:' + hy}><span className='link'>
            {hy}
        </span></a>
        else return null
    }
    return (
        <div className="row col s12" >
            <div style={{

                marginTop: '20px',
            }}>
                <h5>{title}</h5>
            </div>
            {
                subtitle ?
                    <div className="card-panel valign-wrapper" style={{
                        marginBottom: '10px',
                        maxHeight: '10px',
                        backgroundColor: color,
                        filter: 'brightness(200%)',
                        borderRadius: '10px 10px',
                        fontSize: '1rem',
                        fontWeight: 500,
                        fontFamily: 'Calibri'
                    }}>
                        <span style={{ color: 'black' }}>
                            {subtitle} {hype(props.hyperLink)}
                        </span>
                    </div>
                    :
                    void 0
            }
        </div>
    );
};

export default titleSubtitle;