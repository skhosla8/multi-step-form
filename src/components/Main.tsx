// Base Imports 
import React, { FC, ReactElement, Dispatch, SetStateAction } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
import {AddOn } from '../pages/AddOns';

interface StyledContainerProps {
    $currentstep: number;
}

interface InfoFields {
    name: string,
    email: string,
    phone: string
}

interface MainProps {
    currentStep: number;
    title: string;
    subTitle: string;
    buttonText: string;
    children: ReactElement;
    info?: InfoFields;
    setNameError?: Dispatch<SetStateAction<boolean>>
    setEmailError?: Dispatch<SetStateAction<boolean>>
    setPhoneError?: Dispatch<SetStateAction<boolean>>;
    storedPersonalInfo?: InfoFields;
    selectedPlan?: string;
    addOns?: AddOn[];
}

const StyledMain = styled.main`
 width: 440px; 
 display: flex;
 flex-direction: column;
 margin: 0 4rem 0 4.5rem;

`;

const StyledMainBody = styled.div<StyledContainerProps>`
height: ${({ $currentstep }) => ($currentstep !== 5) ? '200px' : '400px'};
margin: 1.5rem 0 4.5rem;
padding: 0;
`;

const StyledH1 = styled.h1`
color: var(--navy-color);
font-weight: 700;
font-size: 30px;
margin-top: 2rem;
`;

const StyledH2 = styled.h2`
color: var(--grey-color);
font-weight: 400;
font-size: 13px;
margin-top: -0.5rem;
`;

const StyledMainFooter = styled.div<StyledContainerProps>`
display: flex;
height: 20px;
justify-content: ${({ $currentstep }) => $currentstep !== 1 ? 'space-between' : 'flex-end'};
align-items: center;
font-size: 13px;
`;

const StyledLink = styled.div`
width: 55px;
height: auto;
color: var(--grey-color);
cursor: pointer;
`;

const StyledButton = styled.button`
background-color: var(--navy-color);
color: var(--white-color);
border: none;
border-radius: 7px;
width: 85px;
height: 35px;
font-weight: 500;
font-size: 12px;
cursor: pointer;
`;


const Main: FC<MainProps> = ({
    currentStep,
    title,
    subTitle,
    buttonText,
    children,
    info,
    setNameError,
    setEmailError,
    setPhoneError,
    storedPersonalInfo,
    selectedPlan,
    addOns
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNextStep = () => {
        if (currentStep === 1) {
            let name = children.props.children[1].props.value;
            let email = children.props.children[3].props.value;
            let phone = children.props.children[5].props.value;

            if (!name) {
                setNameError!(true);
            } else {
                setNameError!(false)
            }

            if (!email) {
                setEmailError!(true);
            } else {
                setEmailError!(false);
            }

            if (!phone) {
                setPhoneError!(true);
            } else {
                setPhoneError!(false);
            }

            if (name && email && phone) {
                navigate('/plan', { state: { ...location.state, info: info } });
            }
        } else if (currentStep === 2) {
            navigate('/add-ons', { state: { ...location.state, plan: selectedPlan } });
        } else if (currentStep === 3) {
            navigate('/summary', {state: {...location.state, addOns }});
        } else if (currentStep === 4) {
            navigate('/confirmation', {state: {...location.state }});
        }
    };

    const handlePrevStep = () => {
        if (currentStep === 2) {
            navigate('/', { state: { ...location.state, info: storedPersonalInfo, plan: selectedPlan } });
        } else if (currentStep === 3) {
           navigate('/plan', { state: { ...location.state, addOns } });
        } else if (currentStep === 4) {
            navigate('/add-ons', { state: { ...location.state } });
        } else if (currentStep === 5) {
            navigate('/summary', {state: { ...location.state }});
        }
    }

    return (
        <StyledMain>
            <StyledH1>{title}</StyledH1>
            <StyledH2>{subTitle}</StyledH2>

            <StyledMainBody $currentstep={currentStep}>
                {children}
            </StyledMainBody>

            <StyledMainFooter $currentstep={currentStep}>
                {(currentStep !== 1) &&
                    <StyledLink onClick={handlePrevStep}>Go Back</StyledLink>
                }
                <StyledButton onClick={handleNextStep}>{buttonText}</StyledButton>
            </StyledMainFooter>
        </StyledMain>
    )
}

export default Main;