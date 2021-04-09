import { useState, useContext } from 'react';

import firebase from '../../config/firebase';
import PetContext from '../../contexts/PetContext';
import UserContext from '../../contexts/UserContext';
import PetData from '../Shared/PetData';

const Pet = ({
    match,
    history,
}) => {
    const [pet, setPet] = useState({});
    const [user] = useContext(UserContext);

    const petId = match.params.petId;

    const adoptPetHandler = () => {
        console.log(pet);
        console.log(user);
        const currentAdopter = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        }
        const updatedPet = { ...pet, wantToAdopt: true, adopter: currentAdopter };
        console.log(updatedPet);

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        history.push('/pets');
    };

    return (
        <PetContext.Provider value={[pet, setPet]}>
            <PetData
                petId={petId}
                button1Handler={adoptPetHandler}
                button1Title="Adopt"
                backButtonLink="/pets"
                editLink={`/pets/edit/${petId}`}
                deleteLink={`/pets/delete/${petId}`} />
        </PetContext.Provider>
    );
}

export default Pet;