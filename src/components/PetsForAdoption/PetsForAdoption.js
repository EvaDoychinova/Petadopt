import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';
import PetsList from '../Shared/PetsList';
import Loading from '../Shared/Loading';

const PetsForAdoption = ({
    history,
}) => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebase.database().ref('pets/').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.wantToAdopt === true && x.isAdopted === false)
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
    }, [history]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <PetsList title="Pets for Adoption" pets={pets} to='/pets/adoption' />
    );
};

export default PetsForAdoption;