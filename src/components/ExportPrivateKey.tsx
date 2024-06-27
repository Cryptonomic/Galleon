import React, { useRef, useState } from 'react';
import { unlockWallet } from '../utils/WalletUtils';

import PassphraseInput from './PassphraseInput';
import Button from './Button';
import ErrorModal from './ErrorModal';

const ExportPrivateKey = ({
    walletFileContents
}: {
    walletFileContents: string;
}) => {
    const [secretKey, setSecretKey] = useState('');
    const [error, setError] = useState<string | null>(null);
    const passphraseRef = useRef<HTMLInputElement>(null);

    const handleKeyReveal = async() => {
        try {
            if (passphraseRef.current && passphraseRef.current.value && walletFileContents) {
                const passphrase = passphraseRef.current.value;
                const accountInfo = await unlockWallet(walletFileContents, passphrase);
                setSecretKey(accountInfo.privateKey);
            }
        } catch (error: any) {
            setError('Failed to reveal private key: ' + error.message);
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <div className='flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-3xl'>
                <p className='font-bold'> Export Private Key </p>
                <div className='flex gap-x-8'>
                    <div className='flex flex-grow items-end justify-between'>
                        <PassphraseInput ref={passphraseRef} />
                        <Button
                            text={'Unlock'}
                            onButtonClick={handleKeyReveal}
                            disabled={!walletFileContents}
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