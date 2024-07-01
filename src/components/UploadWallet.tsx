import React from 'react';
import PassphraseInput from './PassphraseInput';
import Button from './Button';
import openIcon from '../assets/open.png';

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
        <div className='flex flex-wrap gap-2 justify-between'>
            <p className='font-bold'> Open Existing Wallet </p>
            <a
                    href={'https://discourse.cryptonomic.tech/t/accessing-a-ledger-account/510'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex gap-1 font-medium'
                >
                    <span>
                        Access Ledger wallet
                    </span>
                    <img src={openIcon} alt='open' className='w-6 h-6' />
            </a>
        </div>
        <div className='flex flex-wrap items-end gap-y-2 gap-x-8'>
            <div>
            <p> Upload Wallet </p>
            <input type="file" onChange={handleFileChange} className='w-[242px]'/>
            </div>
            {/* <PassphraseInput value={passphrase} onChange={setPassphrase} /> */}
            <Button text={'Open'} onButtonClick={unlockWallet} disabled={disabled} />
        </div>
        </div>
    )
}

export default UploadWallet;