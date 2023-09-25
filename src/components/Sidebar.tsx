// Base Imports
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
// Icons/Images
import bgSidebarDesktop from '../assets/bg-sidebar-desktop.svg';

const StyledSidebar = styled.div<StyledSidebarProps>`
width: 274px;
height: 468px;
background-color: var(--white-color);
background-image: ${({ $bgimg }) => `url(${$bgimg})`};
background-size: cover;
background-repeat: no-repeat;
border-top-left-radius: 16px;
border-bottom-left-radius: 16px;
`;

const NavItem = styled.div`
display: flex;
margin-left: 2rem;
color: var(--white-color);

 &:first-of-type {
    margin-top: 2rem;
 }
`;

const NavItemBullet = styled.div<NavItemBulletProps>`
display: flex;
justify-content: center;
align-items: center;
width: 33px;
height: 33px;
border-radius: 50%;
border: ${({$currentstep, $textcontent})  => ($currentstep === $textcontent) ? '1px solid var(--sky-blue-color)' : '1px solid var(--white-color)'};
font-size: 14px;
font-weight: ${({$currentstep, $textcontent})  => ($currentstep === $textcontent) ? 700 : 400 };
margin-bottom: 1.7rem;
color: ${({$currentstep, $textcontent})  => ($currentstep === $textcontent) ? 'var(--navy-color)' : 'var(--white-color)'};
background-color: ${({$currentstep, $textcontent})  => ($currentstep === $textcontent) ? 'var(--sky-blue-color)' : 'none'};
`;

const NavItemText = styled.div`
display: flex;
flex-direction: column;
color: var(--light-blue-color);
font-size: 12px;
font-weight: 400;
margin-left: 1rem;

   span {
     font-weight: 500;
     color: var(--white-color);
     font-size: 14px;
     margin-top: 0.3rem;
   }
`;


interface StyledSidebarProps {
    $bgimg: string;
}

interface NavItemBulletProps {
    $currentstep: number;
    $textcontent: number;
}

const Sidebar: FC = ( ) => {
    const location = useLocation();
    
    const currentStep = location.pathname === '/' ? 1 : location.pathname === '/plan' ? 2 : location.pathname === '/add-ons' ? 3 : 4;

    return (
        <StyledSidebar $bgimg={bgSidebarDesktop}>
            <nav>
                <NavItem>
                    <NavItemBullet $currentstep={currentStep} $textcontent={1}>1</NavItemBullet>

                    <NavItemText>
                        STEP 1
                        <span>YOUR INFO</span>
                    </NavItemText>
                </NavItem>

                <NavItem>
                    <NavItemBullet $currentstep={currentStep} $textcontent={2}>2</NavItemBullet>

                    <NavItemText>
                        STEP 2
                        <span>SELECT PLAN</span>
                    </NavItemText>
                </NavItem>

                <NavItem>
                    <NavItemBullet $currentstep={currentStep} $textcontent={3}>3</NavItemBullet>

                    <NavItemText>
                        STEP 3
                        <span>ADD-ONS</span>
                    </NavItemText>
                </NavItem>

                <NavItem>
                    <NavItemBullet $currentstep={currentStep} $textcontent={4}>4</NavItemBullet>

                    <NavItemText>
                        STEP 4
                        <span>SUMMARY</span>
                    </NavItemText>
                </NavItem>
            </nav>
        </StyledSidebar>
    )
}

export default Sidebar;