import { useState, useEffect, useContext } from 'react';

import firebase from '../../config/firebase';
import UserContext from '../../contexts/UserContext';
import PetsList from '../Shared/PetsList';
import Loading from '../Shared/Loading';

const MyPets = ({
    history,
}) => {
    const [pets, setPets] = useState([]);
    const [user] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.adopter?.uid === user.uid)
                    .sort((a, b) => a['age'] - b['age']);
                console.log(correctPetsFormat);
                setPets(correctPetsFormat);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                history.push('/error');
            });
    }, [user, history]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <PetsList title="My Pets" pets={pets} to='/pets/my' />
    );
};

export default MyPets;