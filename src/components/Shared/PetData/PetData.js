import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

import firebase from '../../../config/firebase';
import Admin from '../../../secrets/admin.json';
import UserContext from '../../../contexts/UserContext';
import ButtonLink from '../ButtonLink';
import Loading from '../Loading';

import './PetData.css';

const PetData = ({
    petId,
    button1Handler,
    button1Title,
    button2Handler,
    button2Title,
    backButtonLink,
    editLink,
    deleteLink,
}) => {
    const [user] = useContext(UserContext);
    const [pet, setPet] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory({});

    useEffect(() => {
        firebase.database().ref('pets/' + petId).once('value')
            .then((res) => {
                const data = res.val();
                const correctPetFormat = { ...data, id: petId };
                console.log(correctPetFormat);
                setPet(correctPetFormat);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                history.push('/error');
            });
    }, [petId, history, setPet]);

    const onButton1Handler=()=>{
        button1Handler(pet);
    }

    const onButton2Handler=()=>{
        button2Handler(pet);
    }

    if (isLoading) {
        return <Loading />;
    }

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
                <ListGroupItem><b>About me:</b> {pet.description}</ListGroupItem>
                {
                    pet.adopter
                        ? <ListGroupItem><b>Adopter:</b> {pet.adopter.displayName}</ListGroupItem>
                        : null
                }
                {
                    pet.dateAdopted
                        ? <ListGroupItem><b>Adopted on:</b> {new Date(pet.dateAdopted).toDateString()}</ListGroupItem>
                        : null
                }
            </ListGroup>
            <div className="row pt-2">
                {(user && pet.isAdopted === false && button1Handler && button1Title)
                    ? <Button color="info" className="col ml-3 mr-3" onClick={onButton1Handler}>{button1Title}</Button>
                    : null}
                {(button2Handler && button2Title)
                    ? <Button color="info" className="col ml-3 mr-3" onClick={onButton2Handler}>{button2Title}</Button>
                    : null}
                <ButtonLink color="secondary" to={backButtonLink} className="col ml-3 mr-3">Back to Pets</ButtonLink>
            </div>
            {
                user?.uid === Admin.uid
                    ? <div className="row pt-4">
                        {(editLink) ?
                            <ButtonLink color="info" to={editLink} className="col ml-3 mr-3">Edit</ButtonLink> :
                            null}
                        {(deleteLink) ?
                            <ButtonLink color="danger" to={deleteLink} className="col ml-3 mr-3">Delete</ButtonLink> :
                            null}
                    </div>
                    : null
            }
        </div>
    );
};

export default PetData;