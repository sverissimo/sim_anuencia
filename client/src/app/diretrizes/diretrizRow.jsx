import React from 'react';
import fieldConfig from '../common/fieldConfig'

const DiretrizRow = (props) => {
    let { processCollection, filesCollection, selectedId, download, showFiles, close, upload } = props

    let temp = processCollection.filter(el => el._id.match(selectedId))
    process = temp[0]

    let obj = []
    let array = [['CGT', 'cgt'], ['Vistoria', 'vistoria']]
    /* array.map((k,j )=>
        console.log(Object.keys(process).filter(i=>i.match(k)).toString(), process[k])
    ) */
    array.map(i =>
        console.log(i[0], ': ', process[i[1]])
    )

    return (
        <div
            className="row col s12"
            style={{ padding: "10px", paddingLeft: "20px", paddingRight: "20px", margin: 0 }}
        >
            <form action="#">
                <div className="row">
                    <input type="checkbox" id="cgt" />
                    <label for="check">{process.cgt}</label>
                    {process.cgt}
                </div>

                <div className="row">
                    <input type="checkbox" id="cgt" />
                    <label for="check">{process.cgt}</label>
                    {process.cgt}
                </div>
                <div className="row">
                    <input type="checkbox" id="check2" />
                    <label for="check2">label 1</label>
                </div>
                <div className="row">
                    <input type="checkbox" id="check3" checked='checked' />
                    <label for="check3">label 1</label>
                </div>
                <div className="row">
                    <input type="checkbox" id="check4" />
                    <label for="check4">label 1</label>
                </div>
            </form>
            <label
                style={{ fontSize: "16px", paddingTop: "15px", fontWeight: 450, color: "black" }}>
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
                            name='DirMetropolitana'
                            onChange={props.upload} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DiretrizRow;