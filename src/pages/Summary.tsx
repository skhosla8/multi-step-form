// Base Imports
import React, { FC } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
import {AddOn } from '../pages/AddOns';
// Components 
import Main from '../components/Main';

const StyledSummary = styled.div`
display: flex;
flex-direction: column;
font-size: 11px;
`;

const StyledSummaryInclusions = styled.div`
background-color: var(--very-light-grey-color);
padding: 1rem;
padding-bottom: 1.3rem;
border-radius: 7px;
`;

const StyledSummaryInclusionsPlan = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: var(--navy-color);
font-weight: 500;
font-size: 12px;
border-bottom: 1px solid var(--border-color);

  span {
    font-weight: 700;
  }
`;

const StyledSummaryInclusionsPlanLink = styled.div`
color: var(--purple-color);
text-decoration: underline;
font-size: 10px;
padding: 0.5rem 0 1rem;
cursor: pointer;
`;

const StyledSummaryInclusionsAddOn = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
color: var(--grey-color);
height: 25px;

  span {
    color: var(--navy-color);
    font-size: 10px;
  }
`;

const StyledSummaryTotal = styled.div`
display: flex;
justify-content: space-between;
background-color: var(--white-color);
color: var(--grey-color);
padding: 1rem;

    span {
        color: var(--purple-color);
        font-weight: 700;
        font-size: 14px;
    }
`;

const Summary: FC = () => {
    const currentStep = 4;
    const title = 'Finishing up';
    const subTitle = 'Double-check everything looks OK before confirming.';
    const buttonText = 'Confirm';

    const location = useLocation();

    const billingType = location.state.plan?.type === 'mo' ? '(per month)' : '(per year)';

    const renderedAddOns = location.state.addOns.map((addOn: AddOn , i: number) => (
        <StyledSummaryInclusionsAddOn key={i}>
            {addOn.name}
            <span>+${addOn.price}/{location.state.plan?.type}</span>
        </StyledSummaryInclusionsAddOn>
    ));

    const getTotal = () => {
        const planPrice = location.state.plan?.price;

        const addOnPrices = location.state.addOns
        .map((addOn: AddOn) => addOn.price)
        .reduce((acc: number, val: number) => acc + val, 0);

        const total = planPrice + addOnPrices;

        return total;
    };

    return (
        <Main
            currentStep={currentStep}
            title={title}
            subTitle={subTitle}
            buttonText={buttonText}
        >
            <StyledSummary>
                <StyledSummaryInclusions>
                    <StyledSummaryInclusionsPlan>
                        <div>
                            {location.state.plan?.name}
                            <NavLink to='/plan' state={{...location.state}}>
                            <StyledSummaryInclusionsPlanLink>Change</StyledSummaryInclusionsPlanLink>
                            </NavLink>
                        </div>

                        <span data-cy='summary-plan-cost'>${location.state.plan?.price}/{location.state.plan?.type}</span>
                    </StyledSummaryInclusionsPlan>

                    {renderedAddOns}
                </StyledSummaryInclusions>

                <StyledSummaryTotal data-cy='summary-total'>
                    Total {billingType}
                    <span>${getTotal()}/{location.state.plan?.type}</span>
                </StyledSummaryTotal>
            </StyledSummary>
        </Main>
    )
}

export default Summary;
