import { useState, useEffect, useContext } from 'react';

import firebase from '../../config/firebase';
import UserContext from '../../contexts/UserContext';
import PetData from '../Shared/PetData';

const Pet = ({
    match,
    history,
}) => {
    const [pet, setPet] = useState({});
    const [user] = useContext(UserContext);
    
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
        <PetData
            pet={pet}
            button1Handler={adoptPetHandler}
            button1Title="Adopt"
            backButtonLink="/pets"
            editLink={`/pets/edit/${pet.id}`}
            deleteLink={`/pets/delete/${pet.id}`} />
    );
}

export default Pet;