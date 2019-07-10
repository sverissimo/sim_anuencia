import React, { Component } from 'react'
import axios from 'axios'
import Map from '../common/map'
import { Modal } from 'react-materialize'

class MapWrapper extends Component {

    state = { polygon: false }

    async componentDidMount() {
        const { selectedProcess } = this.props
        const solDirMun = selectedProcess.processHistory
            .filter(e => e.label === 'Diretrizes metropolitanas solicitadas')
            .filter(el => el.files.find(fs => fs.fieldName === 'kml'))
        let file = null
        const last = solDirMun.length
        if (solDirMun && last > 0) {
            file = solDirMun[last - 1].files.filter(f => f.fieldName === 'kml')[0]
        }
        console.log(file)
        if (file && file.contentType.match('kml')) {
            axios({
                url: `/api/download/${file.id}`,
                //url: this.props.fileId,
                method: 'GET',
                responseType: 'blob', // important
            })
                .then(res => {
                    const reader = new FileReader();
                    reader.readAsText(res.data)
                    reader.addEventListener('loadend', async e => {
                        axios.post('/api/run', { kml: e.srcElement.result })
                            .then(res => {
                                console.log(res.data)
                                this.setState({ ...this.state, polygon: res.data })
                            })
                    })
                })
                .catch(err => console.log(err))
        } else { this.setState({ polygon: 'null' }) }
    }
    closeMap = (polygon) => {

        if (typeof polygon === 'boolean') {
            return 
        } else if (typeof polygon !== 'object') {

            return (
                <Modal header="Geometria inválida." open={true} onCloseStart={this.props.close}>
                    <p>
                        Favor verificar se o arquivo foi anexado e seu formato/geometria são válidos.
                        Na opção "Solicitar Diretrizes Metropolitanas", no item "Delimitação da gleba",
                        deve ser anexado um arquivo de extensão ".kml".
                        O arquivo não deverá conter linhas e/ou pontos, apenas um polígono.
                        Para maiores informações, entre em contato com q equipe da Agência RMBH.
                    </p>
                </Modal>
            )

        }

    }
    render() {
        const { polygon } = this.state
        const { close } = this.props
        console.log(typeof (polygon))
        return (
            polygon && (typeof (polygon) === 'object') ? <Map
                polygon={polygon}
                close={close}
            />
                :
                typeof (polygon) === 'boolean' ? null
                    :
                    <Modal header="Geometria inválida." open={true} onCloseEnd={this.props.close}>
                        <p>
                            Favor verificar se o arquivo foi anexado e seu formato/geometria são válidos.
                            Na opção "Solicitar Diretrizes Metropolitanas", no item "Delimitação da gleba",
                            deve ser anexado um arquivo de extensão ".kml".
                            O arquivo não deverá conter linhas e/ou pontos, apenas um polígono.
                            Para maiores informações, entre em contato com q equipe da Agência RMBH.
                </p>
                    </Modal>
        )
    }
}
export default MapWrapper

