import { Fragment } from 'react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import './PetAdd.css';

const PetAdd=()=>{
    return(
        <Fragment>
            <h2 className="pb-3">Add a Pet</h2>

            <Form className="m-auto">
                <FormGroup>

                </FormGroup>
            </Form>
            <Button>Add a pet</Button>
        </Fragment>
    );
}

export default PetAdd;