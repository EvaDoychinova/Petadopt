import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PetsList from '../Shared/PetsList';
import firebase from '../../config/firebase';

const PetsForAdoption = () => {
    const [pets, setPets] = useState([]);
    const history = useHistory({});

    useEffect(() => {
        firebase.database().ref('pets/').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.wantToAdopt === true && x.isAdopted === false)
                    .sort((a, b) => a['age'] - b['age']);
                console.log(correctPetsFormat);
                setPets(correctPetsFormat);
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    }, [history]);

    return (
        <PetsList title="Pets for Adoption" pets={pets} to='/pets/adoption' />
    );
};

export default PetsForAdoption;