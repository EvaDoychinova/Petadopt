import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';
import PetsList from '../Shared/PetsList';

const PetsAll = ({
    history,
}) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.wantToAdopt === false)
                    .sort((a, b) => a['age'] - b['age']);
                setPets(correctPetsFormat);
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    }, [history]);

    return (
        <PetsList title="The Pets" pets={pets} to='/pets' />
    );
}

export default PetsAll;