import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from '../../config/firebase';
import UserContext from '../../contexts/UserContext';
import PetsList from '../Shared/PetsList';

const MyPets = () => {
    const [pets, setPets] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const history = useHistory({});

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                console.log(res.val());
                console.log(user.uid);
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