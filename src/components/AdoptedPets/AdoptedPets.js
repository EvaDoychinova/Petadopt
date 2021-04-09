import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';
import PetsList from '../Shared/PetsList';
import Loading from '../Shared/Loading';

const AdoptedPets = ({
    history,
}) => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.isAdopted === true)
                    .sort((a, b) => b['dateAdopted'].localeCompare(a['dateAdopted']));
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
        <PetsList title="Adopted Pets" pets={pets} to='/pets/adopted' />
    );
};

export default AdoptedPets;