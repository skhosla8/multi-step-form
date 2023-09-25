// Base Imports
import React, { FC } from 'react';
import styled from 'styled-components';
import '../index.css';
// Icons/Images
import iconThankYou from '../assets/icon-thank-you.svg';

const StyledConfirmation = styled.div`
width: 540px; 
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const StyledH1 = styled.h1`
color: var(--navy-color);
font-weight: 700;
font-size: 30px;
margin-top: 1.5rem;
`;

const StyledP = styled.p`
width: 370px;
color: var(--grey-color);
font-weight: 400;
font-size: 13px;
text-align: center;
line-height: 20px;
margin-top: -0.5rem;
`;


const Confirmation: FC = () => {
    return (
        <StyledConfirmation>
            <img src={iconThankYou} width={60} height={60} alt='thank-you-icon' />

            <StyledH1>Thank you!</StyledH1>

            <StyledP>
                Thanks for confirming your subscription! We hope you have fun using our platform.
                If you ever need support, please feel free to email us at support@loremgaming.com.
            </StyledP>
        </StyledConfirmation>
    )
}

export default Confirmation;