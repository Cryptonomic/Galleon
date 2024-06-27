import React, { useState, useRef } from 'react';

import Header from '../components/Header';
import UploadWallet from '../components/UploadWallet';
import { unlockWallet } from '../utils/WalletUtils';
import WalletDetails from '../components/WalletDetails';
import Send from '../components/Send';
import Delegate from '../components/Delegate';
import ExportPrivateKey from '../components/ExportPrivateKey';
import ErrorModal from '../components/ErrorModal';

const Home: React.FC = () => {
    const [tezosNodeAddress, setTezosNodeAddress] = useState('https://rpc.tzbeta.net/');
    const [file, setFile] = useState<File | null>(null);
    const passphraseRef = useRef<HTMLInputElement>(null); // Using a ref to access the password input
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [walletFileContents, setWalletFileContents] = useState<string>('');
    const [isOpenWallet, setIsOpenWallet] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setFile(file);
    };

    const handleUnlockWallet = async () => {
        if (file && passphraseRef.current && passphraseRef.current.value) {
            const password = passphraseRef.current.value; // Access the password directly from the input
            const fileReader = new FileReader();
            fileReader.onload = async (e) => {
                try {
                    const text = e.target?.result;
                    if (typeof text === 'string') {
                        const accountInfo = await unlockWallet(text, password);
                        setAddress(accountInfo.address);
                        setWalletFileContents(text);
                        setIsOpenWallet(true);
                    }
                } catch (error: any) {
                    setError('Failed to unlock wallet: ' + error.message);
                }
            };
            try {
                fileReader.readAsText(file);
            } catch (error) {
                console.error('Error reading the file:', error);
                setError('Failed to read the wallet file.');
            }
        } else {
            setError('Please select a wallet file and enter a password.');
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError } }  />
            <Header tezosNodeAddress={tezosNodeAddress} setTezosNodeAddress={(e: React.ChangeEvent<HTMLInputElement>) => setTezosNodeAddress(e.target.value)} />
            <div className='w-[773px] flex flex-col gap-y-2 mx-auto pt-12'>
                <UploadWallet
                    handleFileChange={handleFileChange}
                    passphraseRef={passphraseRef}
                    unlockWallet={handleUnlockWallet}
                    disabled={!file || isOpenWallet} // TODO: update condition
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
