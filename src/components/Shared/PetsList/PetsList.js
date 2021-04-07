import PetCard from '../PetCard';

import './PetsList.css';

const PetsList = ({
    title,
    pets,
    to,
}) => {
    return (
        <div className="main-content pets-list-page-content text-center">
            <h1 className="text-center pb-5">{title}</h1>
            {
                pets.length > 0
                    ? <div className="pet-cards-container row">
                        {pets.map((pet) =>
                            <PetCard key={pet.id} pet={pet} baseDetailsLink={to} />
                        )}
                    </div>
                    : <h5>There are no pets at the moment!</h5>
            }
        </div>
    );
};

export default PetsList;