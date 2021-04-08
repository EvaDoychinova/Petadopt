import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';

import ButtonLink from '../ButtonLink';

import './PetCard.css';

const PetCard = ({
    pet,
    baseDetailsLink,
}) => {
    return (
        <Card className="pet-card">
            <CardBody className="text-center position-relative">
                <CardTitle tag="h5">{pet.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Gender: {pet.gender}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Age: {pet.age} years</CardSubtitle>
                {
                    pet.isAdopted
                        ? <img src="/img/adopted-stamp.png" alt="Adopted!" className="img-adopted-stamp" />
                        : null
                }
            </CardBody>
            <div className="img-container">
                <CardImg src={pet.imageUrl} alt="Pet image" className="pet-image" />
            </div>
            <CardBody className="text-center">
                <CardText>{pet.description}</CardText>
                <ButtonLink color="info" to={`${baseDetailsLink}/${pet.id}`} >Details</ButtonLink>
            </CardBody>
        </Card>
    );
}

export default PetCard;