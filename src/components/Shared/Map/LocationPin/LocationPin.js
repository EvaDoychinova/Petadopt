import { MdMyLocation } from 'react-icons/md';

import './LocationPin.scss';

const LocationPin = ({
    text,
}) => {
    return (
        <div className="location-pin">
            <MdMyLocation className="location-pin-icon" />
            <p className="location-pin-text">{text}</p>
        </div>
    );
};

export default LocationPin;