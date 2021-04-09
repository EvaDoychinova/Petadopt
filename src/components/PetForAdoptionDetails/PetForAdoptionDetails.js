import { useState } from 'react';

import firebase from '../../config/firebase';
import PetContext from '../../contexts/PetContext';
import PetData from '../Shared/PetData';

const PetForAdoptionDetails = ({
    match,
    history,
}) => {
    const [pet, setPet] = useState({});

    const petId = match.params.petId;

    const adoptedPetHandler = () => {
        const adoptedOn = new Date();
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
        <PetContext.Provider value={[pet, setPet]}>
            <PetData
                petId={petId}
                button1Handler={adoptedPetHandler}
                button1Title="Adopted"
                button2Handler={unadoptPetHandler}
                button2Title="Unadopt"
                backButtonLink="/pets/adoption"
                editLink={`/pets/edit/${petId}`}
                deleteLink={`/pets/delete/${petId}`} />
        </PetContext.Provider>
    );
};

export default PetForAdoptionDetails;