import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';
import PetData from '../Shared/PetData';

const MyPetDetails = ({
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

    return (
        <PetData
            pet={pet}
            backButtonLink="/pets/my"
            editLink={`/pets/edit/${pet.id}`}
            deleteLink={`/pets/delete/${pet.id}`} />
    );
};

export default MyPetDetails;