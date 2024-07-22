import React, { useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';

const Amount = ({
    buttonText,
    onButtonClick,
    disabled,
}: {
    buttonText: string;
    onButtonClick: (amount: string) => void;
    disabled?: boolean;
}) => {
    const [amount, setAmount] = useState('');

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
                onButtonClick={() => onButtonClick(amount)}
                disabled={!amount || disabled}
            />
        </div>
    )
}

export default Amount;