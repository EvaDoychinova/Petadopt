import { useState, useEffect } from 'react';

import firebase from '../../firebase';
import PetData from '../Shared/PetData';

import './PetDetails.css';

const Pet = ({
    match,
    history,
}) => {
    const petId = match.params.petId;
    console.log(petId);
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

    const adoptPetHandler = () => {
        console.log(pet);
        console.log(pet.wantToAdopt);
        const updatedPet = { ...pet, wantToAdopt: true };
        console.log(updatedPet);
        // setPet(oldPet =>({...oldPet, wantToAdopt: true}));

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        history.push('/pets');
    };

    // const fosterHandler=()=>{

    // };

    return (
        <PetData
            pet={pet}
            button1Handler={adoptPetHandler}
            button1Title="Adopt"
            // button2Handler={fosterHandler}
            // button2Title="Foster care"
            backLink="/pets" />
    );
}

export default Pet;