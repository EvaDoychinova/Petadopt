import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import ButtonLink from '../ButtonLink';

import './PetData.css';

const PetData = ({
    pet,
    button1Handler,
    button1Title,
    button2Handler,
    button2Title,
    backButtonLink,
    editLink,
    deleteLink,
}) => {
    return (
        <div className="main-content pet-details-page-content">
            <h2 className="text-center pb-3">{pet.name} Details Page</h2>
            <div className="details-img-wrapper">
                <img src={pet.imageUrl} alt="The Pet" className="details-img" />
            </div>
            <ListGroup flush className="details-section">
                <ListGroupItem><b>Gender:</b> {pet.gender}</ListGroupItem>
                <ListGroupItem><b>Age:</b> {pet.age} y.</ListGroupItem>
                <ListGroupItem><b>Weight:</b> {pet.weight} kg</ListGroupItem>
                <ListGroupItem><b>Category:</b> {pet.category}</ListGroupItem>
                <ListGroupItem className="text-break sm"><b>About me:</b> {pet.description}</ListGroupItem>
                {(pet.adopter) ?
                    <ListGroupItem>Adopter: {pet.adopter}</ListGroupItem> :
                    null}
            </ListGroup>
            <div className="row pt-2">
                <Button color="info" className="col ml-3 mr-3" onClick={button1Handler}>{button1Title}</Button>
                {(button2Handler && button2Title) ?
                    <Button color="info" className="col ml-3 mr-3" onClick={button2Handler}>{button2Title}</Button> :
                    null}
                <ButtonLink color="secondary" to={backButtonLink} className="col ml-3 mr-3">Back to Pets</ButtonLink>
            </div>
            <div className="row pt-4">
                {(editLink) ?
                    <ButtonLink color="info" to={editLink} className="col ml-3 mr-3">Edit</ButtonLink> :
                    null}
                {(deleteLink) ?
                    <ButtonLink color="danger" to={deleteLink} className="col ml-3 mr-3">Delete</ButtonLink> :
                    null}
            </div>
        </div>
    );
};

export default PetData;