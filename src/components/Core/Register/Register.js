import { useState, useContext } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import firebase from '../../../config/firebase';
import UserContext from '../../../contexts/UserContext';
import ValidationError from '../../Shared/ValidationError';

import './Register.css';

const Register = ({
    history,
}) => {
    const [, setUser] = useContext(UserContext);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [rePasswordErrorMessage, setRePasswordErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [isVisibleAlert, setIsVisibleAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const onAlertDismiss = () => {
        setIsVisibleAlert(false);
    }

    const onUsernameChangeHandler = (e) => {
        const input = e.target.value;

        if (input.length < 3 || input.length > 20) {
            setUsernameErrorMessage('Username should be between 3 and 20 characters long!');
            setIsDisabled(true);
        } else {
            setUsernameErrorMessage('');
            setIsDisabled(false);
        }
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
        setPassword(input);

        if (input.length < 6) {
            setPasswordErrorMessage('Password should be at least 6 characters long!');
            setIsDisabled(true);
        } else {
            setPasswordErrorMessage('');
            setIsDisabled(false);
        }
    };

    const onRePasswordChangeHandler = (e) => {
        const input = e.target.value;

        if (input !== password) {
            setRePasswordErrorMessage("Passwords don't match!");
            setIsDisabled(true);
        } else {
            setRePasswordErrorMessage('');
            setIsDisabled(false);
        }
    };

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        // let phoneNumber=e.target.phoneNumber.value;
        let displayName = e.target.displayName.value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let currentUser = userCredential.user;

                currentUser.updateProfile({
                    displayName: displayName,
                })
                    .then(() => {
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
        <div className="main-content register-form-content">
            <h2 className="text-center pb-1">Register Page</h2>
            <Alert color="danger" isOpen={isVisibleAlert} toggle={onAlertDismiss}>{errorMessage}</Alert>
            <Form onSubmit={onRegisterSubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="displayName">Username</Label>
                    <Input type="text" name="displayName" id="displayName" className="form-control" onBlur={onUsernameChangeHandler} />
                    <ValidationError>{usernameErrorMessage}</ValidationError>
                </FormGroup>
                {/* <FormGroup>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                </FormGroup> */}
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" id="email" className="form-control" onBlur={onEmailChangeHandler} />
                    <ValidationError>{emailErrorMessage}</ValidationError>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        onChange={onPasswordChangeHandler}
                        value={password} />
                    <ValidationError>{passwordErrorMessage}</ValidationError>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="rePassword">Repeat Password</Label>
                    <Input type="password" name="rePassword" id="rePassword" onBlur={onRePasswordChangeHandler} />
                    <ValidationError>{rePasswordErrorMessage}</ValidationError>
                </FormGroup>
                <FormGroup className="text-center m-0 pt-2">
                    <Button color="info" disabled={isDisabled}>Register</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default Register;