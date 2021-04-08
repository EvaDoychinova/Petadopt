import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from '../../config/firebase';
import PetsList from '../Shared/PetsList';

import './AdoptedPets.css';

const AdoptedPets = () => {
    const [pets, setPets] = useState([]);
    const history = useHistory({});

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.isAdopted === true)
                    .sort((a, b) => b['dateAdopted'].localeCompare(a['dateAdopted']));
                console.log(correctPetsFormat);
                setPets(correctPetsFormat);
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    }, [history]);

    return (
        <PetsList title="Adopted Pets" pets={pets} to='/pets/adopted' />
    );
};

export default AdoptedPets;