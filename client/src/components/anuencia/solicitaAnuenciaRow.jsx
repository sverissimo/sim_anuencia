import React from 'react';
import UploadButton from './../widgets/uploadButton';

const SolicitaAnuenciaRow2 = (props) => {

    return (
        <div>
            <fieldset>
                <legend>Documentos</legend>
                <div className="col s12" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    {
                        props.array.map((item, i) => {
                            return (
                                <div className="col s12 m6" key={i}>
                                    <label style={{ fontSize: "15px", color: "black" }}>  </label>
                                    <i style={{ marginLeft: "9px", color: "#02b5a5", fontSize: "1,1rem", float: 'right' }}
                                        className="material-icons tooltipped" data-position="bottom"
                                        data-tooltip={item.tooltip}> help_outline </i>
                                    <UploadButton label={item.label} />
                                </div>
                            )
                        })
                    }
                </div >

            </fieldset>
            <div>
                <fieldset>
                    <legend>Projetos</legend>
                    <div className="col s12" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        {
                            props.array2.map((item, i) => {
                                return (
                                    <div className="col s12 m6" key={i} >
                                        <label style={{ fontSize: "15px", color: "black" }}> {item.label} </label>
                                        <i style={{ marginLeft: "9px", color: "#02b5a5", fontSize: "1,1rem", float: 'right' }}
                                            className="material-icons tooltipped" data-position="bottom"
                                            data-tooltip={item.tooltip}> help_outline </i>
                                        <UploadButton label={item.label}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                </fieldset>
            </div>
        </div>
    );
};

export default SolicitaAnuenciaRow2;