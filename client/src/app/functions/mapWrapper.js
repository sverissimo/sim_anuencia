import React, { Component } from 'react'
import axios from 'axios'
import Map from '../common/map'

class MapWrapper extends Component {

    state = { polygon: undefined }

    async componentDidMount() {
        const { selectedProcess } = this.props
        const solDirMun = selectedProcess.processHistory.filter(e => e.label === 'Diretrizes metropolitanas solicitadas')[0]
        const file = solDirMun.files.filter(f => f.fieldName === 'kml')[0]

        if (file.contentType.match('kml')) axios({
            url: `/api/download/${file.id}`,
            //url: this.props.fileId,
            method: 'GET',
            responseType: 'blob', // important
        })
            .then(async res => {
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
    }

    render() {
        const { polygon } = this.state
        const { close } = this.props
        console.log(typeof(polygon))
        return (
            polygon && (typeof(polygon) === 'object') ? <Map
                polygon={polygon}
                close={close}
            />
                : <span />
        )
    }
}
export default MapWrapper

