import {useState, useEffect} from 'react';

import PetsList from '../Shared/PetsList';
import firebase from '../../config/firebase';

import './PetsForAdoption.css';

const PetsForAdoption = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        firebase.database().ref('pets/').once('value').then((res) => {
            console.log(res.val());
            const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                .filter(x => x.wantToAdopt === true && x.isAdopted===false)
                .sort((a, b) => a['age'] - b['age']);
            console.log(correctPetsFormat);
            setPets(correctPetsFormat);
        });
    }, []);

    return (
        <PetsList title="Pets for Adoption" pets={pets} to='/pets/adoption'/>
    );
};

export default PetsForAdoption;