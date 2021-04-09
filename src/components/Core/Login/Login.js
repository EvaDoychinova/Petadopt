import { useState, useContext } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import firebase from '../../../config/firebase';
import UserContext from '../../../contexts/UserContext';
import ValidationError from '../../Shared/ValidationError';

import './Login.css';

const Login = ({
    history,
}) => {
    const [, setUser] = useContext(UserContext);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isVisibleAlert, setIsVisibleAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const onAlertDismiss = () => {
        setIsVisibleAlert(false);
    };

    const onEmailChangeHandler = (e) => {
        const input = e.target.value;

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let isEmail = regexp.test(String(input).toLowerCase());

        if (isEmail) {
            setEmailErrorMessage('');
            setIsDisabled(false);
        } else {
            setEmailErrorMessage('Please enter a valid email!');
            setIsDisabled(true);
        }
    };

    const onPasswordChangeHandler = (e) => {
        const input = e.target.value;

        if (input.length < 6) {
            setPasswordErrorMessage('Password should be at least 6 characters long!');
            setIsDisabled(true);
        } else {
            setPasswordErrorMessage('');
            setIsDisabled(false);
        }
    };

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
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode) {
                    setErrorMessage(errorMessage);
                    setIsVisibleAlert(true);
                } else {
                    history.push('/error');
                }
            });
    };

    return (
        <div className="main-content login-form-content">
            <h2 className="text-center pb-3">Login Page</h2>
            <Alert color="danger" isOpen={isVisibleAlert} toggle={onAlertDismiss}>{errorMessage}</Alert>
            <Form onSubmit={onLoginSubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="email" color="info">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control" onBlur={onEmailChangeHandler} />
                    <ValidationError>{emailErrorMessage}</ValidationError>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" id="password" onBlur={onPasswordChangeHandler} />
                    <ValidationError>{passwordErrorMessage}</ValidationError>
                </FormGroup>
                <FormGroup className="text-center m-0 pt-2">
                    <Button color="info" disabled={isDisabled}>Login</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Login;