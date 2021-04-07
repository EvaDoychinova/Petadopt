import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import firebase from '../../../config/firebase';
import UserContext from '../../../contexts/UserContext';

import './Login.css';

const Login = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory({});

    const onLoginSubmitHandler = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let currentUser = userCredential.user;
                setUser(currentUser);
                history.push('/');
            })
            .catch((error) => {
                console.log(error);
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                history.push('/error');
            });
    };

    return (
        <div className="main-content login-form-content">
            <h2 className="text-center pb-3">Login Page</h2>

            <Form onSubmit={onLoginSubmitHandler} className="m-auto">
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