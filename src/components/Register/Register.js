import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './Register.css';

const Register = () => {
    return (
        <div className="main-content register-form-content">
            <h2 className="text-center pb-3">Register Page</h2>

            <Form className="m-auto">
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="rePassword">Repeat Password</Label>
                    <Input type="rePassword" name="rePassword" id="rePassword" />
                </FormGroup>
                <FormGroup className="text-center m-0 pt-2">
                    <Button color="info">Register</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Register;