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
    state = { kml: '' }

    componentDidMount() {
        this.renderMap()
    }

    renderMap = () => {
        loadScript(GMapsApiKey)
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
        const coords = this.props.polygon
        //JSON.parse(coords)
        console.log(Array.isArray(coords))
        console.log(typeof coords)
        let coordinates = []
       // coords.map(p => coordinates.push({ lat: p[1], long: p[0] }))

        console.log(coordinates)
        /* .then(async response => {                    
            
            const reader = new FileReader();
            reader.readAsText(response.data)
            let r2 = await reader.addEventListener('loadend', e => r2 = e.srcElement.result)
            console.log(r2)
        })
        .then(r => {

            axios.post('/api/run', { kml: r })
                .then(res => {

                    return res.data
                })
        }
        )
        .catch(err => {
            console.log(err)
        })
*/
        /* 
        
                    list.forEach(p => {
                        coords.push({ lat: p[1], long: p[0] })
                    });
                    return [] */


        //console.log(parseCoords('5d1e4aa7d3473720847685ed'))



        //5d1e4aa7d3473720847685ed
        //5cfa47db2f1b100c34d6c547
        /*  const kmlLayer = new window.google.maps.KmlLayer(this.parseKml("5d1e4aa7d3473720847685ed"), {
             suppressInfoWindows: true,
             preserveViewport: false,
             map: map
         })
    */
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