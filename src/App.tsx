import React, { useState, useRef } from 'react';
import { unlockWallet } from './utils/WalletUtils';

const App: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const passwordRef = useRef<HTMLInputElement>(null); // Using a ref to access the password input

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleUnlockWallet = async () => {
        if (file && passwordRef.current && passwordRef.current.value) {
            try {
                const password = passwordRef.current.value; // Access the password directly from the input
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const address = await unlockWallet(text, password);
                        setAddress(address);
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
            <h1>Hello from Galleon!!!</h1>
            <input type="file" onChange={handleFileChange} />
            <input type="password" ref={passwordRef} placeholder="Enter password" />
            <button onClick={handleUnlockWallet}>Unlock Wallet</button>
            {address && <p>Wallet Address: {address}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default App;
