import React, { useState, useRef } from 'react';
import { unlockWallet, sendTransaction } from './utils/WalletUtils';
import { RpcClient } from '@taquito/rpc';

const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const passwordRef = useRef<HTMLInputElement>(null); // Using a ref to access the password input

    const [accountBalance, setAccountBalance] = useState(0);

    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const [txHash, setTxHash] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipientAddress(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    const handleUnlockWallet = async () => {
        if (file && passwordRef.current && passwordRef.current.value) {
            try {
                const password = passwordRef.current.value; // Access the password directly from the input
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const accountInfo = await unlockWallet(text, password);
                        setAddress(accountInfo.address);
                    }
                };
                fileReader.readAsText(file);
            } catch (error: any) {
                setError('Failed to unlock wallet: ' + error.message);
            }
        } else {
            setError('Please select a wallet file and enter a password.');
        }
    };
    const handleBalanceFetch = async () => {
        const client = new RpcClient('https://api.tez.ie/rpc/mainnet');
        const balanceInMutez = await client.getBalance(address || '');
        const balanceInTez = balanceInMutez.toNumber() / 1000000;
        console.log('Balance num:', balanceInTez);
        setAccountBalance(balanceInTez);
    }

    const handleSend = () => {
        console.log('Sending:', amount, 'to', recipientAddress);
        if (file && passwordRef.current && passwordRef.current.value) {
            try {
                const password = passwordRef.current.value; // Access the password directly from the input
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const txHash = await sendTransaction(
                            text,
                            password,
                            recipientAddress,
                            parseFloat(amount),
                            'https://api.tez.ie/rpc/mainnet'
                        );
                        setTxHash(txHash)
                    }
                };
                fileReader.readAsText(file);
            } catch (error: any) {
                setError('Failed to unlock wallet: ' + error.message);
            }
        } else {
            setError('Please select a wallet file and enter a password.');
        }
    };


    return (
        <div>
            <h1>MiniGalleon</h1>

            <h2>Settings</h2>

            <h2>Wallet</h2>
            <input type="file" onChange={handleFileChange}/>
            <input type="password" ref={passwordRef} placeholder="Enter password"/>

            <h2>Unlock</h2>
            <button onClick={handleUnlockWallet}>Unlock Wallet</button>
            {address && <p>Wallet Address: {address}</p>}
            {error && <p>Error: {error}</p>}

            <h2>Balance</h2>
            <p>Balance: {accountBalance} ꜩ</p>
            <button onClick={handleBalanceFetch}>Fetch Balance</button>

            <h2>Send</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={handleRecipientChange}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={handleAmountChange}
            />
            <button onClick={handleSend}>Send</button>

            <h2>Results</h2>
            <p>Transaction Hash: {txHash}</p>
        </div>
    );
};

export default App;
