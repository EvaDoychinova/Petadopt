import {Link} from 'react-router-dom';

import {Button} from 'reactstrap';

import './ButtonLink.scss';

const ButtonLink = ({
    children,
    to,
    color,
    className,
}) => {
    return (
        <Button color={color} className={className}><Link to={to} className="button-link">{children}</Link></Button>
    );
};

export default ButtonLink;