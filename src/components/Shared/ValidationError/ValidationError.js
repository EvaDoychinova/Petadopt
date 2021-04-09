import './ValidationError.css';

const ValidationError = ({
    children,
}) => {
    if (!children) {
        return null;
    }

    return (
        <p className="validation-error">{children}</p>
    );
};

export default ValidationError;