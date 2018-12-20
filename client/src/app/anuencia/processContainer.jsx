import React, { Component } from 'react';
import { BackButton } from '../common/buttons'
import anuenciaMenu from '../config/anuenciaMenu'
import ProcessTemplate from './processTemplate'

class ProcessContainer extends Component {

    state = {
        selectedOption: ''
    }

    optionSelect(e) {
        this.setState({ selectedOption: e.target.id })
        console.log(this.state)
    }

    divConfig(e) {
        let id = e.name
        if (id !== this.state.selectedOption) {
            let format = {
                stylez:
                    { minHeight: '8vh', border: '1px solid #ddd', borderRadius: '2%', borderBottom: '' },
                class: 'col s12 m6 l3 z-depth-2'
            }
            return format
        } else {
            let format = {
                stylez:
                    { minHeight: '8vh', border: '2px solid #bbb', borderRadius: '2%', borderBottom: '' },
                class: 'col s12 m6 l3'
            }
            return format
        }

    }
    render() {
        let { clear, data, redux, close, download, changeValue } = this.props
        let process
        let empreend
        let rt
        if (data.selectedId) {
            process = redux.processCollection.filter(el => el._id.match(data.selectedId))[0]
            if (process) {
                empreend = redux.empCollection.filter(el => el._id.match(process.empId))[0]
                rt = redux.rtCollection.filter(el => el._id.match(process.rtId))[0]
            }
        }
        if (data.selectedId) {
            data.showFiles = true

            return (
                <div className='container'>
                    <ProcessTemplate
                        data={data}
                        redux={redux}
                        clear={clear}
                        download={download}
                        close={close}
                        process={process}
                        empreend={empreend}
                        rt={rt}
                        match={this.props.match}
                        optionSelect={this.optionSelect.bind(this)}
                        selectedOption={this.state.selectedOption}
                        divConfig={this.divConfig.bind(this)}
                        changeValue={changeValue}
                    />
                </div>
            )
        }
    }
};

export default ProcessContainer;