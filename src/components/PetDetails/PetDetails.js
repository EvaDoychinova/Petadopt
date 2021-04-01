import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import ButtonLink from '../Shared/ButtonLink';
import firebase from '../../firebase';

import './PetDetails.css';

const Pet = ({
    match,
    // history,
}) => {
    const petId = match.params.petId;
    console.log(petId);
    const [pet, setPet] = useState({});

    useEffect(() => {
        const dbPet = firebase.database().ref('pets/' + petId);

        dbPet.on('value', (res) => {
            console.log(res.val());
            const data = res.val();
            console.log(data);
            const correctPetFormat = { ...data, id: petId };
            console.log(correctPetFormat);
            setPet(correctPetFormat);
        })
    }, [petId]);

    const adoptPetHandler = () => {
        console.log(pet);
        console.log(pet.wantToAdopt);
        const updatedPet = { ...pet, wantToAdopt: true };
        console.log(updatedPet);
        // setPet(oldPet =>({...oldPet, wantToAdopt: true}));

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        // history.push('/pets');
        return <Redirect to="/pets"/>
    };

    const fosterPetHandler = () => {

    };

    return (
        <div className="main-content pet-details-page-content">
            <h2 className="text-center pb-3">{pet.name} Details Page</h2>
            <div className="details-img-wrapper">
                <img src={pet.imageUrl} alt="The Pet" className="details-img" />
            </div>
            <ListGroup flush className="details-section">
                <ListGroupItem><b>Gender:</b> {pet.gender}</ListGroupItem>
                <ListGroupItem><b>Age:</b> {pet.age} y.</ListGroupItem>
                <ListGroupItem><b>Weight:</b> {pet.weight} kg</ListGroupItem>
                <ListGroupItem><b>Category:</b> {pet.category}</ListGroupItem>
                <ListGroupItem className="text-break sm"><b>About me:</b> {pet.description}</ListGroupItem>
            </ListGroup>
            <div className="text-center">
                <Button color="info" className="mr-3" onClick={adoptPetHandler}>Adopt</Button>
                <Button color="info" className="ml-3 mr-3" onClick={fosterPetHandler}>Foster Care</Button>
                <ButtonLink color="secondary" to="/pets" className="ml-3">Back to Pets</ButtonLink>
            </div>
        </div>
    );
}

export default Pet;