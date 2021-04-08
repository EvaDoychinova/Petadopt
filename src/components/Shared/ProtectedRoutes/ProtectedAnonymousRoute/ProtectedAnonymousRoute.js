import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext from '../../../../contexts/UserContext';

class ProtectedUserRoute extends Component {
    static contextType = UserContext;

    render() {
        const [user] = this.context;
        const { path, exact, component, redirectPath } = this.props;

        if (!user) {
            return (
                <Route path={path} exact={exact} component={component}/>
            );
        } else {
            return <Redirect to={redirectPath} />
        }
    };
}

export default ProtectedUserRoute;