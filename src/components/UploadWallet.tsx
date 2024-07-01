import React from 'react';
import PassphraseInput from './PassphraseInput';
import Button from './Button';

const UploadWallet = ({
    handleFileChange,
    passphrase,
    setPassphrase,
    unlockWallet,
    disabled
}: {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passphrase: string;
    setPassphrase: (event: React.ChangeEvent<HTMLInputElement>) => void;
    unlockWallet: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
}) => {
    return (
        <div className='bg-sky-20 py-4 px-6 border rounded-lg'>
        <p className='font-bold'> Open Existing Wallet </p>
        <div className='flex flex-wrap items-end gap-y-2 gap-x-8'>
            <div>
            <p> Upload Wallet </p>
            <input type="file" onChange={handleFileChange} className='w-[242px]'/>
            </div>
            <PassphraseInput value={passphrase} onChange={setPassphrase} />
            <Button text={'Open'} onButtonClick={unlockWallet} disabled={disabled} />
        </div>
        </div>
    )
}

export default UploadWallet;