import { useState } from 'react';

import PetContext from '../../contexts/PetContext';
import PetData from '../Shared/PetData';

const AdoptedPetDetails = ({
    match,
}) => {
    const [pet, setPet] = useState({});

    const petId = match.params.petId;

    return (
        <PetContext.Provider value={[pet, setPet]}>
            <PetData
                petId={petId}
                backButtonLink="/pets/adopted"
                editLink={`/pets/edit/${petId}`}
                deleteLink={`/pets/delete/${petId}`} />
        </PetContext.Provider>
    );
};

export default AdoptedPetDetails;