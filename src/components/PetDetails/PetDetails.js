import { useState, useEffect } from 'react';

import firebase from '../../firebase';

import './PetDetails.css';

const Pet = ({
    match,
}) => {
    const petId=match.params.petId;
    console.log(petId);
    const [pet, setPet] = useState({});

    useEffect(() => {
        const dbPet = firebase.database().ref('pets/' + petId);

        dbPet.on('value', (res) => {
            console.log(res.val());
            const data=res.val();
            console.log(data);
            const correctPetFormat = { ...data, id: petId };
            console.log(correctPetFormat);
            setPet(correctPetFormat);
        })
    },[]);

    return (
        <div className="main-content pet-details-page-content">
            <h2 className="text-center">{pet.name} Details Page</h2>
            <div className="details-img-wrapper">
                <img src={pet.imageUrl} alt="Pet Image"/>
            </div>

        </div>
    );
}

export default Pet;