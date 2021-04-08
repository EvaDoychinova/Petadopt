import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FaBars } from 'react-icons/fa';

import Admin from '../../../secrets/admin.json';
import UserContext from '../../../contexts/UserContext';
// import MenuBars from '../../../svg/bars-solid.svg';

import './Header.css';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useContext(UserContext);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <header className="d-flex flex-row header">
            <Link to="/" className="header-logo">PetAdopt</Link>
            <div className="container d-flex flex-row justify-content-end">
                <div className="screen-navigation">
                    {
                        user && user.uid === Admin.uid &&
                        <>
                            <NavLink to="/pets/add" className="header-link">AddPet</NavLink>
                            <NavLink to="/pets/adoption" className="header-link">PetsForAdoption</NavLink>
                            <NavLink to="/pets/adopted" className="header-link">AdoptedPets</NavLink>
                        </>
                    }
                    <NavLink to="/pets" className="header-link">Pets</NavLink>
                    <NavLink to="/about" className="header-link">About</NavLink>
                    <NavLink to="/contacts" className="header-link">Contacts</NavLink>
                    {
                        user
                            ? <>
                                <NavLink to="/pets/my" className="header-link">MyPets</NavLink>
                                <NavLink to="/logout" className="header-link">Logout</NavLink>
                            </>
                            : <>
                                <NavLink to="/register" className="header-link">Register</NavLink>
                                <NavLink to="/login" className="header-link">Login</NavLink>
                            </>
                    }
                </div>
                <div className="phone-navigation">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle className="pt-4" nav caret>
                            {/* <img src={MenuBars} alt="MenuBars" className="menu-bars" /> */}
                            <FaBars className="menu-bars" />
                        </DropdownToggle>
                        <DropdownMenu right>
                            {
                                user && user.uid === Admin.uid &&
                                <>
                                    <DropdownItem><NavLink to="/pets/add" className="dropdown-link">AddPet</NavLink></DropdownItem>
                                    <DropdownItem><NavLink to="/pets/adoption" className="dropdown-link">PetForAdoption</NavLink></DropdownItem>
                                    <DropdownItem><NavLink to="/pets/adopted" className="dropdown-link">AdoptedPets</NavLink></DropdownItem>
                                </>
                            }
                            <DropdownItem><NavLink to="/pets" className="dropdown-link">Pets</NavLink></DropdownItem>
                            <DropdownItem><NavLink to="/about" className="dropdown-link">About</NavLink></DropdownItem>
                            <DropdownItem><NavLink to="/contacts" className="dropdown-link">Contacts</NavLink></DropdownItem>
                            {
                                user
                                    ? <>
                                        <DropdownItem><NavLink to="/pets/my" className="dropdown-link">MyPets</NavLink></DropdownItem>
                                        <DropdownItem><NavLink to="/logout" className="dropdown-link">Logout</NavLink></DropdownItem>
                                    </>
                                    : <>
                                        <DropdownItem><NavLink to="/register" className="dropdown-link">Register</NavLink></DropdownItem>
                                        <DropdownItem><NavLink to="/login" className="dropdown-link">Login</NavLink></DropdownItem>
                                    </>
                            }
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div >
        </header >
    );
}

export default Header;