import React, { useState } from 'react';
import Amount from './Amount';
import PasswordModal from './PasswordModal';
import TXResultModal from './TXResultModal';
import ErrorModal from './ErrorModal';
import { withdraw } from '../utils/WalletUtils';

const openIcon = require('../assets/open.png').default;

const EmptyDelegationState = () => {
    return(
        <>
            <p className='font-bold text-lg'> Legacy KT1 Delegation Contracts </p>
            <div className='flex flex-col gap-7 py-7'>
                <p className='text-sky-70'> No legacy KT1 delegation contracts found. </p>
                <p className='text-sky-70'> Legacy KT1 contracts were an older way to delegate funds. You no longer need to use them.</p>
            </div>
        </>
    )
}


const DelegationContractDetails = ({
    contractAddress,
    balance,
    onClickWithdraw,
    disabled
}:{
    contractAddress: string;
    balance: number;
    onClickWithdraw: (amount: string) => void;
    disabled: boolean;
}) => {

    return(
        <div>
            <p>
                <span className='font-bold'> Contract Address: </span>
                { contractAddress}
            </p>
            <p className='pb-8'>
                <span className='font-bold'> Balance: </span>
                { balance }  ꜩ
            </p>
            <Amount
                buttonText={'Withdraw'}
                onButtonClick={(amount) => onClickWithdraw(amount)}
                disabled={disabled}
            />
        </div>
    )
}


const KT1Delegation = ({
    walletFileContents,
    isWalletOpen,
    tezosNodeAddress,
}:{
    walletFileContents: string;
    isWalletOpen: boolean;
    tezosNodeAddress: string;
}) => {
    const [isDelegationContract, setIsDelegationContract] = useState(true);

    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState('');

    const [passphrase, setPassphrase] = useState<string>('');
    const [isTXResultModal, setIsTXResultModal] = useState(false);
    const [isPasswordModal, setIsPasswordModal] = useState(false);

    const [currentContractAddress, setCurrentContractAddress] = useState('');

    const [amount, setAmount] = useState('');

    // TODO: get contract addresses
    const delegationContracts = [
        { contractAddress: 'KT1H5b7LxEExkFd2Tng77TfuWbM5aPvHstPr', balance: 22.019709 },
        { contractAddress: 'KT1SjXiUX63QvdNMcM2m492f7kuf8JxXRLp4', balance: 12.019709 },
        { contractAddress: 'KT1MCXxbtS62tk4CUxv29BHnqTBtvsFFGzBm', balance: 2.024934 },
    ];

    const handleWithdrawal = async() => {
        try {
            console.log("withdrawaing", amount, 'from: ', currentContractAddress)
            if (walletFileContents) {
                const txHash = await withdraw(
                    walletFileContents,
                    passphrase,
                    currentContractAddress,
                    parseFloat(amount),
                    tezosNodeAddress
                );
                setTxHash(txHash);
            }
        } catch (error) {
            setIsTXResultModal(false);
        } finally {
            setPassphrase('');
            setAmount('');
        }
    }

    return (
        <>
            <ErrorModal { ...{ error, setError }}  />
            <PasswordModal
                { ...{passphrase, setPassphrase, isPasswordModal, setIsPasswordModal }}
                onUnlockWallet={handleWithdrawal}
            />
            <TXResultModal { ...{txHash, isTXResultModal, setIsTXResultModal }} />
            <div className='bg-grey-20 flex flex-col gap-2 p-6 pb-8 mt-4 border border-grey-10 rounded-lg'>
            {isDelegationContract
                ? <>
                    <div className='flex justify-between'>
                    <p className='font-bold text-lg'> Delegation Contracts </p>
                    <a
                            href={'https://discourse.cryptonomic.tech/t/i-m-unable-to-withdraw-tez-from-my-delegated-kt-account-to-my-manager-account-is-there-something-wrong/213'}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex gap-1 font-medium'
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
                                balance={balance}
                                onClickWithdraw={(amount) => {
                                    setAmount(amount);
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