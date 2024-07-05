import React, { useState } from 'react';
import Button from './Button';
const openIcon = require('../assets/open.png').default;
import PasswordModal from './PasswordModal';

const UploadWallet = ({
    handleFileChange,
    passphrase,
    setPassphrase,
    unlockWallet,
    disabled
}: {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passphrase: string;
    setPassphrase: React.Dispatch<React.SetStateAction<string>>;
    unlockWallet: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
}) => {
    const [isPasswordModal, setIsPasswordModal] = useState(false);

    return (
        <>
            <PasswordModal
                { ...{passphrase, setPassphrase, isPasswordModal, setIsPasswordModal }}
                onUnlockWallet={unlockWallet}
            />
            <div className='bg-sky-60 p-6 pb-8 border border-sky-50 rounded-lg mb-10'>
            <div className='flex flex-wrap gap-2 justify-between'>
                <p className='font-bold text-2xl'> Open Existing Wallet </p>
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
            <div className='flex flex-wrap items-end gap-y-2 gap-x-8 mt-2'>
                <div>
                <input type="file" onChange={handleFileChange} className='w-[242px]'/>
                </div>
                <Button
                    text={'Open'}
                    onButtonClick={() => setIsPasswordModal(true)}
                    disabled={disabled}
                />
            </div>
            </div>
        </>
    )
}

export default UploadWallet;