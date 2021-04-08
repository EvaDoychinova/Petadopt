import ButtonLink from '../../../Shared/ButtonLink';

import './NotFoundError.css';

const NotFoundError = () => {
    return (
        <div className="main-content not-found-page text-center">
            <h2>Page not found: 404!</h2>
            <h5>The dog ate this page!</h5>
            <div className="img-not-found-wrapper">
                <img src="/img/404-not-found.jpg" alt="404 - Not Found" className="img-not-found" />
            </div>
            <ButtonLink color="info" to="/">Go to Home</ButtonLink>
        </div>
    );
};

export default NotFoundError;