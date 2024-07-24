import React, { useEffect, useState } from 'react';
import Amount from './Amount';
import PasswordModal from './PasswordModal';
import TXResultModal from './TXResultModal';
import ErrorModal from './ErrorModal';
import { getDelegatorContracts, withdraw } from '../utils/WalletUtils';

const openIcon = require('../assets/open.png').default;

const EmptyDelegationState = () => {
    return(
        <div className='w-[498px] text-lg'>
            <p className='font-bold text-lg'> Legacy KT1 Delegation Contracts </p>
            <div className='flex flex-col gap-7 py-7'>
                <p className='text-sky-70'> No legacy KT1 delegation contracts found. </p>
                <p className='text-sky-70'> Legacy KT1 contracts were an older way to delegate funds. You no longer need to use them.</p>
            </div>
        </div>
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
    onClickWithdraw: (amountInTez: string) => void;
    disabled: boolean;
}) => {

    const contractAddressLink = `https://tzkt.io/${contractAddress}/operations`

    return(
        <div>
            <p>
                <span className='font-bold'> Contract Address: </span>
                <a href={contractAddressLink} target='_blank' rel='noopener noreferrer' className='break-all text-sky-30'>
                    { contractAddress}
                </a>
            </p>
            <p className='pb-8'>
                <span className='font-bold'> Balance: </span>
                { balance }  ꜩ
            </p>
            <Amount
                buttonText={'Withdraw'}
                onButtonClick={(amountInTez) => onClickWithdraw(amountInTez)}
                disabled={disabled}
            />
        </div>
    )
}

const KT1Delegation = ({
    walletFileContents,
    isWalletOpen,
    tezosNodeAddress,
    walletAddress
}:{
    walletFileContents: string;
    isWalletOpen: boolean;
    tezosNodeAddress: string;
    walletAddress: string;
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
    }, [walletAddress])


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