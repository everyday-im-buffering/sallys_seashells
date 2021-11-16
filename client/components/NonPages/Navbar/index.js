import React from 'react';
import { FaBars } from 'react-icons/fa';
import { BsFillCartFill } from "react-icons/bs";
// import { connect } from 'react-redux'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElements'; //importing our nav bar elements

const Navbar = ({ toggle }) => {
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
                            <NavLinks to='/About'> about </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/AllShells'> shop all shells </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/Signup'> signup </NavLinks>
                        </NavItem>
                        {/* <NavItem>
                        <NavLinks to='/Cart'> cart </NavLinks>
                    </NavItem> */}
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/Login'> Login </NavBtnLink>
                    </NavBtn>
                </NavbarContainer>

            </Nav>
        </>
    )
}

// const mapState = (state) => {
//     return {
//         isLoggedIn: !!state.auth.id,
//     };
// };

// const mapDispatch = (dispatch) => {
//     return {
//         handleClick() {
//             dispatch(());
//         },
//     };
// };

// export default connect(mapState, mapDispatch)(Navbar);
export default Navbar;
