import { useState, useEffect } from 'react';

import firebase from '../../config/firebase';
import Loading from '../Shared/Loading';
import PetsList from '../Shared/PetsList';

const PetsAll = ({
    history,
}) => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebase.database().ref('pets').once('value')
            .then((res) => {
                const correctPetsFormat = Object.entries(res.val()).map(([id, value]) => { return { ...value, id: id } })
                    .filter(x => x.wantToAdopt === false)
                    .sort((a, b) => a['age'] - b['age']);
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
        <PetsList title="The Pets" pets={pets} to='/pets' />
    );
}

export default PetsAll;