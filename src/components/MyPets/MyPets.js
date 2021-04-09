import { useState, useEffect, useContext } from 'react';

import firebase from '../../config/firebase';
import UserContext from '../../contexts/UserContext';
import PetsList from '../Shared/PetsList';

const MyPets = ({
    history,
}) => {
    const [pets, setPets] = useState([]);
    const [user] = useContext(UserContext);

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.adopter?.uid === user.uid)
                    .sort((a, b) => a['age'] - b['age']);
                console.log(correctPetsFormat);
                setPets(correctPetsFormat);
            })
            .catch((error) => {
                console.log(error);
                history.push('/error');
            });
    }, [user, history]);

    return (
        <PetsList title="My Pets" pets={pets} to='/pets/my' />
    );
};

export default MyPets;