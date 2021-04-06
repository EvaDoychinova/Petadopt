import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import firebase from '../../../config/firebase';

import './Register.css';

const Register = () => {
    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);

        let username = e.target.email.value;
        let password = e.target.password.value;

        console.log(username);
        console.log(password);

        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((userCredential) => {
                var user = userCredential.user;
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    };

    return (
        <div className="main-content register-form-content">
            <h2 className="text-center pb-3">Register Page</h2>
            <Form onSubmit={onRegisterSubmitHandler} className="m-auto">
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
                    <Input type="password" name="rePassword" id="rePassword" />
                </FormGroup>
                <FormGroup className="text-center m-0 pt-2">
                    <Button color="info">Register</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Register;