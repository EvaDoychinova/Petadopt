import PetForm from '../Shared/PetForm';
import firebase from '../../config/firebase';

const PetEdit = ({
    match,
    history,
}) => {
    const petId = match.params.petId;
    console.log(petId);

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