import React, { useEffect, useState } from 'react';
import PasswordModal from './PasswordModal';
import TXResultModal from './TXResultModal';
import ErrorModal from './ErrorModal';
import { getDelegatorContracts, withdraw } from '../utils/WalletUtils';
import EmptyDelegationState from './EmptyDelegationState';
import DelegationContractDetails from './DelegationContractDetails';

const openIcon = require('../assets/open.png').default;

const KT1Delegation = ({
    walletFileContents,
    isWalletOpen,
    tezosNodeAddress,
    walletAddress,
    isRefresh,
    setIsRefresh
}:{
    walletFileContents: string;
    isWalletOpen: boolean;
    tezosNodeAddress: string;
    walletAddress: string;
    isRefresh: boolean;
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState('');

    const [passphrase, setPassphrase] = useState<string>('');
    const [isTXResultModal, setIsTXResultModal] = useState(false);
    const [isPasswordModal, setIsPasswordModal] = useState(false);

    const [currentContractAddress, setCurrentContractAddress] = useState('');
    const [delegationContracts, setDelegationContracts] = useState([]);

    const [amountInTez, setAmountInTez] = useState('');

    const handleWithdrawal = async() => {
        setIsTXResultModal(true);
        try {
            if (walletFileContents) {
                const txHash = await withdraw(
                    walletFileContents,
                    passphrase,
                    currentContractAddress,
                    amountInTez,
                    tezosNodeAddress
                );
                setTxHash(txHash);
                setIsRefresh(prevState => !prevState);
            }
        } catch (error: any) {
            setError('Failed to delegate: ' + error.message);
            setIsTXResultModal(false);
        } finally {
            setPassphrase('');
            setAmountInTez('');
        }
    }

    useEffect(() => {
        (async() => {
            if(walletAddress) {
                try {
                    const result = await getDelegatorContracts(walletAddress);
                    setDelegationContracts(result);
                } catch (error: any) {
                    setError('Failed to get delegator contracts: ' + error.message);
                }
            }
        })()
    }, [walletAddress, isRefresh])


    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <PasswordModal
                { ...{passphrase, setPassphrase, isPasswordModal, setIsPasswordModal }}
                onUnlockWallet={handleWithdrawal}
            />
            <TXResultModal { ...{txHash, isTXResultModal, setIsTXResultModal }} />
            <div className='bg-grey-20 flex flex-col gap-2 p-6 pb-8 mt-4 border border-grey-10 rounded-lg'>
            {delegationContracts && delegationContracts.length > 0
                ? <>
                    <div className='flex justify-between'>
                        <p className='font-bold text-lg'> Delegation Contracts </p>
                        <a
                                href={'https://discourse.cryptonomic.tech/t/i-m-unable-to-withdraw-tez-from-my-delegated-kt-account-to-my-manager-account-is-there-something-wrong/213'}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex gap-1 font-medium text-sky-40'
                            >
                                <span>
                                    Having issue withdrawing?
                                </span>
                                <img src={openIcon} alt='open' className='w-6 h-6' />
                        </a>
                    </div>
                    {delegationContracts.map(({ contractAddress, balance }, index) => (
                        <>
                            <DelegationContractDetails
                                key={index}
                                contractAddress={contractAddress}
                                balance={balance / 1000000}
                                onClickWithdraw={(amountInTez) => {
                                    setAmountInTez(amountInTez);
                                    setIsPasswordModal(true);
                                    setCurrentContractAddress(contractAddress);
                                }}
                                disabled={!walletFileContents || !isWalletOpen}
                            />
                            <div className={`${index === 0 && 'border-0'} ${index === delegationContracts.length - 1 ? 'border-0' : 'border-t border-grey-10 my-8'}`} />
                        </>
                    ))}
                </>
                : <EmptyDelegationState />
            }
            </div>
        </>
    )
}

export default KT1Delegation;