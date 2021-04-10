import GoogleMaps from '../../../secrets/google-maps.json';
import MapComponent from '../../Shared/Map/MapComponent';

import './Contacts.scss';

const Contacts = () => {
    return (
        <div className="main-content contact">
            <h2>Contacts Page</h2>
            <div className="contact-info">
                <ul className="contact-info-list">
                    <li className="contact-info-list-item">
                        <h5>Address:</h5>
                        <p>Chavdar Mutafov Str. 11-37, 1700 Loven, Sofia </p>
                    </li>
                    <li className="contact-info-list-item">
                        <h5>Working Schedule:</h5>
                        <p>09:00 - 18:00 (Every day)</p>
                    </li>
                    <li className="contact-info-list-item">
                        <h5>Phone Number:</h5>
                        <p>+359 987 654 321</p>
                    </li>
                    <li className="contact-info-list-item">
                        <h5>E-mail address:</h5>
                        <p>petadopt@gmail.com</p>
                    </li>
                </ul>
            </div>
            <div className="map-wrapper">
                <MapComponent location={GoogleMaps.location} zoomLevel={17} />
            </div>
        </div>
    );
}

export default Contacts;