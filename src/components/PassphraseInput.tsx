import React from 'react';

interface IPassphraseInput {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const PassphraseInput = ({ value, onChange, placeholder }: IPassphraseInput) => {
    return (
        <div>
            <p> Enter Passphrase </p>
            <input
                type="password"
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? "Enter passphrase"}
                className='w-[192px] h-[26px] pl-2 border border-grey rounded-sm outline-none'
            />
        </div>
    );
};

export default PassphraseInput;
