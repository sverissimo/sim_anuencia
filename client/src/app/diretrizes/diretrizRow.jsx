import React from 'react';
import showDate from '../common/showDate'

const DiretrizRow = (props) => {

    let { processCollection, selectedId, checkItem, change, dirStatus, anexaDiretriz,
        enviaPendencias, showCalendar } = props

    let temp = processCollection.filter(el => el._id.match(selectedId))
    let processo = temp[0]

    let selectedFields = [['CGT', 'cgt', 'cgtOk'], ['Vistoria', 'vistoria', 'vistoriaOk'],
    ['Diretriz Municipal', 'dirMunOk', 'dirMunOk'], ['Pagamento da DAE', 'daeOk', 'daeOk']]

    const setCgt = (i) => {

        if (i[1] === 'cgt' || i[1] === 'vistoria') {
            if (processo[i[1]] === i[0] + ' não agendada') {

                return (
                    <span>
                        <strong>{': '}</strong>
                        <span id={i[1]} onClick={showCalendar}
                            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}>
                            Agendar {`${i[0]}`}
                        </span>
                    </span>
                )
            } else {
                return (
                    <span>
                        <strong>{': '}</strong>
                        <span>
                            {showDate(processo[i[1]])}
                            <span style={{ cursor: 'pointer' }}> <i id={i[1]} onClick={showCalendar} title={`Reagendar ${i[0]}`} className="material-icons">calendar_today</i>  </span>
                        </span>
                    </span>

                )
            }
        } else {
            return processo[i[1]]
        }
    }

    return (
        <div
            className="row col s12"
            style={{ padding: "10px", paddingLeft: "20px", paddingRight: "20px", margin: 0 }}
        >
            <form action="#">
                {
                    selectedFields.map((i, k) =>
                        <div className="row" key={k}>
                            <input type="checkbox"
                                id={i[2]}
                                onClick={checkItem} />
                            <label htmlFor={i[2]} style={{ color: 'black', fontWeight: 500 }}>{i[0]}</label>
                            {setCgt(i)}
                        </div>
                    )
                }
                {
                    anexaDiretriz === false ?

                        <div className="row">
                            <div className="col s12">
                                <label htmlFor="pendText">Registrar pendências</label>
                                <textarea
                                    className="materialize-textarea"
                                    id="pendText"
                                    onChange={change}
                                    value={dirStatus.pendencias}
                                />
                                <button
                                    className="btn red right"
                                    style={{ marginBottom: '10px' }}
                                    onClick={enviaPendencias} >
                                    Enviar Pendências
                            </button>
                            </div>

                        </div>
                        :
                        <div>
                            <label
                                style={{
                                    fontSize: "16px", paddingTop: "15px",
                                    fontWeight: 450,
                                    color: "black"
                                }}>
                                Anexar Diretriz Metropolitana
                    </label>
                            <div className="row file-field input-field" >
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
                                            name='diretrizFile'
                                            onChange={props.upload} />
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </form>
        </div >
    );
};

export default DiretrizRow;