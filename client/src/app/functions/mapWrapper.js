import React, { Component } from 'react'
import axios from 'axios'
import Map from '../common/map'
import { Modal } from 'react-materialize'

class MapWrapper extends Component {

    state = { polygon: false }

    componentDidMount() {
        const { selectedProcess } = this.props
        
        let solDirMun

        if (selectedProcess.modalidade === 'Desmembramento') {
            solDirMun = selectedProcess.processHistory
                .filter(e => e.label.match('Entrada'))
                .filter(el => el.files.find(fs => fs.fieldName === 'kml'))
        } else solDirMun = selectedProcess.processHistory
            .filter(e => e.label === 'Diretrizes metropolitanas solicitadas')
            .filter(el => el.files.find(fs => fs.fieldName === 'kml'))

        let file = null
        const last = solDirMun.length
        if (solDirMun && last > 0) {
            file = solDirMun[last - 1].files.filter(f => f.fieldName === 'kml')[0]
        }
        
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
                                //console.log(res.data)
                                this.setState({ ...this.state, polygon: res.data })
                            })
                    })
                })
                .catch(err => console.log(err))
        } else { this.setState({ polygon: 'Formato inválido' }) }
    }

    componentWillUnmount() {
        this.setState({ polygon: false })
    }

    render() {
        const { polygon } = this.state
        const { close } = this.props        
        return (
            polygon && (typeof (polygon) === 'object') ? <Map
                polygon={polygon}
                close={close}
            />
                :
                typeof (polygon) === 'boolean' ? <span> </span>
                    :
                    <Modal header="Formato de arquivo inválido." open={true} onClick={close} >
                        <p style={{ textAlign: 'justify', textJustify: 'inter-word', marginTop: '1%' }}>
                            Favor verificar se o arquivo foi anexado e seu formato/geometria são válidos.
                            Na opção "Solicitar Diretrizes Metropolitanas", no item "Delimitação da gleba",
                            deve ser anexado um arquivo de  extensão <strong><i>kml</i></strong>.
                           <br /> <br />O arquivo deve conter <strong>um polígono</strong>.
                              Para maiores informações, entre em contato com a equipe da Agência RMBH.
                        </p>
                    </Modal>
        )
    }
}
export default MapWrapper

