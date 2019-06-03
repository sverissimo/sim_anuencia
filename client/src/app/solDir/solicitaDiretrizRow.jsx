import React from 'react';
import ReactTooltip from 'react-tooltip'

const solicitaDiretrizRow = (props) => {
    const { tooltip, tt, link } = props.object
    const click = (link) => {
        if (link) {
            window.open('http://daeonline1.fazenda.mg.gov.br/daeonline/executeReceitaOrgaosEstaduais.action', '_blank')
        }
    }
    return (
        <div
            className="row"
            style={{ padding: "10px", paddingLeft: "20px", paddingRight: "20px", margin: 0 }}
        >
            <label
                style={{ fontSize: "16px", paddingTop: "15px", fontWeight: 450, color: "black" }}>
                {props.object.label}
            </label>
            {tt && <i style={{ marginLeft: "9px", color: "#42a5f5", fontSize: "1.2rem", cursor: link ? "pointer" : "default" }}
                className="material-icons"
                onClick={() => click(link)}
                data-tip={tooltip}> help_outline </i>}
            <ReactTooltip />
            <div className="row file-field input-field" key={props.object.nameInput}>
                <div className="file-path-wrapper row">
                    <div className="col s11">
                        <input
                            className="file-path validate"
                            type="text"
                            placeholder="Carregar arquivo" />
                    </div>
                    <div className="col s1 right">
                        <i className="material-icons grey-text text-darken-1 small">attach_file</i>
                        <input
                            type="file"
                            name={props.object.nameInput}
                            onChange={props.upload} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default solicitaDiretrizRow;