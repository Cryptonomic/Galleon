import React, { useRef, useState } from 'react';
import { delegate } from '../utils/WalletUtils';

import TextInput from './TextInput';
import PassphraseInput from './PassphraseInput';
import Button from './Button';

const Delegate = ({
    tezosNodeAddress,
    walletFileContents
}: {
    tezosNodeAddress: string;
    walletFileContents: string;
}) => {
    const [delegateAddress, setDelegateAddress] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState('');
    const passphraseRef = useRef<HTMLInputElement>(null);

    const handleSend = async() => {
        console.log('Delegating to:', delegateAddress);
        try {
            if (passphraseRef.current && passphraseRef.current.value && walletFileContents) {
                const passphrase = passphraseRef.current.value;
                const txHash = await delegate(
                    walletFileContents,
                    passphrase,
                    delegateAddress,
                    tezosNodeAddress
                );
                setTxHash(txHash);
            }
        } catch (error: any) {
            setError('Failed to delegate: ' + error.message);
        }
    };

    return (
        <div className='flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-3xl'>
            <p className='font-bold'> Delegate </p>
            <div className='flex gap-x-8'>
                <TextInput
                    id={'delegate'}
                    label={'Delegate Address'}
                    value={delegateAddress}
                    onChange={(e) => setDelegateAddress(e.target.value)}
                    className={'w-[338px]'}
                />
                <div className='flex flex-grow items-end justify-between'>
                    <PassphraseInput ref={passphraseRef} />
                    <Button
                        text={'Set Delegate'}
                        onButtonClick={handleSend}
                        disabled={!delegateAddress}
                    />
                </div>
            </div>
        </div>
    )
}

export default Delegate;