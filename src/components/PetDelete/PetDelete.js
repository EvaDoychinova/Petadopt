import { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import ButtonLink from '../Shared/ButtonLink';
import firebase from '../../config/firebase';

import './PetDelete.css';

const PetDelete = ({
    match,
    history,
}) => {
    const petId = match.params.petId;
    const [pet, setPet] = useState({});

    useEffect(() => {
        firebase.database().ref('pets/' + petId).once('value').then((res) => {
            console.log(res.val());
            const data = res.val();
            console.log(data);
            const correctPetFormat = { ...data, id: petId };
            console.log(correctPetFormat);
            setPet(correctPetFormat);
        });
    }, [petId]);

    const deleteHandler = () => {
        firebase.database().ref('pets/' + pet.id).remove();
        history.push('/pets');
    };

    return (
        <div className="main-content pet-delete-page-content">
            <h2 className="text-center">Are you sure you want to delete {pet.name}?</h2>
            <ListGroup flush className="text-center">
                <ListGroupItem><b>Gender:</b> {pet.gender}</ListGroupItem>
                <ListGroupItem><b>Age:</b> {pet.age} y.</ListGroupItem>
                <ListGroupItem><b>Weight:</b> {pet.weight} kg</ListGroupItem>
                <ListGroupItem><b>Category:</b> {pet.category}</ListGroupItem>
                <ListGroupItem className="text-break sm"><b>About me:</b> {pet.description}</ListGroupItem>
            </ListGroup>
            <div className="row pt-2">
                <Button color="danger" className="col ml-3 mr-3" onClick={deleteHandler}>Delete</Button>
                <ButtonLink
                    color="secondary"
                    to={pet.adopter ? `/pets/adoption/${pet.id}` : `/pets/${pet.id}`}
                    className="col ml-3 mr-3">
                    Back to Pets
                    </ButtonLink>
            </div>
        </div>
    );
};

export default PetDelete;