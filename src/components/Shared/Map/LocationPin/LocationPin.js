import { ImLocation } from 'react-icons/im';

import './LocationPin.scss';

const LocationPin = ({
    text,
}) => {
    return (
        <div className="location-pin">
            <ImLocation className="location-pin-icon" />
            <p className="location-pin-text">{text}</p>
        </div>
    );
};

export default LocationPin;