import React, { useState } from 'react';
import { delegate } from '../utils/WalletUtils';

import TextInput from './TextInput';
import Button from './Button';
import ErrorModal from './ErrorModal';
import TXResultModal from './TXResultModal';
import PasswordModal from './PasswordModal';

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
    const [isPasswordModal, setIsPasswordModal] = useState(false);
    const [isTXResultModal, setIsTXResultModal] = useState(false);

    const handleDelegate = async() => {
        console.log('Delegating to:', delegateAddress);
        setIsTXResultModal(true);
        try {
            if (walletFileContents) {
                const txHash = await delegate(
                    walletFileContents,
                    passphrase,
                    delegateAddress,
                    tezosNodeAddress
                );
                setDelegateAddress('');
                setTxHash(txHash);
            }
        } catch (error: any) {
            setError('Failed to delegate: ' + error.message);
            setIsTXResultModal(false);
        } finally {
            setPassphrase('');
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <PasswordModal
                { ...{passphrase, setPassphrase, isPasswordModal, setIsPasswordModal }}
                onUnlockWallet={handleDelegate}
            />
            <TXResultModal { ...{txHash, isTXResultModal, setIsTXResultModal }} />
            <div className='bg-grey-20 flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
                <p className='font-bold text-lg'> Delegate </p>
                <div className='flex flex-wrap items-end gap-y-2 gap-x-8'>
                    <TextInput
                        id={'delegate'}
                        label={'Delegate Address'}
                        value={delegateAddress}
                        onChange={(e) => setDelegateAddress(e.target.value)}
                        className={'w-[338px]'}
                    />
                    <Button
                        text={'Set Delegate'}
                        onButtonClick={() => setIsPasswordModal(true)}
                        disabled={!isWalletOpen || !delegateAddress || !walletFileContents}
                    />
                </div>
            </div>
        </>
    )
}

export default Delegate;