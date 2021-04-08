import { useHistory } from 'react-router-dom';

import firebase from '../../config/firebase';
import PetForm from '../Shared/PetForm';

const PetEdit = ({
    match,
}) => {
    const petId = match.params.petId;
    const history = useHistory({});

    const onEditPetSubmitHandler = (currentPet) => {
        firebase.database().ref('pets/' + petId).update(currentPet);
        history.push(`/pets/${petId}`);
    };

    return (
        <PetForm
            petId={petId}
            pageTitle={`Edit pet`}
            submitButtonTitle="Edit"
            backButtonTitle="Back to details"
            // backButtonLink={`/pets/${petId}`}
            backButtonLink={`/${petId}`}
            onFormSubmitHandler={onEditPetSubmitHandler} />
    );
};

export default PetEdit;