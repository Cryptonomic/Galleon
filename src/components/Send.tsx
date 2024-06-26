import React, { useRef, useState } from 'react';
import { sendTransaction } from '../utils/WalletUtils';

import TextInput from './TextInput';
import PassphraseInput from './PassphraseInput';
import Button from './Button';

const Send = ({
    tezosNodeAddress,
    walletFileContents
}: {
    tezosNodeAddress: string;
    walletFileContents: string;
}) => {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState('');
    const passphraseRef = useRef<HTMLInputElement>(null);

    const handleSend = async() => {
        console.log('Sending:', amount, 'to', recipientAddress);
        try {
            if (passphraseRef.current && passphraseRef.current.value && walletFileContents) {
                const passphrase = passphraseRef.current.value;
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
        }
    };

    return (
        <div className='flex flex-col gap-2 py-4 px-6 border border-grey-10 rounded-3xl'>
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
                    value={amount} // TODO: add tezos symbol
                    onChange={(e) => setAmount(e.target.value)}
                    className={'w-[212px]'}
                />
            </div>
            <div className='flex items-end gap-x-8'>
                <PassphraseInput ref={passphraseRef} />
                <Button
                    text={'Send'}
                    onButtonClick={handleSend}
                    disabled={!amount || !recipientAddress}
                />
            </div>
        </div>
    )
}

export default Send;