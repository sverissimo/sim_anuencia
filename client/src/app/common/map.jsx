import React, { Component } from 'react'
import axios from 'axios'
import { soloStyle } from '../config/soloStyle'
import { CloseWindow } from '../common/buttons'
import GMapsApiKey from '../../clientEnv.js'
import { gjs } from './precon.js'


class Map extends Component {

    features = [];
    features = gjs.features;
    //console.log(features[0].geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] })));
    //console.log(mun_rmbh.features)
    //{ map, close } = this.props

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap`)
        window.initMap = this.initMap
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: -19.917299, lng: -43.934559 },
            zoom: 10,
            mapTypeId: 'hybrid',
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
            }
        })



        const kmlLayer = new window.google.maps.KmlLayer(this.parseKml('5cf8030a7e08652780d6b9aa'), {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
        })

    }

    parseKml = (id) => {
        axios({
            url: `/api/download/${id}`,
            method: 'GET',
            responseType: 'blob', // important
        }).then(response => {

            /*    const reader = new FileReader
               reader.onloadend = afterRead;
               reader.readAsDataURL(response.data);               // Use this function instead        
               function afterRead() {
                   const x = reader.result;    //result is already a base64 string!
                   console.log(x)
               } */

            /*  const url = URL.createObjectURL(new Blob([response.data], { type: 'kml' }));
             return url */
            const blb = new Blob(['cgtTst'], { type: 'kml' })

            //let kmlFile
            const reader = new FileReader();
            reader.addEventListener('loadend', e => {
                axios.post('/api/kmlParse', { kml: e.srcElement.result })
                    .then(res => console.log(res.data))
                //console.log(kmlFile)

            })
            reader.readAsText(response.data)






        })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        return (
            <div style={soloStyle(true, ['15%', '70%'], 'hidden')}>
                <CloseWindow close={this.props.close} />
                <div id='map'></div>
            </div>
        )
    }
}

function loadScript(url) {

    var script = window.document.createElement("script")
    var index = window.document.getElementsByTagName("script")[0]
    script.async = true
    script.defer = true
    script.src = url
    index.parentNode.insertBefore(script, index)
}


export default Map


{/* <GoogleMap
id='gmap'
zoom={10}
center={{ lat: -19.917299, lng: -43.934559 }}
mapContainerStyle={{
    height: '100%',
    width: '100%'
}}
mapTypeId='hybrid'
>
<Polygon
    onLoad={polygon => {
        console.log("polygon: ", polygon);
    }}
    paths={[features[0].geometry.coordinates[0].map(point => ({ lat: point[1], lng: point[0] }))]}
    options={{
        fillColor: "lightblue",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }}
/>

</GoogleMap>
 */}