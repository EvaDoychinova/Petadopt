import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import firebase from '../../../config/firebase';
import ButtonLink from '../ButtonLink';
import ValidationError from '../ValidationError';

import './PetForm.css';

const PetForm = ({
    petId,
    pageTitle,
    submitButtonTitle,
    backButtonLink,
    backButtonTitle,
    onFormSubmitHandler,
}) => {
    const [pet, setPet] = useState({category: 'cat'});
    const [categories, setCategories] = useState([]);
    const [gender, setGender] = useState();
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [isVisibleAlert, setIsVisibleAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const history = useHistory({});

    useEffect(() => {
        firebase.database().ref('categories/').once('value')
            .then((res) => {
                const correctCategoriesFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .sort((a, b) => a['name'].localeCompare(b['name']));;
                console.log(correctCategoriesFormat);
                setCategories(correctCategoriesFormat);
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
    }, [history]);

    useEffect(() => {
        if (petId) {
            firebase.database().ref('pets/' + petId).once('value')
                .then((res) => {
                    const data = res.val();
                    const correctPetFormat = { ...data, id: petId };
                    console.log(correctPetFormat);
                    setPet(correctPetFormat);
                    setGender(correctPetFormat.gender);
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
        }
    }, [petId, history]);

    const onAlertDismiss = () => {
        setIsVisibleAlert(false);
    }

    const onNameChangeHandler = (e) => {
        const input = e.target.value;

        if (input.length < 2 || input.length > 20) {
            setNameErrorMessage('Name should be between 2 and 20 characters long!');
            setIsDisabled(true);
        } else {
            setNameErrorMessage('');
            setIsDisabled(false);
            const updatedPet = { ...pet, name: input };
            console.log(updatedPet);
            setPet(updatedPet);
        }
    };

    const onChangeHandler = (e) => {
        let property = e.target.name;
        const updatedPet = { ...pet, [property]: e.target.value };
        console.log(updatedPet);
        setPet(updatedPet);
    };

    const onGenderChangeHandler = (e) => {
        let newGender = e.target.value;
        setGender(newGender);
        const updatedPet = { ...pet, gender: newGender };
        console.log(updatedPet)
        setPet(updatedPet);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        onFormSubmitHandler(pet);
    };

    return (
        <div className="main-content pet-form-content">
            <h2 className="text-center">{pageTitle}</h2>
            <Alert color="danger" isOpen={isVisibleAlert} toggle={onAlertDismiss}>{errorMessage}</Alert>
            <Form onSubmit={formSubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control-sm"
                        defaultValue={pet?.name}
                        onBlur={onNameChangeHandler} />
                    <ValidationError>{nameErrorMessage}</ValidationError>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="imageUrl">ImageUrl</Label>
                    <Input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        className="form-control-sm"
                        defaultValue={pet?.imageUrl}
                        onBlur={onChangeHandler} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="category">Category</Label>
                    <Input
                        type="select"
                        name="category"
                        id="category"
                        className="form-control-sm"
                        value={pet?.category}
                        onChange={onChangeHandler}>
                        {categories.map(x =>
                            <option key={x.id} defaultValue={x.name}>{x.name}</option>
                        )}
                    </Input>
                </FormGroup>
                <div className="row">
                    <FormGroup className="col-6">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            type="number"
                            increment="1"
                            id="age"
                            name="age"
                            className="form-control-sm"
                            defaultValue={pet?.age}
                            onBlur={onChangeHandler} />
                    </FormGroup>
                    <FormGroup className="col-6">
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                            type="number"
                            step="any"
                            id="weight"
                            name="weight"
                            className="form-control-sm"
                            defaultValue={pet?.weight}
                            onBlur={onChangeHandler} />
                    </FormGroup>
                </div>
                <FormGroup className="row col-md-8 col-lg-6 justify-content-between m-0 p-0">
                    <Label className="">Gender:</Label>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={gender === "male"}
                                onChange={onGenderChangeHandler} />{' '}
                            Male
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="gender"
                                value="female"
                                id="female"
                                checked={gender === "female"}
                                onChange={onGenderChangeHandler} />{' '}
                            Female
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        type="textarea"
                        id="description"
                        name="description"
                        className="form-control-sm"
                        defaultValue={pet?.description}
                        onBlur={onChangeHandler} />
                </FormGroup>
                <FormGroup className="text-center m-0">
                    <Button type="submit" color="info" className="mr-3" disabled={isDisabled}>{submitButtonTitle}</Button>
                    <ButtonLink
                        color="secondary"
                        to={(pet?.adopter ? '/pets/adoption' : '/pets') + (backButtonLink ? backButtonLink : '')}
                        className="ml-3">
                        {backButtonTitle}
                    </ButtonLink>
                </FormGroup>
            </Form>
        </div>
    );
};

export default PetForm;