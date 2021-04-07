import { useContext } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import UserContext from '../../../contexts/UserContext';
import firebase from '../../../config/firebase';

import './Login.css';

const Login = ({
    history,
}) => {
    const [user, setUser]=useContext(UserContext);

    const onLoginSyubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);

        let username = e.target.email.value;
        let password = e.target.password.value;

        console.log(username);
        console.log(password);

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(user);

                let userAuth=firebase.auth().currentUser;
                console.log(userAuth);
                
                setUser(user);
                history.push('/');
            })
            .catch((error, history) => {
                console.log(error);
                var errorCode = error.code;
                var errorMessage = error.message;

                history.push('/error');
            });
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