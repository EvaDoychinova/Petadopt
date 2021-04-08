import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import firebase from '../../config/firebase';
import PetData from '../Shared/PetData';

const AdoptedPetDetails = () => {
    const [pet, setPet] = useState({});
    const history = useHistory({});
    
    const params=useParams();
    const petId = params.petId;

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

export default AdoptedPetDetails;