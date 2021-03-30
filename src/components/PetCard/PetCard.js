import { Fragment } from "react";

import './PetCard.css';

const PetCard = (pet) => {
console.log(pet);
console.log(pet.imageUrl);

    return (
        <Fragment>
            <div className="image-wrapper">
                <img src={pet.imageUrl} alt="PetImage" />
            </div>
            <h4>{pet.name}</h4>
            <p>{pet.category}</p>
            <p>{pet.sex}</p>
            <p>{pet.age}</p>
            <p>{pet.weight}</p>
            <p>{pet.description}</p>
        </Fragment>
    );
}

export default PetCard;