// Base Imports
import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
// Components 
import Main from '../components/Main';

const StyledInfo = styled.div`
display: flex;
flex-direction: column;

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const StyledLabel = styled.label`
color: var(--navy-color);
font-weight: 500;
font-size: 13px;
margin-bottom: 0.3rem;
`;

const StyledError = styled.span`
color: var(--red-color);
font-weight: 500;
font-size: 12px;
`;

interface StyledInputProps {
    $error: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
border: ${({ $error }) => $error ? '1px solid var(--red-color)' : '1px solid var(--border-color)'};
border-radius: 6px;
padding: 0.5rem;
margin-bottom: 1.1rem;
outline: none;
font-size: 12px;

  &::placeholder {
    color: var(--grey-color);
    font-size: 12px;
  }

  &:focus {
    border: ${({ $error }) => $error ? '1px solid var(--red-color)' : '1px solid var(--purple-color)'};
  }
`;

const Info: FC = () => {
    const location = useLocation();

    const [info, setInfo] = useState({
        name: location.state ? location.state.info?.name : '',
        email: location.state ? location.state.info?.email : '',
        phone: location.state ? location.state.info?.phone : '',
    });

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const currentStep = 1;
    const title = 'Personal info';
    const subTitle = 'Please provide your name, email address, and phone number.';
    const buttonText = 'Next Step';

    const handleChange = (id: string, e: { target: { value: any; }; } | undefined) => {
        if (id === 'name') {
            setInfo({
                ...info,
                name: e?.target.value
            });

            setNameError(false);
        }

        if (id === 'email') {
            setInfo({
                ...info,
                email: e?.target.value
            });

            setEmailError(false);
        }

        if (id === 'phone') {
            setInfo({
                ...info,
                phone: e?.target.value
            });

            setPhoneError(false);
        }
    };

    return (
        <Main
            currentStep={currentStep}
            title={title}
            subTitle={subTitle}
            buttonText={buttonText}
            info={info}
            setNameError={setNameError}
            setEmailError={setEmailError}
            setPhoneError={setPhoneError}
        >
            <StyledInfo>
                <div>
                    <StyledLabel htmlFor='name'>Name</StyledLabel>
                    {nameError &&
                        <StyledError>This field is required</StyledError>
                    }
                </div>

                <StyledInput
                    type='text'
                    id='name'
                    placeholder='e.g. Stephen King'
                    value={info.name}
                    onChange={(e) => handleChange('name', e)}
                    $error={nameError} />

                <div>
                    <StyledLabel htmlFor='email'>Email Address</StyledLabel>
                    {emailError &&
                        <StyledError>This field is required</StyledError>
                    }
                </div>

                <StyledInput
                    type='text'
                    id='email'
                    placeholder='e.g. stephenking@lorem.com'
                    value={info.email}
                    onChange={(e) => handleChange('email', e)}
                    $error={emailError} />

                <div>
                    <StyledLabel htmlFor='phone'>Phone Number</StyledLabel>
                    {phoneError &&
                        <StyledError>This field is required</StyledError>
                    }
                </div>

                <StyledInput
                    type='text'
                    id='phone'
                    placeholder='e.g. +1 234 567 890'
                    value={info.phone}
                    onChange={(e) => handleChange('phone', e)}
                    $error={phoneError} />
            </StyledInfo>
        </Main>
    )
}

export default Info;