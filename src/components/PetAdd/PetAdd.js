import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './PetAdd.css';

const PetAdd = () => {
    const categories = [
        {
            "id": 1,
            "name": "Dog"
        },
        {
            "id": 2,
            "name": "Cat"
        },
        {
            "id": 3,
            "name": "Rabbit"
        },
        {
            "id": 4,
            "name": "Hamster"
        },
        {
            "id": 5,
            "name": "Guinee pig"
        },
    ];

    return (
        <div className="pet-add-form-content">
            <h2 className="text-center">Add a Pet</h2>

            <Form className="m-auto">
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" name="name" className="form-control-sm" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="image">ImageUrl</Label>
                    <Input type="url" id="image" name="image" className="form-control-sm" />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="category">Category</Label>
                    <Input type="select" name="category" id="category" className="form-control-sm">
                        {categories.map(x =>
                            <option key={x.id} value={x.id}>{x.name}</option>
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
                        <Input type="number" id="weight" name="weight" className="form-control-sm" />
                    </FormGroup>
                </div>
                <FormGroup className="row col-md-8 col-lg-6 justify-content-between m-0 p-0">
                    <Label className="">Sex:</Label>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="sex" />{' '}
                            Male
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="sex" />{' '}
                            Female
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Input type="textarea" id="description" name="description" className="form-control-sm" />
                </FormGroup>
            </Form>
            <FormGroup className="text-center m-0">
                <Button color="info">Add a pet</Button>
            </FormGroup>
        </div>
    );
}

export default PetAdd;