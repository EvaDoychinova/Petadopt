import { useState, useEffect } from 'react';

import PetData from '../Shared/PetData';
import firebase from '../../config/firebase';

const PetForAdoptionDetails = ({
    match,
    history,
}) => {
    console.log(match);
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

    const adoptedPetHandler = () => {
        console.log(pet);
        console.log(pet.isAdopted);
        const updatedPet = { ...pet, isAdopted: true };
        console.log(updatedPet);
        // setPet(oldPet => ({ ...oldPet, isAdopted: true }));

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        history.push('/pets/adoption');
    };

    const unadoptPetHandler = () => {
        console.log(pet.wantToAdopt);
        const updatedPet = { ...pet, wantToAdopt: false };
        console.log(updatedPet);
        // setPet(oldPet => ({ ...oldPet, wantToAdopt: false }));

        firebase.database().ref('/pets/' + pet.id).update(updatedPet);
        history.push('/pets/adoption');
    };

    return (
        <PetData
            pet={pet}
            button1Handler={adoptedPetHandler}
            button1Title="Adopted"
            button2Handler={unadoptPetHandler}
            button2Title="Unadopt"
            backButtonLink="/pets/adoption"
            editLink={`/pets/edit/${pet.id}`}
            deleteLink={`/pets/delete/${pet.id}`} />
    );
};

export default PetForAdoptionDetails;