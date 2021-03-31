import { Link } from 'react-router-dom';

import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Button } from 'reactstrap';

import './PetCard.css';

const PetCard = (pet) => {
    return (
        <Card className="pet-card">
            <CardBody className="text-center">
                <CardTitle tag="h5">{pet.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Age: {pet.age}</CardSubtitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Gender: {pet.gender}</CardSubtitle>
            </CardBody>
            <div className="img-container">
                <CardImg src={pet.imageUrl} alt="Pet image" className="pet-image" />
            </div>
            <CardBody className="text-center">
                <CardText>{pet.description}</CardText>
                <Button color="info" className="mr-3"><Link to={`/pets/${pet.id}`} className="card-link">Details</Link></Button>
                <Button color="info" className="ml-3"><Link to={`/donate/${pet.id}`} className="card-link">Donate</Link></Button>
            </CardBody>
        </Card>
    );
}

export default PetCard;