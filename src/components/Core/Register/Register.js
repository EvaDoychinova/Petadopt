import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import UserContext from '../../../contexts/UserContext';
import firebase from '../../../config/firebase';

import './Register.css';

const Register = () => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory({});

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
                        history.push('/error');
                    });

                // currentUser.linkWithPhoneNumber(phoneNumber)
                // .then(()=>{
                //     setUser(currentUser);
                //     console.log("Phone number updated!");
                // })
                // .catch((error) => {
                //     console.log(error);
                //     var errorCode = error.code;
                //     var errorMessage = error.message;

                //     history.push('/error');
                // });
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    };

    return (
        <div className="main-content register-form-content">
            <h2 className="text-center pb-3">Register Page</h2>
            <Form onSubmit={onRegisterSubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="displayName">Username</Label>
                    <Input type="text" name="displayName" id="displayName" className="form-control" />
                </FormGroup>
                {/* <FormGroup>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input type="text" name="phoneNumber" id="phoneNumber" className="form-control" />
                </FormGroup> */}
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