import { Link, NavLink } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <header className="d-flex flex-row header">
            <Link to="/" className="header-logo">PetAdopt</Link>
            <div className="container d-flex flex-row justify-content-end">
                <NavLink to="/pets/add" className="header-link">Add a pet</NavLink>
                <NavLink to="/pets" className="header-link">Pets</NavLink>
                <NavLink to="/about" className="header-link">About</NavLink>
                <NavLink to="/contacts" className="header-link">Contacts</NavLink>
                <NavLink to="/register" className="header-link">Register</NavLink>
                <NavLink to="/login" className="header-link">Login</NavLink>
            </div>
        </header>
    );
}

export default Header;