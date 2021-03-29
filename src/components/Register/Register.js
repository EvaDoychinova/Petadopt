import { Fragment } from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './Register.css';

const Register = () => {
    return (
        <Fragment>
            <h2 className="pb-3">Register Page</h2>

            <Form className="m-auto">
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control"/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="rePassword">Repeat Password</Label>
                    <Input type="rePassword" name="rePassword" id="rePassword" />
                </FormGroup>
                <Button color="info">Register</Button>
            </Form>
        </Fragment>
    );
}

export default Register;