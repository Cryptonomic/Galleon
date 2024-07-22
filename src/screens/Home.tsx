import React, { useState } from 'react';

import Header from '../components/Header';
import UploadWallet from '../components/UploadWallet';
import { unlockWallet } from '../utils/WalletUtils';
import AccountDetails from '../components/AccountDetails';
import Send from '../components/Send';
import Delegate from '../components/Delegate';
import ExportPrivateKey from '../components/ExportPrivateKey';
import ErrorModal from '../components/ErrorModal';
import AssetLinks from '../components/AssetLinks';
import Footer from '../components/Footer';
import KT1Delegation from '../components/KT1Delegation';

import config from '../config.json';

const Home: React.FC = () => {
    const [tezosNodeAddress, setTezosNodeAddress] = useState(config.defaultNode);
    const [file, setFile] = useState<File | null>(null);
    const [passphrase, setPassphrase] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [walletFileContents, setWalletFileContents] = useState<string>('');
    const [isWalletOpen, setIsWalletOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;

        if (selectedFile) {
            setFile(selectedFile);
            const fileReader = new FileReader();
            fileReader.onload = async (e) => {
                const text = e.target?.result;
                if (typeof text === 'string') {
                    setWalletFileContents(text);
                }
            };
            fileReader.readAsText(selectedFile);
        } else {
            setError('Please select a wallet file and enter a password.');
        }
    };

    const handleUnlockWallet = async () => {
        try {
            const accountInfo = await unlockWallet(walletFileContents, passphrase);
            setAddress(accountInfo.address);
            setIsWalletOpen(true);
        } catch (error: any) {
            setError('Failed to unlock wallet: ' + error.message);
        } finally {
            setPassphrase('');
        }
    };

    return (
        <>
            <ErrorModal { ...{ error, setError } }  />
            <Header { ...{tezosNodeAddress, setTezosNodeAddress }} />
            <div className='w-70% lg:w-[773px] flex flex-col gap-y-2 mx-auto pt-12'>
                <UploadWallet
                    handleFileChange={handleFileChange}
                    passphrase={passphrase}
                    setPassphrase={setPassphrase}
                    unlockWallet={handleUnlockWallet}
                    disabled={!file || isWalletOpen}
                />
                <AccountDetails
                    walletAddress={address}
                    tezosNodeAddress={tezosNodeAddress}
                />
                <AssetLinks walletAddress={address} />
                <Send
                    tezosNodeAddress={tezosNodeAddress}
                    walletFileContents={walletFileContents}
                    isWalletOpen={isWalletOpen}
                />
                <Delegate
                    tezosNodeAddress={tezosNodeAddress}
                    walletFileContents={walletFileContents}
                    isWalletOpen={isWalletOpen}
                />
                <ExportPrivateKey
                    walletFileContents={walletFileContents}
                />

                <KT1Delegation
                    { ...{ walletFileContents, isWalletOpen, tezosNodeAddress }}
                    walletAddress={address}
                />
            </div>
            <Footer />
        </>
    );
};

export default Home;
