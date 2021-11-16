import { FaBars } from 'react-icons/fa';
import { BsFillCartFill } from "react-icons/bs";
import { connect } from 'react-redux'
import React, { useState } from 'react';
import { logout } from "../../../store/auth";
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements'; //importing our nav bar elements

const Navbar = ({ toggle, isLoggedIn, handleClick }) => {
    // const [isLoggedIn, loggedInSession] = useState(0);
    return (
    <>
        <Nav>
            <NavbarContainer>
                    <NavLogo to='/'> seashore </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <MobileIcon onClick={toggle}>
                        <BsFillCartFill />
                    </MobileIcon>
                    <NavMenu>
                    <NavItem>
                        <NavLinks to='/about'> about </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='/shop'> shop all shells </NavLinks>
                    </NavItem>
                    {isLoggedIn ? (
                        <NavBtn>
                        <NavBtnLink to='/logout' onClick={handleClick}> logout </NavBtnLink>
                        </NavBtn>
                    ) : (
                    <NavMenu>
                    <NavBtn>
                    <NavBtnLink to='/login'> Login </NavBtnLink>
                    </NavBtn>
                    <NavItem>
                    <NavLinks to='/signup'> signup </NavLinks>
                     </NavItem></NavMenu>
                    
                    )}
                    </NavMenu>
            </NavbarContainer> 

        </Nav>
    </>
    )
}

const mapState = (state) => {
    return {
        isLoggedIn: !!state.auth.id,
    };
};

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout());
        },
    };
};

export default connect(mapState, mapDispatch)(Navbar);
// export default Navbar;
