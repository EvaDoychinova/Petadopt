import { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import firebase from '../../../config/firebase';
import UserContext from '../../../contexts/UserContext';

const Logout = ({
    history,
}) => {
    const [user, setUser]=useContext(UserContext)
    useEffect(() => {
        firebase.auth().signOut()
            .then(()=>{
                setUser(null);
            })
            .catch((error)=>{
                console.log(error);
                history.push('/');
            });

    }, [history, setUser]);

    return (
        <Redirect to='/' />
    );
}

export default Logout;