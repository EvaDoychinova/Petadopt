import { useState, useEffect } from 'react';

import PetsList from '../Shared/PetsList';
import firebase from '../../config/firebase';

const PetsAll = () => {
    // useEffect(()=>{
    //     console.log('useEffect-Fetch');

    //     fetch('https://petadopt-878e9-default-rtdb.firebaseio.com/pets.json')
    //     .then(res=>res.json())
    //     .then(data=>console.log(data));
    // }, []);

    const [pets, setPets] = useState([]);

    useEffect(() => {
        // const dbPets = firebase.database().ref('pets/');

        // dbPets.on('value', (res) => {
        //     console.log(res.val());
        //     const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
        //         .filter(x => x.wantToAdopt === false)
        //         .sort((a, b) => a['age'] - b['age']);
        //     console.log(correctPetsFormat);
        //     setPets(correctPetsFormat);
        // });

        firebase.database().ref('pets/').once('value').then((res) => {
            console.log(res.val());
            const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                .filter(x => x.wantToAdopt === false)
                .sort((a, b) => a['age'] - b['age']);
            console.log(correctPetsFormat);
            setPets(correctPetsFormat);
        });
    }, []);

    return (
        <PetsList title="The Pets" pets={pets} to='/pets' />
    );
}

export default PetsAll;