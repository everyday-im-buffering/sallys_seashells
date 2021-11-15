vanilla css:
https://www.youtube.com/watch?v=Nl54MJDR2p8
app.js

import './App.css'
import Navbar from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
function App(){
    return(
        <Router>
        <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/AllProducts" component={AllProducts} exact />
        </Switch>
        </Router>
    )
}
>components
    Navbar (folder)
        index.js
        NavbarElements.js ---> where the stock components are stored


    *import stock components into the app.js file
    *can use <> instead of <div>(s)
    
    Navbar.js
    import react from 'react';
    import {FaBars} from 'react-icons/fa' //access to react icons
    import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements'; //importing our nav bar elements

    const Navbar = ({toggle}) =>{
        return(
            <>
            <Nav>
            <NavbarContainer>
            <NavLogo to='/'> seashore </NavLogo>
            <MobileIcon onClick={toggle}>
            <FaBars />
            </MobileIcon> //optimized for mobile
            <NavMenu>
                <NavItem>
                    <NavLinks to="about"> About //so that the scroll knows where to go
                    </NavLinks>
                    
                </NavItem>
                 <NavItem>
                    <NavLinks to="all products"> All Products //so that the scroll knows where to go
                    </NavLinks>
                    
                </NavItem>
                <NavItem>
                    <NavLinks to="signup"> signup //so that the scroll knows where to go
                    </NavLinks>
                    
                </NavItem>
                <NavBtn>
                <NavBtnLink to='/signin'> Sign In </NavBtnLink>
                </NavBtn>
            <NavMenu>
            </NavbarContainer>
            </Nav>
            <>
        )
    }

    *Here we are defining our own custom tags- NavLogo, NavbarContainer

export default Navbar

NavbarElements.js

import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'

export const Nav = styled.nav`
*write css props here*
background: blue;
height: 80px;
<!-- margin-top: -80px; -->
display: flex,
justify-content: center;
alight-items: center;
font-size: 1rem;
position: sticky;
top: 0;
z-index: 10;

`

export const NavbarContainer = styled.div`
display: flex;
justify-content: space-between;
height: 80px,
z-index: 1;
width: 100%;
padding: 0 24px;
max-width: 1100px;`

export const NavLogo = styled(LinkR)`
color: white;
justify-self: flex-start;
font-size: 1.5re,;
display: flex;
alight-items: center;
margin-left: 24px;
font-weight: bold;
text-decoration: none;
color: #fff;
`;

export const MobileIcon = styled.div`
display: none;
@media screen and (max-width: 768 px);
display: block;
position: absolute:
top: 0;
right: 0;
transform: translate(-100%, 60%)
font-size: 1.8rem;
`
export const NavMenu = styled.ul`
display: flex;
alight-item: center;
list-styled: none;
text-align: center;
margin-right: -22px;

@media screen and (max-width: 768px){
    display: none;
}
`

export const NavItem = styled.li`
height: 80px;
`

export const NavLinks = styled(LinkS)` //this is for react-scroll
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%

&.active{ //this highlights the links
    border-bottom: 3 px solid #01bf71
}

export const NavBtn = styled.nav`
display: flex;
align items: center;
@media screen and (max-width: 768 px){
    display: none;
}
`
export const NavBtnLink = styled(LinkR)`
border-radius: 50 px;
background: #ffff;
white-spice: nowrap:
padding: 10px 22px;
color: blue;
font-size: 16px;
outline: none;
border: none;
transition: all 0.2s ease-in-out;

&:hover { //for active style components
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: blue;
}
`

` 

>Sidebar
    index.js
    import React from 'react';
    import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarLink, Sidebar} from './SidebarElements'
    const Sidebar = () => {
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
        <SidebarMenu>
        <SidebarLink to="about" onClick={toggle}>
        about
        </SidebarLink>
        <SidebarLink to="allproducts" onClick={toggle}>
        all products
        </SidebarLink>
        <SidebarLink to="signup" onClick={toggle}>
        sign up
        </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
        <SidebarRoute to='signin'> sign in </SidebarRoute>
        </SideBtnWrap>
        </SidebarWrapper>
        <SidebarContainer>
    }
-hero 
-button
-info
-services


    SidebarElements.js
    import styled from 'style-components'
    import {Link as LinkS} from 'react-scroll'
    import {Link as LinkR} from 'react-router-dom'
    import {FaTimes} from 'react-icons/fa'
    
    export const SidebarContainer = styled.aside`

    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%
    backgrounf: #0d0d0d;
    display: grid;
    alight-items: center;
    top: 0;
    left:0;
    transition: 0.2s ease-in-out;
    opacity: ${({isOpen }) => (isOpen ? '100%' : '0')} //when its clicked the sidebar is visible else its inivisible
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')}

    `

    export cont CloseIcon = styled(FaTimes)`
    color: #fff
    `

    export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    outline: none;
    `

    export const SidebarWrapper = styled.div`
    color: #fff;
    `

    export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-column: 1fr;
    grid-template-rows: repeat(6, 80 px);
    text-align: center;
    @media screen and (max-width: 480px){
    grid-template-rows:repeat(6, 60px);}
    `

    export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: nune;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #fff;

    &:hover{
        color: #01bf71;
        transition: 0.2s ease-in-out;
    }
    `

    export const sideBtnWrap = styled.div`
    display: flex;
    justify-content: center;
    `

    export const SidebarRoute = styled(LinkR)`
    border-radius: 50 px;
    background: #01bf71
    white-space: none;
    padding: 16 px 64 px;
    color: blue;
    font-size: 16 px;
    outline: none;
    border: none;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover{
        transition: all 0.2s ease-in-out;
        color: green
    }
    `


>Homepage //using the homepage as a folder so we can make our homepage in index.js
    index.js
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false) //creating a react hook function that toggles the home page 

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return(
        <>
        <Sidebar isOpen={isOpen} toggle{toggle}/> //passing state
        <Navbar toggle={toggle}/>
        </>
    )

}

signin.js
const SigninPage = () =>{
    return(

    )
}


-58:59
dependencies:
---npm install styled-components
---npm install react-icons
---npm install react-scroll
npm install --save-dev babel-plugin-styled-components


//we are doing this because we want the logo to be a link and we are using React-Router-dom to link between pages but will be using react-scroll later as a different router to use an alias for react router dom, we can say import {Link as LinkR} from 'react-router-dom' instead of the typical import Link from 'react-router-dom'

**here in the back ticks, we are defining our own style tag
-------------------------------------------------------
-styled components

-react stock components

-------------------------------------------------------

https://www.youtube.com/watch?v=svPDhmXY1Yg

-should you use bootstrap?

