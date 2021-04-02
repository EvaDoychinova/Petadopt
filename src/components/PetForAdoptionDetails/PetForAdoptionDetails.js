import {useState, useEffect} from 'react';

import firebase from '../../firebase';
import PetData from '../Shared/PetData';

import './PetForAdoptionDetails.css';

const PetForAdoptionDetails=({
    match,
    history,
}) => {
    console.log(match);
    const petId = match.params.petId;
    console.log(petId);
    const [pet, setPet] = useState({});

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

    const adoptedPetHandler = () => {
        console.log(pet);
        console.log(pet.isAdopted);
        const updatedPet = { ...pet, isAdopted: true };
        console.log(updatedPet);
        // setPet(oldPet =>({...oldPet, wantToAdopt: true}));

        firebase.database().ref('pets/' + pet.id).update(updatedPet);
        history.push('/pets/adoption');
    };

    const unadoptPetHandler = () => {
        console.log(pet.wantToAdopt);
        const updatedPet={...pet, wantToAdopt:false};
        console.log(updatedPet);

        firebase.database().ref('/pets'+pet.id).update(updatedPet);
        history.push('/pets/adoption');
    }

    return (
        <PetData
            pet={pet}
            button1Handler={adoptedPetHandler}
            button1Title="Adopted"
            button2Handler={unadoptPetHandler}
            button2Title="Unadopt"
            backLink="/pets/adoption" />
    );
};

export default PetForAdoptionDetails;