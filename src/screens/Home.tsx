import React, { useState, useRef } from 'react';

import Header from '../components/Header';
import UploadWallet from '../components/UploadWallet';
import { unlockWallet } from '../utils/WalletUtils';
import WalletDetails from '../components/WalletDetails';
import Send from '../components/Send';
import Delegate from '../components/Delegate';
import ExportPrivateKey from '../components/ExportPrivateKey';

const Home: React.FC = () => {
    const [tezosNodeAddress, setTezosNodeAddress] = useState('https://rpc.tzbeta.net/');
    const [file, setFile] = useState<File | null>(null);
    const passphraseRef = useRef<HTMLInputElement>(null); // Using a ref to access the password input
    const [address, setAddress] = useState<string>('tz1cpoqGaG4dagarkCCD3fihEhq6iB2u5zkB'); // TODO: remove
    const [error, setError] = useState<string | null>(null);
    const [walletFileContents, setWalletFileContents] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleUnlockWallet = async () => {
        if (file && passphraseRef.current && passphraseRef.current.value) {
            try {
                const password = passphraseRef.current.value; // Access the password directly from the input
                const fileReader = new FileReader();
                fileReader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        setWalletFileContents(text);
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

    return (
        <>
            <Header tezosNodeAddress={tezosNodeAddress} setTezosNodeAddress={(e: React.ChangeEvent<HTMLInputElement>) => setTezosNodeAddress(e.target.value)} />
            <div className='w-[773px] flex flex-col gap-y-2 pt-12'>
                <UploadWallet
                    handleFileChange={handleFileChange}
                    passphraseRef={passphraseRef}
                    unlockWallet={handleUnlockWallet}
                    disabled={!file} // TODO: update condition
                />
                <WalletDetails
                    walletAddress={address}
                    tezosNodeAddress={tezosNodeAddress}
                />
                <Send
                    tezosNodeAddress={tezosNodeAddress}
                    walletFileContents={walletFileContents}
                />
                <Delegate
                    tezosNodeAddress={tezosNodeAddress}
                    walletFileContents={walletFileContents}
                />
                <ExportPrivateKey
                    walletFileContents={walletFileContents}
                />
            </div>
        </>
    );
};

export default Home;
