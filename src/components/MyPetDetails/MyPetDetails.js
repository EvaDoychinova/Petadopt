import PetData from '../Shared/PetData';

const MyPetDetails = ({
    match,
}) => {
    const petId = match.params.petId;

    return (
        <PetData
            petId={petId}
            backButtonLink="/pets/my"
            editLink={`/pets/edit/${petId}`}
            deleteLink={`/pets/delete/${petId}`} />
    );
};

export default MyPetDetails;