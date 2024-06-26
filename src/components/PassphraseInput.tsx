import React, { forwardRef } from 'react';

interface IPassphraseInput {
    placeholder?: string;
}

const PassphraseInput = forwardRef<HTMLInputElement, IPassphraseInput>(({ placeholder }, ref) => {
    return (
        <div>
            <p> Enter Passphrase </p>
            <input
                type="password"
                ref={ref}
                placeholder="Enter passphrase"
                className='w-[192px] h-[26px] pl-2 border border-grey rounded-sm outline-none'
            />
        </div>
    );
});

export default PassphraseInput;
