import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';
import PetData from '../Shared/PetData';

const PetForAdoptionDetails = ({
    match,
    history,
}) => {
    const [pet, setPet] = useState({});

    const petId = match.params.petId;

    useEffect(() => {
        firebase.database().ref('pets/' + petId).once('value')
            .then((res) => {
                const data = res.val();
                const correctPetFormat = { ...data, id: petId };
                console.log(correctPetFormat);
                setPet(correctPetFormat);
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    }, [petId, history]);

    const adoptedPetHandler = () => {
        console.log(pet.isAdopted);
        const adoptedOn = new Date();
        console.log(adoptedOn);
        const updatedPet = { ...pet, isAdopted: true, dateAdopted: adoptedOn.toJSON() };
        console.log(updatedPet);

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        history.push('/pets/adoption');
    };

    const unadoptPetHandler = () => {
        console.log(pet.wantToAdopt);
        const updatedPet = { ...pet, wantToAdopt: false, adopter: null };
        console.log(updatedPet);

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