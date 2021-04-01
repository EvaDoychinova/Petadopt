import { useState, useEffect } from 'react';

import firebase from '../../firebase';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './PetAdd.css';

const PetAdd = ({
    history
}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const dbCategories = firebase.database().ref('categories/');

        dbCategories.on('value', (res) => {
            console.log(res.val());
            const correctCategoriesFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                .sort((a, b) => a['name'].localeCompare(b['name']));;
            console.log(correctCategoriesFormat);
            setCategories(correctCategoriesFormat);
        });
    }, []);

    const onAddPetSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e);
        const { name, imageUrl, category, age, weight, gender, description } = e.target;

        var newPet = {
            name: name.value,
            imageUrl: imageUrl.value,
            category: category.value,
            age: Number(age.value),
            weight: Number(weight.value),
            gender: gender.value,
            description: description.value,
            isAdopted: false,
            wantToAdopt:false,
        }
        let newPetKey=firebase.database().ref('pets').push(newPet).key;
        console.log(newPetKey);
        history.push(`/pets/${newPetKey}`);

        // firebase.database().ref('pets').push(newPet);
        // history.push('/pets');
    };

    return (
        <div className="main-content pet-add-form-content">
            <h2 className="text-center">Add a Pet</h2>

            <Form onSubmit={onAddPetSubmitHandler} className="m-auto">
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" className="form-control-sm" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="imageUrl">ImageUrl</Label>
                    <Input type="url" id="imageUrl" name="imageUrl" className="form-control-sm" />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="category">Category</Label>
                    <Input type="select" name="category" id="category" className="form-control-sm">
                        {categories.map(x =>
                            <option key={x.id} value={x.name}>{x.name}</option>
                        )}
                    </Input>
                </FormGroup>
                <div className="row">
                    <FormGroup className="col-6">
                        <Label htmlFor="age">Age</Label>
                        <Input type="number" increment="1" id="age" name="age" className="form-control-sm" />
                    </FormGroup>
                    <FormGroup className="col-6">
                        <Label htmlFor="weight">Weight</Label>
                        <Input type="number" step="any" id="weight" name="weight" className="form-control-sm" />
                    </FormGroup>
                </div>
                <FormGroup className="row col-md-8 col-lg-6 justify-content-between m-0 p-0">
                    <Label className="">Gender:</Label>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="gender" value="male" />{' '}
                            Male
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="gender" value="female" />{' '}
                            Female
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input type="textarea" id="description" name="description" className="form-control-sm" />
                </FormGroup>
                <FormGroup className="text-center m-0">
                    <Button type="submit" color="info">Add a pet</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default PetAdd;