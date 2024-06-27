import React, { useState, useRef } from 'react';
import { unlockWallet, sendTransaction, delegate } from './utils/WalletUtils';
import { RpcClient } from '@taquito/rpc';

const Wallet: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const passwordRef = useRef<HTMLInputElement>(null); // Using a ref to access the password input

    const [tezosNodeAddress, setTezosNodeAddress] = useState('https://rpc.tzbeta.net/');

    const [accountBalance, setAccountBalance] = useState(0);

    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const [newDelegate, setNewDelegate] = useState('');
    const [currentDelegate, setCurrentDelegate] = useState('');

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

    const handleNewDelegateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDelegate(event.target.value);
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

    const handleKeyReveal = async () => {
        if (file && passwordRef.current && passwordRef.current.value) {
            try {
                const password = passwordRef.current.value; // Access the password directly from the input
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const accountInfo = await unlockWallet(text, password);
                        alert('Private Key: ' + accountInfo.privateKey)
                    }
                };
                fileReader.readAsText(file);
            } catch (error: any) {
                setError('Failed to unlock wallet: ' + error.message);
            }
        } else {
            setError('Please select a wallet file and enter a password.');
        }
    }

    const handleBalanceFetch = async () => {
        const client = new RpcClient(tezosNodeAddress);
        const balanceInMutez = await client.getBalance(address || '');
        const balanceInTez = balanceInMutez.toNumber() / 1000000;
        console.log('Balance num:', balanceInTez);
        setAccountBalance(balanceInTez);
    }

    const handleCurrentDelegateFetch = async () => {
        const client = new RpcClient(tezosNodeAddress);
        const currentDelegate = await client.getDelegate(address || '');
        setCurrentDelegate(currentDelegate || '');
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
                            tezosNodeAddress
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

    const handleNewDelegate = () => {
        console.log('Delegating to:', newDelegate);
        if (file && passwordRef.current && passwordRef.current.value) {
            try {
                const password = passwordRef.current.value; // Access the password directly from the input
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const txHash = await delegate(
                            text,
                            password,
                            newDelegate,
                            tezosNodeAddress
                        )
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
    }

    return (
        <div>
            <h1>MiniGalleon</h1>

            <h2>Settings</h2>
            <p>Tezos Node Address: {tezosNodeAddress}</p>
            <input
                type="text"
                placeholder="Tezos Node Address"
                value={tezosNodeAddress}
                onChange={(e) => setTezosNodeAddress(e.target.value)}
            />

            <h2>Wallet</h2>
            <input type="file" onChange={handleFileChange}/>
            <input type="password" ref={passwordRef} placeholder="Enter password"/>

            <h2>Unlock</h2>
            <button onClick={handleUnlockWallet}>Unlock Wallet</button>
            {address && <p>Wallet Address: {address}</p>}
            {error && <p>Error: {error}</p>}

            <h2>Key Reveal</h2>
            <button onClick={handleKeyReveal}>Reveal Private Key</button>

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

            <h2>Delegate</h2>

            <h3>Current Delegate</h3>
            <p>{currentDelegate}</p>
            <button onClick={handleCurrentDelegateFetch}>Fetch Delegate</button>

            <h3>Change Delegate</h3>
            <input
                type="text"
                placeholder="Delegate Address"
                value={newDelegate}
                onChange={handleNewDelegateChange}
            />
            <button onClick={handleNewDelegate}>Delegate</button>

            <h2>Results</h2>
            <p>Transaction Hash: {txHash}</p>
        </div>
    );
};

export default Wallet;
