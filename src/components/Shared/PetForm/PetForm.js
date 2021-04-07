import { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import ButtonLink from '../ButtonLink';
import firebase from '../../../config/firebase';

import './PetForm.css';

const PetForm = ({
    petId,
    pageTitle,
    submitButtonTitle,
    backButtonLink,
    backButtonTitle,
    onFormSubmitHandler,
}) => {
    const [pet, setPet] = useState({});
    const [categories, setCategories] = useState([]);
    const [gender, setGender] = useState();

    useEffect(() => {
        firebase.database().ref('categories/').once('value').then((res) => {
            console.log(res.val());
            const correctCategoriesFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                .sort((a, b) => a['name'].localeCompare(b['name']));;
            console.log(correctCategoriesFormat);
            setCategories(correctCategoriesFormat);
        });
    }, []);

    useEffect(() => {
        firebase.database().ref('pets/' + petId).once('value').then((res) => {
            console.log(res.val());
            const data = res.val();
            console.log(data);
            const correctPetFormat = { ...data, id: petId };
            console.log(correctPetFormat);
            setPet(correctPetFormat);
            setGender(correctPetFormat.gender);
        });
    }, [petId]);

    const onChangeHandler = (e) => {
        console.log(e);
        let property = e.target.name;
        console.log(property);

        const updatedPet = { ...pet, [property]: e.target.value };
        console.log(updatedPet);
        setPet(updatedPet);
    };

    const onGenderChangeHandler = (e) => {
        let newGender = e.target.value;
        console.log(newGender);
        setGender(newGender);
        const updatedPet = { ...pet, gender: newGender };
        console.log(updatedPet)
        setPet(updatedPet);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);

        onFormSubmitHandler(pet);
    };

    return (
        <div className="main-content pet-form-content">
            <h2 className="text-center">{pageTitle}</h2>
            <Form onSubmit={formSubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control-sm"
                        defaultValue={pet?.name}
                        onBlur={onChangeHandler} />
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
                        onBlur={onChangeHandler}>
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
                    <Button type="submit" color="info" className="mr-3">{submitButtonTitle}</Button>
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