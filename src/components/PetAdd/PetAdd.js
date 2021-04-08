import { useHistory } from 'react-router-dom';

import firebase from '../../config/firebase';
import PetForm from '../Shared/PetForm/PetForm';

const PetAdd = () => {
    const history = useHistory({});

    const onAddPetSubmitHandler = (currentPet) => {
        var newPet = {
            name: currentPet.name,
            imageUrl: currentPet.imageUrl,
            category: currentPet.category,
            age: Number(currentPet.age),
            weight: Number(currentPet.weight),
            gender: currentPet.gender,
            description: currentPet.description,
            isAdopted: false,
            wantToAdopt: false,
        }
        let newPetKey = firebase.database().ref('pets').push(newPet).key;
        console.log(newPetKey);
        history.push(`/pets/${newPetKey}`);
    };

    return (
        <PetForm
            pageTitle="Add new pet"
            submitButtonTitle="Add the pet"
            backButtonTitle="Back to pets"
            // backButtonLink="/pets"
            onFormSubmitHandler={onAddPetSubmitHandler} />
    );
};

export default PetAdd;