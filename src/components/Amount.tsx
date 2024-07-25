import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';

const Amount = ({
    buttonText,
    onButtonClick,
    amount,
    setAmount,
    disabled,
}: {
    buttonText: string;
    onButtonClick: () => void;
    amount: string;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
    disabled?: boolean;
}) => {

    return (
        <div className='flex flex-wrap items-end gap-y-2 gap-x-8'>
            <TextInput
                id={'amount'}
                label={'Enter Amount'}
                value={`${amount}`} // TODO: add tezos symbol
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) { // Regex to allow only numbers and a single decimal point
                        setAmount(value);
                    }
                }}
                className={'w-[212px]'}
            />
            <Button
                text={buttonText}
                onButtonClick={onButtonClick}
                disabled={!amount || disabled}
            />
        </div>
    )
}

export default Amount;