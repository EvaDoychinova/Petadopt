import ButtonLink from '../../../Shared/ButtonLink';

import './CodeError.css';

const CodeError = () => {
    return (
        <div className="main-content error-page text-center">
            <h1 className="error-title">Error!</h1>
            <div className="img-error-wrapper">
                <img src="/img/error.jpg" alt="404 - Not Found" className="img-error" />
            </div>
            <ButtonLink color="info" to="/">Go to Home</ButtonLink>
        </div>
    );
}

export default CodeError;