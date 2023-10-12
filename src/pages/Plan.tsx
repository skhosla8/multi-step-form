// Base Imports
import React, { FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
// Components 
import Main from '../components/Main';
// Icons/Images
import iconArcade from '../assets/icon-arcade.svg';
import iconAdvanced from '../assets/icon-advanced.svg';
import iconPro from '../assets/icon-pro.svg';

const StyledPlan = styled.div`
display: flex;
flex-direction: column;
`;

const StyledPlanOptions = styled.div`
display: flex;
`;

const StyledPlanOption = styled.div`
width: 74px;
height: 100px;
display: flex;
flex-direction: column;
justify-content: space-between;
border: 1px solid var(--border-color);
border-radius: 7px;
padding: 1rem;

&:nth-of-type(2){
    margin: 0 1rem;
}

&:hover {
    border: 1px solid var(--purple-color);
    background-color: var(--very-light-grey-color);
    cursor: pointer;
}

img {
    width: 35px;
    height: 35px;
}

div {
    display: flex;
    flex-direction: column;
    color: var(--navy-color);
    font-weight: 500;
    font-size: 14px;

    span {
        color: var(--grey-color);
        font-size: 11px;
        font-weight: 400;
    }
}
`;

const StyledPlanBilling = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 11px;
padding: 0.5rem;
background-color: var(--very-light-grey-color);
border-radius: 7px;
margin-top: 1.5rem;
`;

const StyledPlanBillingSwitch = styled.label`
position: relative;
display: inline-block;
width: 35px;
height: 16px;
margin: 0 1rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
        background-color: var(--navy-color);
    }

    &:focus + span {
        box-shadow: 0 0 1px #2196F3;
    }

    &:checked + span {
        &:before {
        -webkit-transform: translateX(15px);
        -ms-transform: translateX(15px);
        transform: translateX(15px);
        }
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--navy-color);
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
         height: 11px;
         width: 11px;
        left: 4px;
        bottom: 2.5px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
  }
`;

interface PlanPricing {
arcade: number;
advanced: number;
pro: number;
};

const Plan: FC = () => {
    const currentStep = 2;
    const title = 'Select your plan';
    const subTitle = 'You have the option of monthly or yearly billing.';
    const buttonText = 'Next Step';

    const inputRef = useRef<HTMLInputElement | null>(null);
    const monthlyBillingRef = useRef<HTMLDivElement | null>(null);
    const yearlyBillingRef = useRef<HTMLDivElement | null>(null);

    const arcadePlanRef = useRef<HTMLDivElement | null>(null);
    const advancedPlanRef = useRef<HTMLDivElement | null>(null);
    const proPlanRef = useRef<HTMLDivElement | null>(null);

    const location = useLocation();
    const storedPersonalInfo = location.state?.info;

    const [billingType, setBillingType] = useState(location.state.plan?.type ? location.state.plan.type : 'mo');

    const [planPricing, setPlanPricing] = useState<PlanPricing>({
        arcade: 9,
        advanced: 12,
        pro: 15
    });

    const [selectedPlan, setSelectedPlan] = useState(location.state.plan ? location.state.plan : { name: '', price: null, type: '' });

    const handleBillingOption = () => {
       const updatedPlanName = billingType === 'mo' ? selectedPlan.name.replace('(Yearly)', '(Monthly)') : selectedPlan.name.replace('(Monthly)', '(Yearly)');
       const planType = (selectedPlan.name.split(' ')[0]).toLowerCase();
      
        if (inputRef.current?.checked) {
            inputRef.current.checked = false;

            monthlyBillingRef.current!.style.color = 'var(--navy-color)';
            yearlyBillingRef.current!.style.color = 'var(--grey-color)';

            setPlanPricing({
                arcade: 9,
                advanced: 12,
                pro: 15
            });

            setBillingType('mo');

            setSelectedPlan({
                name: updatedPlanName,
                price: planPricing[planType as keyof PlanPricing],
                type: 'mo'
            });
        } else {
            if (inputRef.current) {
                inputRef.current.checked = true;
                monthlyBillingRef.current!.style.color = 'var(--grey-color)';
                yearlyBillingRef.current!.style.color = 'var(--navy-color)';

                setPlanPricing({
                    arcade: 90,
                    advanced: 120,
                    pro: 150
                });

                setBillingType('yr');

                setSelectedPlan({
                    name: updatedPlanName,
                    price: planPricing[planType as keyof PlanPricing],
                    type: 'yr'
                });
            }
        }
    };

    const handleSelectedPlan = (option: number) => {
        if (option === 9) {
            setSelectedPlan({ name: 'Arcade (Monthly)', price: 9, type: billingType });
        } else if (option === 90) {
            setSelectedPlan({ name: 'Arcade (Yearly)', price: 90, type: billingType });
        } else if (option === 12) {
            setSelectedPlan({ name: 'Advanced (Monthly)', price: 12, type: billingType });
        } else if (option === 120) {
            setSelectedPlan({ name: 'Advanced (Yearly)', price: 120, type: billingType });
        } else if (option === 15) {
            setSelectedPlan({ name: 'Pro (Monthly)', price: 15, type: billingType });
        } else {
            setSelectedPlan({ name: 'Pro (Yearly)', price: 150, type: billingType });
        };
    }

    useEffect(() => {
        if (inputRef.current) {
            if (location.state.plan) {
                if (location.state.plan.type === 'yr') {
                    inputRef.current.checked = true;

                    setPlanPricing({
                        arcade: 90,
                        advanced: 120,
                        pro: 150
                    });

                    setBillingType('yr');
                } else {
                    inputRef.current.checked = false;
                    setBillingType('mo');

                    setPlanPricing({
                        arcade: 9,
                        advanced: 12,
                        pro: 15
                    });
                }
            }
        }

        if (monthlyBillingRef.current) {
            monthlyBillingRef.current.style.color = 'var(--navy-color)';
        }

        if (yearlyBillingRef.current) {
            yearlyBillingRef.current.style.color = 'var(--grey-color)';
        }
    }, [location.state.plan]);

    useEffect(() => {
        if (arcadePlanRef.current) {
            if (selectedPlan.name?.includes('Arcade')) {
                arcadePlanRef.current.style.backgroundColor = 'var(--very-light-grey-color)';
                arcadePlanRef.current.style.border = '1px solid var(--purple-color)';
            } else {
                arcadePlanRef.current.style.backgroundColor = 'var(--white-color)';
                arcadePlanRef.current.style.border = '1px solid var(--border-color)';
            }
        }


        if (advancedPlanRef.current) {
            if (selectedPlan.name?.includes('Advanced')) {
                advancedPlanRef.current.style.backgroundColor = 'var(--very-light-grey-color)';
                advancedPlanRef.current.style.border = '1px solid var(--purple-color)';
            } else {
                advancedPlanRef.current.style.backgroundColor = 'var(--white-color)';
                advancedPlanRef.current.style.border = '1px solid var(--border-color)';
            }
        }


        if (proPlanRef.current) {
            if (selectedPlan.name?.includes('Pro')) {
                proPlanRef.current.style.backgroundColor = 'var(--very-light-grey-color)';
                proPlanRef.current.style.border = '1px solid var(--purple-color)';
            } else {
                proPlanRef.current.style.backgroundColor = 'var(--white-color)';
                proPlanRef.current.style.border = '1px solid var(--border-color)';
            }
        }

    }, [selectedPlan]);

    return (
        <Main
            currentStep={currentStep}
            title={title}
            subTitle={subTitle}
            buttonText={buttonText}
            storedPersonalInfo={storedPersonalInfo}
            selectedPlan={selectedPlan}
        >
            <StyledPlan>
                <StyledPlanOptions>
                    <StyledPlanOption ref={arcadePlanRef} onClick={() => handleSelectedPlan(planPricing.arcade)}>
                        <img src={iconArcade} alt='icon-arcade' />

                        <div>
                            Arcade
                            <span data-cy='plan-pricing'>${planPricing.arcade}/{billingType}</span>
                        </div>
                    </StyledPlanOption>

                    <StyledPlanOption ref={advancedPlanRef} onClick={() => handleSelectedPlan(planPricing.advanced)}>
                        <img src={iconAdvanced} alt='icon-advanced' />

                        <div>
                            Advanced
                            <span data-cy='plan-pricing'>${planPricing.advanced}/{billingType}</span>
                        </div>

                    </StyledPlanOption>

                    <StyledPlanOption ref={proPlanRef} onClick={() => handleSelectedPlan(planPricing.pro)}>
                        <img src={iconPro} alt='icon-pro' />

                        <div>
                            Pro
                            <span data-cy='plan-pricing'>${planPricing.pro}/{billingType}</span>
                        </div>
                    </StyledPlanOption>
                </StyledPlanOptions>

                <StyledPlanBilling>
                    <div ref={monthlyBillingRef}>Monthly</div>

                    <StyledPlanBillingSwitch onClick={handleBillingOption}>
                        <input ref={inputRef} type='checkbox' />
                        <span></span>
                    </StyledPlanBillingSwitch>

                    <div ref={yearlyBillingRef}>Yearly</div>
                </StyledPlanBilling>
            </StyledPlan>
        </Main>
    )
}

export default Plan;