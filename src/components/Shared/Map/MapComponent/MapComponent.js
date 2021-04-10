// import {Component} from 'react';
import GoogleMapReact from 'google-map-react';

import GoogleMaps from '../../../../secrets/google-maps.json';
import LocationPin from '../LocationPin';

const MapComponent = ({
    location,
    zoomLevel,
}) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: GoogleMaps.ApiKey
            }}
            defaultCenter={{
                lat: location.lat,
                lng: location.lng
            }}
            defaultZoom={zoomLevel}
        >
            <LocationPin
                lat={location.lat}
                lng={location.lng}
                text={location.address}
            />
        </GoogleMapReact>
    );
}

// class MapComponent extends Component {
//     static defaultProps = {
//         center: { lat: GoogleMaps.location.lat, lng: GoogleMaps.location.lng },
//         zoom: 15
//     };

//     render() {

//         return (
//             <GoogleMapReact
//                 bootstrapURLKeys={{
//                     key: GoogleMaps.ApiKey
//                 }}
//                 defaultCenter={{
//                     lat: this.props.location.lat,
//                     lng: this.props.location.lng
//                 }}
//                 defaultZoom={this.props.zoom}
//             >
//                 <LocationPin
//                     lat={this.props.location.lat}
//                     lng={this.props.location.lng}
//                     text={this.props.location.address}
//                 />
//             </GoogleMapReact>
//         );
//     }
// }

export default MapComponent;