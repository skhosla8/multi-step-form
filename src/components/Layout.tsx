// Base Imports
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
// Components 
import Sidebar from './Sidebar';

/*
interface StyledContainerProps {
    currentStep: number;
}
*/

const StyledLayout = styled.div`
display: flex;
flex-direction: row;
width: 740px;
height: 500px;
background-color: var(--white-color);
border-radius: 16px;
padding: 1rem;
box-sizing: border-box;
`;

/*
const StyledMain = styled.main`
 width: 540px; 
 display: flex;
 flex-direction: column;
 margin-left: 3.2rem;
`;

const StyledOutletContainer = styled.div<StyledContainerProps>`
height: ${({currentStep}) => (currentStep !== 5) ? '300px': '500px'};
margin: 1.5rem 0 5rem;
padding: 0;
background-color: purple;
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
font-size: 14px;
margin-top: -0.5rem;
`;

const StyledMainFooter = styled.div<StyledContainerProps>`
display: flex;
height: 20px;
justify-content: ${({ currentStep }) => currentStep !== 1 ? 'space-between' : 'flex-end'};
align-items: center;
font-size: 14px;
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
width: 100px;
height: 40px;
font-weight: 500;
font-size: 14px;
cursor: pointer;
`;

*/ 

function Layout() {
    /*const [currentStep, setCurrentStep] = useState(1);
    //eslint-disable-next-line
    const [title, setTitle] = useState('Personal info');
    //eslint-disable-next-line
    const [subTitle, setSubTitle] = useState('Please provide your name, email address, and phone number.');
    //eslint-disable-next-line
    const [buttonText, setButtonText] = useState('Next Step');
    */

    /*
    const navigate = useNavigate();

    const handleNextStep = () => {
        setCurrentStep(currentStep => currentStep + 1);

        if (currentStep === 1) {
            navigate('plan');
            setTitle('Select your plan');
            setSubTitle('You have the option of monthly or yearly billing.');
        } else if (currentStep === 2) {
            navigate('add-ons');
            setTitle('Pick add-ons');
            setSubTitle('Add-ons help enhance your gaming experience.');
        } else if (currentStep === 3) {
            navigate('summary');
            setTitle('Finishing up');
            setSubTitle('Double-check everything looks OK before confirming.');
            setButtonText('Confirm');
        } else if (currentStep === 4) {
            navigate('confirmation');
        }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep => currentStep - 1);

        if (currentStep === 2) {
            navigate('/', { replace: true });
            setTitle('Personal info');
            setSubTitle('Please provide your name, email address, and phone number.');
        } else if (currentStep === 3) {
            navigate(-1);
            setTitle('Select your plan');
            setSubTitle('You have the option of monthly or yearly billing.');
        } else if (currentStep === 4) {
            navigate(-1);
            setTitle('Pick add-ons');
            setSubTitle('Add-ons help enhance your gaming experience.');
            setButtonText('Next Step');
        }
    }
    */ 

    return (
        <StyledLayout>
            <Sidebar />

           {/*}
            <StyledMain>
                {currentStep !== 5 &&
                    <>
                        <StyledH1>{title}</StyledH1>
                        <StyledH2>{subTitle}</StyledH2>
                    </>
                }

                <StyledOutletContainer currentStep={currentStep}>
                    <Outlet />
                </StyledOutletContainer>

                {currentStep !== 5 &&
                    <StyledMainFooter currentStep={currentStep}>
                        {(currentStep !== 1) &&
                            <StyledLink onClick={handlePrevStep}>Go Back</StyledLink>
                        }
                        <StyledButton onClick={handleNextStep}>{buttonText}</StyledButton>
                    </StyledMainFooter>
                }
            </StyledMain>
            */}
            <Outlet />
        </StyledLayout>
    )
}

export default Layout;