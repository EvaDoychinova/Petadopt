import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './Login.css';

const Login = () => {
    return (
        <div className="login-form-content">
            <h2 className="text-center pb-3">Login Page</h2>

            <Form className="m-auto">
                <FormGroup>
                    <Label htmlFor="email" color="info">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <Button color="info" className="text-center">Login</Button>
            </Form>
        </div>
    );
}

export default Login;