import GoogleMapReact from 'google-map-react';

import GoogleMaps from '../../../../secrets/google-maps.json';
import LocationPin from '../LocationPin';

const MapComponent = ({
    location,
    zoomLevel,
}) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: GoogleMaps.ApiKey }}
            defaultCenter={location}
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

export default MapComponent;