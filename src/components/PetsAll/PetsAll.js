import { useState, useEffect } from 'react';

import firebase from '../../firebase';

import PetCard from '../PetCard';

import './PetsAll.css';

const PetsAll = () => {
    // useEffect(()=>{
    //     console.log('useEffect-Fetch');

    //     fetch('https://petadopt-878e9-default-rtdb.firebaseio.com/pets.json')
    //     .then(res=>res.json())
    //     .then(data=>console.log(data));
    // }, []);

    const [pets, setPets] = useState([]);

    useEffect(() => {
        const dbPets = firebase.database().ref('pets/');

        dbPets.on('value', (res) => {
            console.log(res.val());
            const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                .filter(x => x.wantToAdopt === false)
                .sort((a, b) => a['age'] - b['age']);
            console.log(correctPetsFormat);
            setPets(correctPetsFormat);
        })
    }, []);

    return (
        <div className="main-content pets-all-page-content text-center">
            <h1 className="text-center pb-5">The Pets</h1>
            <div className="pet-cards-container row">
                {pets.map((pet) =>
                    <PetCard key={pet.id} {...pet} />
                )}
            </div>
        </div>
    );
}

export default PetsAll;