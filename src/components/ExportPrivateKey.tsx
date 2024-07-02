import React, { useState } from 'react';
import { unlockWallet } from '../utils/WalletUtils';

import Button from './Button';
import ErrorModal from './ErrorModal';
import PasswordModal from './PasswordModal';

const ExportPrivateKey = ({
    walletFileContents,
}: {
    walletFileContents: string;
}) => {
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [passphrase, setPassphrase] = useState<string>('');
    const [isPasswordModal, setIsPasswordModal] = useState(false);

    const handleKeyReveal = async() => {
        try {
            if (walletFileContents) {
                const accountInfo = await unlockWallet(walletFileContents, passphrase);
                setSecretKey(accountInfo.privateKey);
            }
        } catch (error: any) {
            setError('Failed to reveal private key: ' + error.message);
        } finally {
            setPassphrase('');
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <PasswordModal
                { ...{passphrase, setPassphrase, isPasswordModal, setIsPasswordModal }}
                onUnlockWallet={handleKeyReveal}
            />
            <div className='bg-grey-20 flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
                <p className='font-bold text-lg'> Export Private Key </p>
                <div className='flex flex-wrap items-end gap-x-8'>
                    {!secretKey
                        ? <Button
                            text={'Reveal Private Key '}
                            onButtonClick={() => setIsPasswordModal(true)}
                            disabled={!walletFileContents}
                        />
                        : <>
                            <div>
                                <p> Secret Key </p>
                                <div className='w-[392px] min-h-[26px] bg-white p-4 break-words whitespace-normal'>
                                    <p> {secretKey} </p>
                                </div>
                            </div>
                            <Button
                                text={'Hide'}
                                onButtonClick={() => setSecretKey('')}
                            />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default ExportPrivateKey;