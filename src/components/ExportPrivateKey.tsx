import React, { useRef, useState } from 'react';
import { unlockWallet } from '../utils/WalletUtils';

import PassphraseInput from './PassphraseInput';
import Button from './Button';
import ErrorModal from './ErrorModal';

const ExportPrivateKey = ({
    walletFileContents,
}: {
    walletFileContents: string;
}) => {
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [passphrase, setPassphrase] = useState<string>('');

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
            <div className='flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-3xl'>
                <p className='font-bold'> Export Private Key </p>
                <div className='flex flex-wrap items-end gap-x-8'>
                    <PassphraseInput value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
                    <Button
                        text={'Unlock'}
                        onButtonClick={handleKeyReveal}
                        disabled={!passphrase || !walletFileContents}
                    />
                    <div className='flex-grow'>
                        <p> Secret Key </p>
                        <div className='w-[392px] min-h-[26px] bg-white p-4 break-words whitespace-normal'>
                            <p> {secretKey} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExportPrivateKey;