import React, { useRef, useState } from 'react';
import { sendTransaction } from '../utils/WalletUtils';

import TextInput from './TextInput';
import PassphraseInput from './PassphraseInput';
import Button from './Button';
import ErrorModal from './ErrorModal';
import TransactionResultModal from './TransactionResultModal';

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

    const handleSend = async() => {
        console.log('Sending:', amount, 'to', recipientAddress);
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
            <TransactionResultModal { ...{txHash, setTxHash }} />
            <div className='flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-lg'>
                <p className='font-bold'> Send </p>
                <div className='flex gap-x-8'>
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
                </div>
                <div className='flex flex-wrap items-end gap-y-2 gap-x-8'>
                    <PassphraseInput value={passphrase} onChange={(e) => setPassphrase(e.target.value)} />
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