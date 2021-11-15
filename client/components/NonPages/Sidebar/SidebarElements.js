import styled from 'styled-components'
import { Link as LinkS } from 'react-scroll'
import { Link as LinkR } from 'react-router-dom'
import {FaTimes} from 'react-icons/fa'

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%
    background: #0d0d0d;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.2s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};

`

export const CloseIcon = styled(FaTimes)`
    color: white;
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
    background-color: #89D2DC;
`

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-column: 1fr;
    grid-template-rows: repeat(6, 80px);
    list-style: none;
    text-align: center;
    
    @media screen and (max-width: 480px){
     grid-template-rows: repeat(6, 60px);}
`

export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #fff;

&:hover{
    color: #232ED1;
    transition: 0.2s ease-in-out;
}
`

export const SideBtnWrap = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px 64px;
`

export const SidebarRoute = styled(LinkR)`
    border-radius: 50px;
    background: #01bf71
    white-space: none;
    padding: 16px 64px;
    color: blue;
    font-size: 16px;
    outline: none;
    border: none;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
&:hover{
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: blue;
}
`