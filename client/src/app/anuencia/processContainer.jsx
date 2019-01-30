import React, { Component } from 'react';
import ProcessTemplate from './processTemplate'

class ProcessContainer extends Component {

    state = {
        selectedOption: '',
        logDetails: false,
        logIndex: ''
    }

    optionSelect(e) {
        this.setState({ selectedOption: e.target.id })
    }

    componentWillUnmount() {
        this.props.clear()
    }

    divConfig(e) {
        let id = e.name
        if (id !== this.state.selectedOption) {
            let format = {
                stylez:
                {
                    minHeight: '8vh', border: '1px solid #ddd', borderRadius: '2%', borderBottom: '', borderTopLeftRadius: '15%',
                    borderTopRightRadius: '15%'
                },
                class: 'col s12 m6 l3 z-depth-2'
            }
            return format
        } else {
            let format = {
                stylez:
                {
                    minHeight: '8vh', border: '2px solid #bbb', borderRadius: '2%', borderBottom: '', borderTopLeftRadius: '15%',
                    borderTopRightRadius: '15%', backgroundColor: '#fcfcfc'
                },
                class: 'col s12 m6 l3'
            }
            return format
        }

    }

    showLog(e) {
        this.setState({ logDetails: true, logIndex: e.target.id })
    }

    clearLog() {
        this.setState({ logDetails: false, logIndex: '' })
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
                        log={this.state}
                        showLog={this.showLog.bind(this)}
                        clearLog={this.clearLog.bind(this)}
                    />
                </div>
            )
        }
    }
};

export default ProcessContainer;