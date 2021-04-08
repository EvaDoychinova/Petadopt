import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Admin from '../../../../secrets/admin.json';
import UserContext from '../../../../contexts/UserContext';

class ProtectedAdminRoute extends Component {
    static contextType = UserContext;

    render() {
        const [user] = this.context;
        const { path, exact, component, redirectPath } = this.props;

        if (user.uid === Admin.uid) {
            return (
                <Route path={path} exact={exact} component={component} />
            );
        } else {
            return <Redirect to={redirectPath} />
        }
    };
}

export default ProtectedAdminRoute;