import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import firebase from '../../../config/firebase';

import './Login.css';

const Login = () => {
    const onLoginSyubmitHandler=(e)=>{
        e.preventDefault();
        console.log(e.target);

        let username = e.target.email.value;
        let password = e.target.password.value;

        console.log(username);
        console.log(password);


    };

    return (
        <div className="main-content login-form-content">
            <h2 className="text-center pb-3">Login Page</h2>

            <Form onSubmit={onLoginSyubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="email" color="info">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <FormGroup className="text-center m-0 pt-2">
                    <Button color="info">Login</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Login;