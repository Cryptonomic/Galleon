import React, { useState } from 'react';
import { sendTransaction } from '../utils/WalletUtils';

import TextInput from './TextInput';
import Button from './Button';
import ErrorModal from './ErrorModal';
import TXResultModal from './TXResultModal';

const Send = ({
    tezosNodeAddress,
    walletFileContents,
    isWalletOpen
}: {
    tezosNodeAddress: string;
    walletFileContents: string;
    isWalletOpen: boolean;
}) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState('');
    const [passphrase, setPassphrase] = useState<string>('');
    const [isTXResultModal, setIsTXResultModal] = useState(false);

    const handleSend = async() => {
        console.log('Sending:', amount, 'to', recipientAddress);
        setIsTXResultModal(true);
        try {
            if (walletFileContents) {
                const txHash = await sendTransaction(
                    walletFileContents,
                    passphrase,
                    recipientAddress,
                    parseFloat(amount),
                    tezosNodeAddress
                );
                setTxHash(txHash);
            }
        } catch (error: any) {
            setError('Failed to send transaction: ' + error.message);
        } finally {
            setPassphrase('');
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <TXResultModal { ...{txHash, isTXResultModal, setIsTXResultModal }} />
            <div className='bg-grey-20 flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
                <p className='font-bold text-lg'> Send </p>
                <div className='flex flex-wrap gap-x-8 gap-y-4 items-end'>
                    <TextInput
                        id={'recipientAddress'}
                        label={'Recipient Address'}
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className={'w-[338px]'}
                    />
                    <TextInput
                        id={'amount'}
                        label={'Enter Amount'}
                        value={`${amount}`} // TODO: add tezos symbol
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*\.?\d*$/.test(value)) { // Regex to allow only numbers and a single decimal point
                                setAmount(value);
                            }
                        }}
                        className={'w-[212px]'}
                    />
                    <Button
                        text={'Send'}
                        onButtonClick={handleSend}
                        disabled={!isWalletOpen || !passphrase || !amount || !recipientAddress || !walletFileContents}
                    />
                </div>
            </div>
        </>
    )
}

export default Send;