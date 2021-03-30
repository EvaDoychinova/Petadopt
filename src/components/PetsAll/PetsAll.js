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
        console.log('useEffect-Ref');

        const dbPets = firebase.database().ref('pets/');

        dbPets.on('value', (res) => {
            const data = res.val();
            console.log(data);
            const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } });
            console.log(correctPetsFormat);
            setPets(correctPetsFormat);
        })
    }, []);

    return (
        <div className="pets-all-page">
            <h1>Pets All Page</h1>
            {pets.map((pet) =>
                <PetCard key={pet.id} {...pet} />
            )}
        </div>
    );
}

export default PetsAll;