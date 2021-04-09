import PetData from '../Shared/PetData';

const AdoptedPetDetails = ({
    match,
}) => {
    const petId = match.params.petId;

    return (
        <PetData
            petId={petId}
            backButtonLink="/pets/adopted"
            editLink={`/pets/edit/${petId}`}
            deleteLink={`/pets/delete/${petId}`} />
    );
};

export default AdoptedPetDetails;