import firebase from '../../config/firebase';
import PetData from '../Shared/PetData';

const PetForAdoptionDetails = ({
    match,
    history,
}) => {
    const petId = match.params.petId;

    const adoptedPetHandler = (pet) => {
        const adoptedOn = new Date();
        const updatedPet = { ...pet, isAdopted: true, dateAdopted: adoptedOn.toJSON() };
        console.log(updatedPet);

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        history.push('/pets/adoption');
    };

    const unadoptPetHandler = (pet) => {
        console.log(pet.wantToAdopt);
        const updatedPet = { ...pet, wantToAdopt: false, adopter: null };
        console.log(updatedPet);

        firebase.database().ref('/pets/' + pet.id).update(updatedPet);
        history.push('/pets/adoption');
    };

    return (
            <PetData
                petId={petId}
                button1Handler={adoptedPetHandler}
                button1Title="Adopted"
                button2Handler={unadoptPetHandler}
                button2Title="Unadopt"
                backButtonLink="/pets/adoption"
                editLink={`/pets/edit/${petId}`}
                deleteLink={`/pets/delete/${petId}`} />
    );
};

export default PetForAdoptionDetails;