import { useState, useEffect, useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import firebase from '../../config/firebase';
import PetData from '../Shared/PetData';

const Pet = ({
    match,
    history,
}) => {
    const petId = match.params.petId;
    console.log(petId);
    const [pet, setPet] = useState({});
    const [user, setUser] = useContext(UserContext);

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
        console.log(user);
        const currentAdopter={
            uid:user.uid,
            email:user.email,
            displayName:user.displayName,
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