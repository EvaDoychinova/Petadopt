import {Link} from 'react-router-dom';

import {Button} from 'reactstrap';

import './ButtonLink.css';

const ButtonLink = ({
    children,
    to,
    color,
}) => {
    return (
        <Button color={color} className="ml-3"><Link to={to} className="button-link">{children}</Link></Button>
    );
};

export default ButtonLink;