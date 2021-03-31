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
            const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } });
            setPets(correctPetsFormat);
        })
    }, []);

    return (
        <div className="pets-all-page-content text-center">
            <h1 className="text-center pb-5">Pets All Page</h1>
            <div className="pet-cards-container row row-cols-1 row-cols-md-2 row-cols-lg-3">
                {pets.map((pet) =>
                    <PetCard key={pet.id} {...pet} />
                )}
            </div>
        </div>
    );
}

export default PetsAll;