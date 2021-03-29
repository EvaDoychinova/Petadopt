import { Fragment } from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './Login.css';

const Login = () => {
    return (
        <Fragment>
            <h2 className="pb-3">Login Page</h2>

            <Form className="m-auto">
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <Button color="info">Login</Button>
            </Form>
        </Fragment>
    );
}

export default Login;