// Base Imports
import React, { FC, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import styled from 'styled-components';
// Components 
import Main from '../components/Main';
// Icons/Images
import iconCheckmark from '../assets/icon-checkmark.svg';

interface StyledAddOnContainer1Props {
    $ischecked: boolean;
}

const StyledAddOns = styled.div`
display: flex;
flex-direction: column;
`;

const StyledAddOn = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0.9rem 1rem;
border: 1px solid var(--light-grey-color);
border-radius: 7px;
font-size: 14px;

    &:nth-child(2){
        margin: 0.8rem 0;
    }

    &:hover {
        border: 1px solid var(--purple-color);
        background-color: var(--very-light-grey-color);
    }
`;

const StyledAddOnContainer1 = styled.div<StyledAddOnContainer1Props>`
display: flex;
align-items: center;

 div {
    &:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 14px;
        height: 14px;
        background-color: ${({ $ischecked }) => {
        if ($ischecked) {
            return 'var(--purple-color)';
        } else {
            return 'var(--white-color)';
        }
    }};
        border: 1px solid var(--light-grey-color);
        border-radius: 3px;
        margin-right: 1.5rem;
        cursor: pointer;
    }

    &:nth-child(2) {
        display: flex;
        flex-direction: column;
        font-weight: 500;

        span {
            color: var(--grey-color);
            font-size: 11px;
            margin-top: 0.3rem;
            font-weight: 400;
        }
    }
 }
`;

const StyledAddOnContainer2 = styled.div`
color: var(--purple-color);
font-size: 11px;
`;

export interface AddOn {
    name: string;
    price: number;
}

const AddOns: FC = () => {
    const currentStep = 3;
    const title = 'Pick add-ons';
    const subTitle = 'Add-ons help enhance your gaming experience.';
    const buttonText = 'Next Step';

    const location = useLocation();

    const pricingType = location.state.plan?.type === 'yr' ? 'yr' : 'mo';
    const onlineServicePrice = location.state.plan?.type === 'yr' ? 10 : 1;
    const largerStoragePrice = location.state.plan?.type === 'yr' ? 20 : 2;
    const customizableProfilePrice = location.state.plan?.type === 'yr' ? 20 : 2;

    const [isChecked, setIsChecked] = useState({
        onlineService: location.state.addOns?.some((el: AddOn) => el.name === 'Online service') ? true : false,
        largerStorage: location.state.addOns?.some((el: AddOn) => el.name === 'Larger storage') ? true : false,
        customizableProfile: location.state.addOns?.some((el: AddOn) => el.name === 'Customizable profile') ? true : false,
    });

    const [addOns, setAddOns] = useState<AddOn[]>(location.state.addOns?.length ? location.state.addOns : []);

    const onlineServiceRef = useRef<HTMLDivElement>(null);
    const largerStorageRef = useRef<HTMLDivElement>(null);
    const customizableProfileRef = useRef<HTMLDivElement>(null);

    const handleAddOns = (addOn: string) => {
        if (addOn === 'Online service') {
            setIsChecked({
                ...isChecked,
                onlineService: !isChecked.onlineService
            });

            if (!isChecked.onlineService) {
                setAddOns([...addOns, { name: 'Online service', price: onlineServicePrice }]);
            } else {
                let copyAddOns = [...addOns];
                let el = copyAddOns.findIndex(el => el.name === 'Online service');

                copyAddOns.splice(el, 1);
                setAddOns(copyAddOns);
            }
        }

        if (addOn === 'Larger storage') {
            setIsChecked({
                ...isChecked,
                largerStorage: !isChecked.largerStorage
            });


            if (!isChecked.largerStorage) {
                setAddOns([...addOns, { name: 'Larger storage', price: largerStoragePrice }]);
            } else {
                let copyAddOns = [...addOns];
                let el = copyAddOns.findIndex(el => el.name === 'Larger storage');

                copyAddOns.splice(el, 1);
                setAddOns(copyAddOns);
            }
        }

        if (addOn === 'Customizable profile') {
            setIsChecked({
                ...isChecked,
                customizableProfile: !isChecked.customizableProfile
            });

            if (!isChecked.customizableProfile) {
                setAddOns([...addOns, { name: 'Customizable profile', price: customizableProfilePrice }]);
            } else {
                let copyAddOns = [...addOns];
                let el = copyAddOns.findIndex(el => el.name === 'Customizable profile');

                copyAddOns.splice(el, 1);
                setAddOns(copyAddOns);
            }
        }
    };

    useEffect(() => {
        if (onlineServiceRef.current) {
            if (isChecked.onlineService) {
                onlineServiceRef.current.style.backgroundColor = 'var(--very-light-grey-color)';
                onlineServiceRef.current.style.border = '1px solid var(--purple-color)';
            } else {
                onlineServiceRef.current.style.backgroundColor = 'var(--white-color)';
                onlineServiceRef.current.style.border = '1px solid var(--border-color)';
            }
        }

        if (largerStorageRef.current) {
            if (isChecked.largerStorage) {
                largerStorageRef.current.style.backgroundColor = 'var(--very-light-grey-color)';
                largerStorageRef.current.style.border = '1px solid var(--purple-color)';
            } else {
                largerStorageRef.current.style.backgroundColor = 'var(--white-color)';
                largerStorageRef.current.style.border = '1px solid var(--border-color)';
            }
        }

        if (customizableProfileRef.current) {
            if (isChecked.customizableProfile) {
                customizableProfileRef.current.style.backgroundColor = 'var(--very-light-grey-color)';
                customizableProfileRef.current.style.border = '1px solid var(--purple-color)';
            } else {
                customizableProfileRef.current.style.backgroundColor = 'var(--white-color)';
                customizableProfileRef.current.style.border = '1px solid var(--border-color)';
            }
        }
    }, [isChecked]);

    useEffect(() => {
        const updatedAddOns = addOns.map((addOn: AddOn) => (
            {
                name: addOn.name,
                price: addOn.name === 'Online service' ? onlineServicePrice : addOn.name === 'Larger storage' ? largerStoragePrice : customizableProfilePrice
            }
        ))

        setAddOns(updatedAddOns);
    }, [location.state.plan.type, addOns, onlineServicePrice, largerStoragePrice, customizableProfilePrice]);

    return (
        <Main
            currentStep={currentStep}
            title={title}
            subTitle={subTitle}
            buttonText={buttonText}
            addOns={addOns}
        >
            <StyledAddOns>
                <StyledAddOn ref={onlineServiceRef} onClick={() => handleAddOns('Online service')}>
                    <StyledAddOnContainer1 $ischecked={isChecked.onlineService}>
                        <div>
                            <img src={iconCheckmark} alt='icon-checkmark' />
                        </div>

                        <div>
                            Online service

                            <span>Access to multiplayer games</span>
                        </div>
                    </StyledAddOnContainer1>

                    <StyledAddOnContainer2>+${onlineServicePrice}/{pricingType}</StyledAddOnContainer2>
                </StyledAddOn>

                <StyledAddOn ref={largerStorageRef} onClick={() => handleAddOns('Larger storage')}>
                    <StyledAddOnContainer1 $ischecked={isChecked.largerStorage}>
                        <div>
                            <img src={iconCheckmark} alt='icon-checkmark' />
                        </div>

                        <div>
                            Larger storage

                            <span>Extra 1TB of cloud save</span>
                        </div>
                    </StyledAddOnContainer1>

                    <StyledAddOnContainer2>+${largerStoragePrice}/{pricingType}</StyledAddOnContainer2>
                </StyledAddOn>

                <StyledAddOn ref={customizableProfileRef} onClick={() => handleAddOns('Customizable profile')}>
                    <StyledAddOnContainer1 $ischecked={isChecked.customizableProfile}>
                        <div>
                            <img src={iconCheckmark} alt='icon-checkmark' />
                        </div>

                        <div>
                            Customizable profile

                            <span>Custom theme on your profile</span>
                        </div>
                    </StyledAddOnContainer1>

                    <StyledAddOnContainer2>+${customizableProfilePrice}/{pricingType}</StyledAddOnContainer2>
                </StyledAddOn>
            </StyledAddOns>
        </Main>
    )
}

export default AddOns;