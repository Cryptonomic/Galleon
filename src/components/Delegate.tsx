import React, { useRef, useState } from 'react';
import { delegate } from '../utils/WalletUtils';

import TextInput from './TextInput';
import PassphraseInput from './PassphraseInput';
import Button from './Button';
import ErrorModal from './ErrorModal';
import TransactionResultModal from './TransactionResultModal';

const Delegate = ({
    tezosNodeAddress,
    walletFileContents,
    isWalletOpen
}: {
    tezosNodeAddress: string;
    walletFileContents: string;
    isWalletOpen: boolean;
}) => {
    const [delegateAddress, setDelegateAddress] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState('');
    const [passphrase, setPassphrase] = useState<string>('');

    const handleDelegate = async() => {
        console.log('Delegating to:', delegateAddress);
        try {
            if (walletFileContents) {
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
        } finally {
            setPassphrase('');
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <TransactionResultModal { ...{txHash, setTxHash }} />
            <div className='bg-grey-20 flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
                <p className='font-bold'> Delegate </p>
                <div className='flex flex-wrap items-end gap-y-2 gap-x-8'>
                    <TextInput
                        id={'delegate'}
                        label={'Delegate Address'}
                        value={delegateAddress}
                        onChange={(e) => setDelegateAddress(e.target.value)}
                        className={'w-[338px]'}
                    />
                    <PassphraseInput value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
                    <Button
                        text={'Set Delegate'}
                        onButtonClick={handleDelegate}
                        disabled={!isWalletOpen || !delegateAddress || !walletFileContents || !passphrase}
                    />
                </div>
            </div>
        </>
    )
}

export default Delegate;