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
                <div className='flex gap-x-8'>
                    <div className='flex flex-grow items-end justify-between'>
                        <PassphraseInput value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
                        <Button
                            text={'Unlock'}
                            onButtonClick={handleKeyReveal}
                            disabled={!passphrase || !walletFileContents}
                        />
                    </div>
                    <div>
                        <p> Secret Key </p>
                        <div className='w-[392px] h-[26px] bg-white'>
                            <p> {secretKey} </p>
                            {/* TODO: text-wrap */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExportPrivateKey;