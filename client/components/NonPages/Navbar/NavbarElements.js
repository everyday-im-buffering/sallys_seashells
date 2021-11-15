import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'

export const Nav = styled.nav`
    background: #101D42;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0 lem;
    z-index: 10 ;
    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
    ` ;

export const NavbarContainer = styled.div`
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;

`;

export const MobileIcon = styled.div`
    display: inline;
    padding: 30px;
    color: white;

    @media screen and (max-width: 768px){
    display: block;
    position: absolute:
    top: 0;
    right: 0;
    transform: translate(-100%, 60%)
    font-size: 1.8rem;
    }
`;
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-styled: none;
    text-align: center;
    margin-right: -22px;

@media screen and (max-width: 768px){
    display: none;
}
`;

export const NavItem = styled.ul`
display: flex;

`;

export const NavLinks = styled(LinkS)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%
    list-styled: none;

&.active {
    border-bottom: 3px solid blue;
}`;

export const NavBtn = styled.nav`
    display: flex;
    border-radius: 20px;
    align-items: center;
    padding: 30px 10px;
    outline: none;
    cursor: pointer;
    border: none;
    transition: all .5s ease;

    @media screen and(max-width: 768px){
        display: none;
}`;

export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #6564DB;
    white-space: nowrap:
    margin: .5em;
    padding: 10px 22px;
    color: white;
    outline: none;
    border: none;
transition: all 0.2s ease-in-out;

&:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #232ED1;
}
`;